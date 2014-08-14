module ProdOrdersHelper
  
  #
  # Order 조회 
  # params
  #   - work_date-eq : order_date
  #   - work_date-gte : order_date from
  #   - work_date-gte : order_date to
  #   - shift-eq : shift
  #   - prod_dept-eq : 생산 부서 
  #   - dept_type-eq : 부서 타입 (DEPRECATED)
  #   - workcenter_id-eq : 워크센터 아이디 
  #   - operation_id-eq : 공정 아이디 
  #   - machine_id-eq : 설비 아이디 
  #   - product_id-eq : 품목 아이디 
  #   - operation.name-eq : 공정 이름 
  #   - machine.name-eq : 설비 이름 
  #   - product.name-eq : 품목 이름 
  #   - product.name-like : 품목 이름 like
  #   - status-eq : 오더 상태
  def search_orders
    search_prod_orders(@domain, params[:_q])
  end
  
  def search_prod_orders(domain, params)
    condition = get_search_cond(domain, params)
    select_str = 'prod_orders.id, prod_orders.name, prod_orders.order_date, prod_orders.shift, '
    select_str << 'prod_orders.operation_id operation_id, prod_orders.machine_id machine_id, prod_orders.product_id product_id, '
    select_str << 'operations.name operation, operations.description operation_desc, prod_orders.order_seq, products.name product, '
    select_str << 'products.description product_desc, machines.name machine, machines.description machine_desc, prod_orders.status,'
    select_str << 'prod_orders.uph, prod_orders.cycletime, prod_orders.order_qty, prod_orders.actual_qty, prod_orders.defect_qty, prod_orders.rework_qty, '
    select_str << 'prod_orders.pallet_qty, prod_orders.worker_count, prod_orders.actual_start_time, prod_orders.actual_end_time'
    order_str = 'prod_orders.order_date desc, prod_orders.shift, prod_orders.operation_id, prod_orders.machine_id, prod_orders.product_id'
    #include_arr = [:operation, :machine, :product]
    #orders = domain.prod_orders.where(condition).includes(include_arr).order(order_str)
    
    page = (params[:page] || 1).to_i
    limit = (params[:limit] || 30).to_i
    offset = (page - 1) * limit
      
    sql = domain.prod_orders.select(select_str).where(condition).joins(:operation, :machine, :product).order(order_str).limit(limit).offset(offset).to_sql
    total_count = domain.prod_orders.where(condition).joins(:operation, :machine, :product).count
    results = {:list => DiySelection.connection.select_all(sql), :count => total_count}
  end
  
  def get_search_cond(domain, params)
    p_work_date_eq = params['work_date-eq'] unless(params['work_date-gte'].blank?)    
    p_work_date_gte = params['work_date-gte'] unless(params['work_date-gte'].blank?)
    p_work_date_lte = params['work_date-lte'] unless(params['work_date-lte'].blank?)
    p_work_date_eq = params['order_date-eq'] unless(params['order_date-eq'].blank?)
    p_work_date_gte = params['order_date-gte'] unless(params['order_date-gte'].blank?)
    p_work_date_lte = params['order_date-lte'] unless(params['order_date-lte'].blank?)
    p_shift_eq = params['shift-eq'] unless(params['shift-eq'].blank?)
    p_prod_dept_eq = params['prod_dept-eq'] unless(params['prod_dept-eq'].blank?)
    p_dept_type_eq = params['dept_type-eq'] unless(params['dept_type-eq'].blank?)    
    p_workcenter_id_eq = params['workcenter_id-eq'] unless(params['workcenter_id-eq'].blank?)    
    p_operation_id_eq = params['operation_id-eq'] unless(params['operation_id-eq'].blank?)
    p_machine_id_eq = params['machine_id-eq'] unless(params['machine_id-eq'].blank?)
    p_product_id_eq = params['product_id-eq'] unless(params['product_id-eq'].blank?)
    p_workcenter_name_eq = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
    p_operation_name_eq = params['operation.name-eq'] unless(params['operation.name-eq'].blank?)
    p_machine_name_eq = params['machine.name-eq'] unless(params['machine.name-eq'].blank?)
    p_product_name_eq = params['product.name-eq'] unless(params['product.name-eq'].blank?)    
    p_product_name_like = params['product.name-like'] unless(params['product.name-like'].blank?)
    p_status_eq = params['status-eq'] unless(params['status-eq'].blank?)
    condition = ["prod_orders.id is not null"]

    # work_date condition
    if(p_work_date_eq)
      #condition[0] << " and order_date = ?" 
      condition[0] << " and prod_orders.order_date between ? and ?" 
      
      condition.push(parse_date(p_work_date_eq))
      condition.push(parse_date(p_work_date_eq))
    else
      if(p_work_date_gte)
        condition[0] << " and prod_orders.order_date > ?" 
        condition.push(parse_date(p_work_date_gte))
      end
      
      if(p_work_date_lte)
        condition[0] << " and prod_orders.order_date < ?" 
        condition.push(parse_date(p_work_date_lte))
      end
    end
    
    # work_date 검색조건이 없다면 기본으로 오늘 날짜만
    if(condition.size == 1) 
      condition[0] << " and prod_orders.order_date = ?" 
      condition.push(domain.shift.current_work_date)
    end
    
    # shift condition
    if(p_shift_eq)
      condition[0] << " and prod_orders.shift = ?" 
      condition.push(p_shift_eq)
    end
    
    # workcenter conditions
    if(p_workcenter_name_eq)
      condition[0] << " and operations.workcenter_id = (select id from workcenters where name = ?)" 
      condition.push(p_workcenter_name_eq)
    elsif(p_workcenter_id_eq)
      condition[0] << " and operations.workcenter_id = ?" 
      condition.push(p_workcenter_id_eq)
    end
    
    # operation conditions
    if(p_operation_id_eq)
      condition[0] << " and prod_orders.operation_id = ?"
      condition.push(p_operation_id_eq)
    end

    # machine conditions
    if(p_machine_id_eq)
      condition[0] << " and prod_orders.machine_id = ?"
      condition.push(p_machine_id_eq)
    end

    # product conditions
    if(p_product_id_eq)
      condition[0] << " and prod_orders.product_id = ?"
      condition.push(p_product_id_eq)
    end
    
    # operation name conditions
    if(p_operation_name_eq)
      op = domain.operations.find_by_name(p_operation_name_eq)
      if(op)
        condition[0] << " and prod_orders.operation_id = ?"
        condition.push(op.id)
      end
    end

    # machine name conditions
    if(p_machine_name_eq)
      mc = domain.machines.find_by_name(p_machine_name_eq)
      if(mc)
        condition[0] << " and prod_orders.machine_id = ?"
        condition.push(mc.id)
      end
    end

    # product name conditions
    if(p_product_name_eq)
      pd = domain.products.find_by_name(p_product_name_eq)
      if(pd)
        condition[0] << " and prod_orders.product_id = ?"
        condition.push(pd.id)
      end
    end
    
    # product name conditions
    if(p_product_name_like)
      condition[0] << " and prod_orders.product_id in (select id from products where name like ?)"
      condition.push("%#{p_product_name_like}%")
    end
    
    # status conditions
    if(p_status_eq)
      condition[0] << " and prod_orders.status = ?"
      condition.push(p_status_eq)
    end
    
    condition
  end
  
end
