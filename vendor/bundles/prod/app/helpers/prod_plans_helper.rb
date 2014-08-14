module ProdPlansHelper

  ####################################################################################
  #                               Search 
  ####################################################################################
  #
  # plans 조회 
  #
  def search_plans
    search_prod_plans(@domain, params)
  end
  
  #
  # plans 조회 
  #
  def search_prod_plans(domain, params)
    list_plans(domain, params)
  end
  
  #
  # plan search logic
  #
  def list_plans(domain, params)
    domain_id = domain.id
    dept_type = params['dept_type-eq'] unless params['dept_type-eq'].blank?
    plan_date_from = params['plan_date-eq'] unless params['plan_date-eq'].blank?
    plan_date_from = Date.today + 1 unless plan_date_from
    plan_date_from = parse_date(plan_date_from) if(plan_date_from.class.name == 'String')
    plan_date_to = plan_date_from + 7
    
    conditions = ["prod_plans.plan_date between ? and ?"]
    conditions.push(plan_date_from)
    conditions.push(plan_date_to)
    
    unless(params['workcenter.name-eq'].blank?)
      conditions[0] << " and workcenters.name = ?"
      conditions.push(params['workcenter.name-eq'])
    else
      if(dept_type)
        conditions[0] << " and workcenters.dept_type = ?"
        conditions.push(dept_type)
      end
    end
    
    unless(params[:operation_id].blank?)
      conditions[0] << " and prod_plans.operation_id = ?"
      conditions.push(params[:operation_id]) 
    end
    
    unless(params[:product_id].blank?)
      conditions[0] << " and prod_plans.product_id = ?"
      conditions.push(params[:product_id]) 
    end

    select = "prod_plans.id, prod_plans.plan_date, workcenters.name workcenter, operations.name operation, "
    select << "operations.description operation_desc, products.name product, products.description product_desc, "
    select << "customers.name customer, customers.description customer_desc, "
    select << "prod_plans.shift1_plan_qty, prod_plans.shift2_plan_qty, prod_plans.shift1_seq, prod_plans.shift2_seq"
    order = "prod_plans.workcenter_id, operations.name, prod_plans.product_id"
    join = "INNER JOIN workcenters ON workcenters.id = prod_plans.workcenter_id "
    join << "INNER JOIN operations ON operations.id = prod_plans.operation_id "
    join << "INNER JOIN products ON products.id = prod_plans.product_id "
    join << "LEFT OUTER JOIN customers ON customers.id = prod_plans.customer_id"
    sql = domain.prod_plans.select(select).where(conditions).joins(join).order(order).to_sql
    
    id_index, week_plans, plans = 1, [], DiySelection.connection.select_all(sql)
    plans.each do |plan|
      if(!plan['customer'].blank? && plan['customer'].size > 0)
       converted_plan = week_plans.find { |p| p['workcenter'] == plan['workcenter'] && p['operation'] == plan['operation'] && p['product'] == plan['product'] && p['customer'] == plan['customer'] }
      else
       converted_plan = week_plans.find { |p| p['workcenter'] == plan['workcenter'] && p['operation'] == plan['operation'] && p['product'] == plan['product'] && (p['customer'] == nil || p['customer'] == '') }
      end
    
      unless converted_plan
        converted_plan = { 'workcenter' => plan['workcenter'], 'operation' => plan['operation'], 'product' => plan['product'], 'customer' => plan['customer'] }
        week_plans.push(converted_plan)
      end
      
      plan_date, dday_index = parse_date(plan['plan_date']), 0
      dday_index = (0..6).find { |idx| plan_date == (plan_date_from + idx) }
      converted_plan["D#{dday_index.to_s}-1"] = plan['shift1_plan_qty']
      converted_plan["D#{dday_index.to_s}-2"] = plan['shift2_plan_qty']
      converted_plan["D#{dday_index.to_s}-1-seq"] = plan['shift1_seq']
      converted_plan["D#{dday_index.to_s}-2-seq"] = plan['shift2_seq']
      converted_plan["operation_desc"] = plan["operation_desc"]
      converted_plan["product_desc"] = plan["product_desc"]
      converted_plan["customer_desc"] = plan["customer_desc"]
      converted_plan["id"] = id_index;
      id_index += 1
    end
    
    headers = 0.upto(6).collect { |i| (plan_date_from + i).strftime(GlobalConfig.date_format) }
    {:success => true, :total => week_plans.size, :items => week_plans, :headers => headers}
  end
  
  ####################################################################################
  #                               Generate Order 
  ####################################################################################
  
  #
  # order 생성 
  #
  def generate_order_by_plans(client_ip)
    dept_type = params[:dept_type] unless params[:dept_type].blank?
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.dept_type_empty') unless(dept_type)
    start_date = params[:start_date] unless params[:start_date].blank?
    start_date = Date.today unless start_date
    start_date = parse_date(start_date) if (start_date.class.name == 'String')
    order_days = params[:order_days].to_i unless params[:order_days].blank?
    order_days = 7 unless order_days
    end_date = start_date + (order_days - 1)
    
    # 오늘 날짜이거나 오늘 날짜 이전 데이터가 있으면 에러 
    current_date = @domain.shift.current_work_date
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.plan_date_must_be_gte_today') if(current_date >= start_date)
    
    plan_conds = ["(prod_plans.plan_date between ? and ?)", start_date, end_date]
    order_del_cond = ["domain_id = ? and (order_date between ? and ?)", @domain.id, start_date, end_date]
    label_plan_del_cond = ["domain_id = ? and (order_date between ? and ?)", @domain.id, start_date, end_date]
    
    plan_conds[0] << " and (operations.workcenter_id in (select id from workcenters where dept_type = ?))"
    plan_conds.push(dept_type)
    order_del_cond[0] << " and (workcenter_id in (select id from workcenters where dept_type = ?))"
    order_del_cond.push(dept_type)
    label_plan_del_cond[0] << " and (operation_id in (select id from operations where workcenter_id in (select id from workcenters where dept_type = ?)))"
    label_plan_del_cond.push(dept_type)
    
    plans = @domain.prod_plans.where(plan_conds).joins(:operation, :product)
    total_shift, new_orders, new_label_plans, new_bar_plans = @domain.shift.total_shift, [], [], []
    locs, plan_idx = [], 1
    
    plans.each do |plan|
      machines = self.get_plan_machines(plan.operation_id, plan.product_id)
      next if(machines.empty?)
      op_info = { 'loc_cd' => machines[0]['loc_cd'], 'baseloc_cd' => machines[0]['baseloc_cd'] }
      locs.push(op_info['loc_cd']) if(op_info['loc_cd'] && op_info['loc_cd'].size > 0)
      order_result = self.generate_prod_orders(plan_idx, plan, total_shift, op_info, machines, client_ip)
      next unless order_result
      orders, bar_plan = order_result[0], order_result[1]
      orders.each { |o| new_orders.push(o) if o } if orders
      new_bar_plans.push(bar_plan) if bar_plan
      label_plans = self.generate_label_plans(plan, total_shift, op_info)
      label_plans.each { |lp| new_label_plans.push(lp) if lp } if label_plans
      plan_idx += 1
    end
    
    locs.uniq!
            
    ProdOrder.transaction do
      ProdOrder.delete_all(order_del_cond)
      LabelPlan.delete_all(label_plan_del_cond)
      BarProdPlan.delete_all(["(plan_dt between ? AND ?) and loc_cd in (?)", start_date.strftime('%Y%m%d'), end_date.strftime('%Y%m%d'), locs])
      new_orders.each { |order| order.save! }
      new_label_plans.each { |label_plan| label_plan.save! }
      new_bar_plans.each { |bar_plan| bar_plan.save! }
    end
  end
  
  def get_plan_machines(operation_id, product_id)
    sql = "select 
      a.id, a.operation_id, a.uph, a.cycletime, a.loc_cd, l.baseloc_cd
    from 
      (select 
        pp.operation_id, 
        m.id, 
        pp.target_uph uph, 
        pp.cycletime,
        pp.location loc_cd
      from 
        prod_params pp join machines m on pp.machine_id = m.id
      where 
        pp.operation_id = '#{operation_id}' and 
        pp.product_id = '#{product_id}' and 
        m.main_op_flag = 1) a left outer join barcode.loc l on a.loc_cd = l.loc_cd"
    results = Machine.connection.select_all(sql)
    results
  end
  
  # 
  # plan으로 order 생성 
  # machines_info : {id : 'machine_id', cycletime : 100, uph : 36 }
  #
  def generate_prod_orders(plan_idx, plan, total_shift, op_info, machines_info, client_ip)
    return nil if(!machines_info || machines_info.empty?)
    return nil if(!plan.total_plan_qty ||plan.total_plan_qty == 0)
    orders, plan_product = [], plan.product
    lot_size = plan_product.get_lot_size(plan)
    machine_cnt = machines_info.size
    
    machines_info.each do |machine_info|
      1.upto(total_shift) do |current_shift|
        plan_qty = plan["shift#{current_shift}_plan_qty"]
        next if(plan_qty == 0)
        order = @domain.prod_orders.new
        order.order_date = plan.plan_date
        order.shift = current_shift
        order.workcenter_id = plan.workcenter_id
        order.operation_id = plan.operation_id
        order.machine_id = machine_info['id']
        order.product_id = plan.product_id
        order.customer_id = plan.customer_id if plan.customer_id
        order.status = 'W'
        order.order_seq = plan["shift#{current_shift}_seq"]
        order.uph = machine_info['uph']
        order.cycletime = machine_info['cycletime']
        order.pallet_qty = lot_size
        order_qty = (plan_qty.to_f * (1.0 / machine_cnt)).ceil
        order.order_qty = order_qty
        orders.push(order)
      end
    end
    
    bar_plan = self.generate_bar_plan(plan_idx, plan, op_info, plan_product.name, lot_size, client_ip)
    [orders, bar_plan]
  end
  
  # 
  # plan으로 barcode plan 생성, location이 없으면 라벨 계획 생성이 되지 않는다.
  #
  def generate_label_plans(plan, total_shift, op_info)
    return nil if(!op_info || !op_info['loc_cd'] || op_info['loc_cd'].blank?)
    new_label_plans = []
    
    1.upto(total_shift) do |current_shift|
      plan_qty = plan["shift#{current_shift}_plan_qty"]
      next if(plan_qty == 0)
      label_plan = @domain.label_plans.new
      label_plan.order_date = plan.plan_date
      label_plan.shift = current_shift
      label_plan.operation_id = plan.operation_id
      label_plan.product_id = plan.product_id
      label_plan.customer_id = plan.customer_id if plan.customer_id
      label_plan.order_qty = plan_qty
      # lot_size를 가져온다.
      label_plan.lot_qty = plan.product.get_lot_size(plan)
      if(label_plan.lot_qty && label_plan.lot_qty > 0)
        # 소숫점이 나오면 무조건 하나 더 발행
        prt_qty = label_plan.order_qty.to_f / label_plan.lot_qty.to_f
        label_plan.print_qty = prt_qty.ceil
      end
      
      label_plan.printed_qty = 0
      new_label_plans.push(label_plan)
    end
    
    new_label_plans
  end
  
  #
  # 바코드 생산계획 생성 
  #
  def generate_bar_plan(plan_idx, plan, op_info, product_name, lot_qty, client_ip)
    return nil if(!op_info || !op_info['loc_cd'] || !op_info['baseloc_cd'] || op_info['loc_cd'].blank? || op_info['baseloc_cd'].blank?)
    bar_plan = BarProdPlan.new
    bar_plan.plan_dt = plan.plan_date.strftime('%Y%m%d')
    bar_plan.baseloc_cd = op_info['baseloc_cd']
    bar_plan.loc_cd = op_info['loc_cd']
    bar_plan.item_cd = product_name
    bar_plan.plan_sq = plan.shift1_seq
    bar_plan.lot_fg = '1'
    bar_plan.lot_qty = lot_qty
    bar_plan.plan_qty = plan.total_plan_qty
    bar_plan.reg_id = plan.creator_id
    bar_plan.reg_dtm = plan.created_at.strftime('%Y%m%d%H%M%S')
    bar_plan.item_sq = plan_idx
    bar_plan.reg_ip = client_ip if(client_ip && client_ip.length <= 15)
    bar_plan
  end
  
  ####################################################################################
  #                               Import 
  ####################################################################################
  
  #
  # 생산 계획 excel import 
  #
  def import_plan(domain, file)
    # header ==> {'operation', 'product', 'customer', 'D-0', 'D-1', 'D-2', 'D1-1', 'D1-2', 'D2-1', 'D2-2', 'D3-1', 'D3-2', 'D4-1', 'D4-2', .... }
    spreadsheet = open_spreadsheet(file)
    header = spreadsheet.row(3)
    plan_data_list, date_headers, header_list, shift_count, last_col_idx = [], [], [], domain.shift.total_shift, 0
    
    # Start Line : 3
    (3..spreadsheet.last_row).each do |i|
      row = spreadsheet.row(i)
      if(i == 3)
        # Line 3 : Header and Plan Date : {"Operation"=>"Operation", "Operation Desc" => "Operation Desc", "Product"=>"Product", "Product Desc" => "Product Desc", "Customer" => "Customer", 41325.0=>41325.0, 41326.0=>41326.0, 41327.0=>41327.0, 41328.0=>41328.0, 41329.0=>41329.0, 41330.0=>41330.0, 41331.0=>41331.0}
        date_headers, header_list = get_xls_hearder_info(header, shift_count)
        validate_plan_date(domain, date_headers)
        last_col_idx = header_list.size + 4
      elsif(i == 4 || i == 5)
        # i == 4 : Day / Night
        # i == 5 : Priority / Qty.
      else
        # Line N : Real Data, {"operation"=>"6AULA", "operation_desc"=>"INJ. M/C P1-5", "product"=>"A101AEPAA13", "product_desc"=>"EVAP. UNIT ASS'Y-A/C", "customer"=>"A", "D0-1-seq"=>1, "D0-1"=>300, "D0-2-seq"=>1, "D0-2"=>300, "D1-1-seq"=>1, "D1-1"=>300, "D1-2-seq"=>1, "D1-2"=>300, "D2-1-seq"=>1, "D2-1"=>300, "D2-2-seq"=>1, "D2-2"=>300, "D3-1-seq"=>1, "D3-1"=>300, "D3-2-seq"=>1, "D3-2"=>300, "D4-1-seq"=>1, "D4-1"=>300, "D4-2-seq"=>1, "D4-2"=>300, "D5-1-seq"=>1, "D5-1"=>300, "D5-2-seq"=>1, "D5-2"=>300, "D6-1-seq"=>1, "D6-1"=>300, "D6-2-seq"=>1, "D6-2"=>300}
        if(self.check_valid_line(row, last_col_idx))
          data = self.parse_plan_line(row, last_col_idx, header_list)
          plan_data_list.push(data) if(data)
        end
      end      
    end
    
    return date_headers, plan_data_list
  end
  
  #
  # import시 validation 처리를 한다.
  #
  def validate_plan_date(domain, dates)
    current_date, prev_date = domain.shift.current_work_date, nil
    dates.each do |dt|
      date = parse_date(dt)
      # 오늘 날짜이거나 오늘 날짜 이전 데이터가 있으면 에러 
      raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.plan_date_must_be_gte_today') if(current_date >= date)
      # 날짜가 건너 뛰는 경우가 있다면 에러
      raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.invalid_plan_date') if(prev_date && ((prev_date + 1) != date))
      prev_date = date
    end
  end
  
  #
  # 라인의 수량이 하나라도 채워져있는지 체크한다.
  #
  def check_valid_line(row, last_col_idx)
    valid = false
    5.upto(last_col_idx) { |idx| valid = true if(!row[idx].nil? && !row[idx].blank? && row[idx] > 0) } 
    valid
  end
  
  #
  # 생산 계획의 수량이 채워진 row들만 골라낸다. 
  #
  def parse_plan_line(row, last_col_idx, header_list)
    valid = self.check_prod_params(row[0].strip, row[2].strip)
    # data = {'operation' => row[0].strip, 'product' => row[2].strip, 'customer' => row[4], 'check' => valid ? '' : 'Check' }
    data = {'operation' => row[0].strip, 'product' => row[2].strip, 'customer' => '', 'check' => valid ? '' : 'Check' }
        
    if(valid)
      header_idx = 0
      5.upto(last_col_idx) do |idx|
        header_name = header_list[header_idx]
        data[header_name] = row[idx]
        header_idx += 1
      end
    end
    
    data
  end
  
  #
  # 생산 계획의 공정, 품목으로 ProdParam에 존재하는지 체크 
  #
  def check_prod_params(op, prod)
    cnt = @domain.prod_params.where("operation_id = ? and product_id = ?", "#{@domain.id}-#{op}", "#{@domain.id}-#{prod}").count
    return (cnt > 0)
  end
  
  #
  # xls parsing - header 
  #
  def get_xls_hearder_info(header, shift_count)
    date_headers, header_data, day_index, shift_index, shift_index_reset = [], [], -1, 0, 0
    header.each_with_index do |h, idx|
      # xls header : 5개 컬럼 [Routing, Routing Desc., Product, Product Desc., Option] 이후에 날짜가 온다
      if(idx >= 5)
        if h          
          day_index += 1
          plan_date = ((DateTime.new(1899,12,30) + h.to_i).to_date).strftime(GlobalConfig.date_format)
          date_headers.push(plan_date)          
        end
        
        if(idx % 2 == 1)
          # 짝수면 shift를 올린다.
          shift_index += 1          
          header_data.push("D#{day_index}-#{shift_index}-seq")
        else
          header_data.push("D#{day_index}-#{shift_index}")
          shift_index_reset += 1
        end
        
        if(shift_index >= shift_count && shift_index_reset == 2)
          shift_index_reset = 0
          shift_index = 0
        end
      end
    end
    
    return date_headers, header_data
  end
  
  ####################################################################################
  #                               Save After Import 
  ####################################################################################
  
  #
  # update plans multiple data
  #
  def update_plans
    check_required_param(params, 'plan_date_from')
    # TODO 날짜 형식에 따라 파싱을 다르게 ...
    start_date = parse_date(params['plan_date_from'])
    current_date = @domain.shift.current_work_date
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.plan_date_must_be_gte_today') if(current_date >= start_date)
    
    plan_data_list  = ActiveSupport::JSON.decode(params['multiple_data'])
    total_shift, new_plans, new_bar_plans = @domain.shift.total_shift, [], []
    plan_list = plan_data_list.find_all { |plan_data| !(plan_data['check'] && plan_data['check'] == 'Check') }
    operation_ids = plan_list.collect { |plan| @domain.id + '-' + plan['operation'] }.uniq
    
    ProdPlan.transaction do
      # 기존 데이터 삭제 
      delete_plans(start_date, operation_ids)
          
      # 새로운 plan 생성 
      plan_data_list.each do |plan_data|
        plan_data.delete('check')
        plans = build_plans(@domain, start_date, @domain.shift.total_shift, plan_data)
        plans.each { |p| new_plans.push(p) }
      end
          
      # 새로운 plan 저장 
      new_plans.each do |new_plan|
        plan = @domain.prod_plans.new(new_plan)
        valid = false
        1.upto(total_shift) do |shift|
          valid = true if(!valid && new_plan["shift#{shift}_plan_qty"] > 0)
          plan["shift#{shift}_plan_qty"] = new_plan["shift#{shift}_plan_qty"]
          plan["shift#{shift}_seq"] = new_plan["shift#{shift}_seq"]
        end
        
        plan.save! if(valid)
      end
    end
  end
  
  #
  # 기존에 저장된 데이터를 모두 삭제 
  #
  def delete_plans(start_date, operation_ids)
    end_date = start_date + 6
    ProdPlan.delete_all(["domain_id = ? and (plan_date between ? AND ?) and operation_id in (?)", @domain.id, start_date, end_date, operation_ids])
  end
  
  #
  # build plans
  #
  def build_plans(domain, start_date, shift_count, hash)
    plans = []
    op = (hash.key?('operation') && !hash['operation'].blank?) ? "#{domain.id}-#{hash.delete('operation')}" : ''
    prod = (hash.key?('product') && !hash['product'].blank?) ? "#{domain.id}-#{hash.delete('product')}" : ''
    cust = (hash.key?('customer') && !hash['customer'].blank?) ? "#{domain.id}-#{hash.delete('customer')}" : ''
    
    # 데이터 구조 변환
    # from : {\"workcenter\":\"D1\",\"operation\":\"6AUK0\",\"product\":\"A101AEPAA13\",\"D0-1\":300,\"D0-2\":300,\"D1-1\":300,\"D1-2\":300,\"D2-1\":300,\"D2-2\":300,\"D3-1\":300,\"D3-2\":300,\"D4-1\":300,\"D4-2\":300,\"D5-1\":300,\"D5-2\":300,\"D6-1\":300,\"D6-2\":300}
    # to : array [{'operation_id':'System-6AUK0','product_id':'System-A101AEPAA13', 'customer_id':'BMW', 'plan_date' : '2013-02-24', 'shift1_plan_qty' : 200, 'shift2_plan_qty' : 300}, ...]
    hash.each do |k, v|
      next unless k.starts_with?('D')
      date_info = k.split('-')
      date_index = date_info[0][1].to_i
      shift = date_info[1].to_i
      next if shift > shift_count
      date = start_date + date_index
      qty = (v && !v.blank?) ? v.to_i : 0
      
      new_plan = plans.find { |plan| plan["plan_date"].to_s == date.to_s }
      unless new_plan
        new_plan = {"plan_date" => date, "operation_id" => op, "product_id" => prod} 
        new_plan["customer_id"] = cust if(cust && cust.size > 0)
        plans.push(new_plan)
      end
      
      if(k.ends_with?('-seq'))
        new_plan["shift#{shift}_seq"] = qty
      else        
        new_plan["shift#{shift}_plan_qty"] = qty        
      end
    end

    plans
  end
  
end