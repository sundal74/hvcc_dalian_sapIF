#encoding: utf-8 

puts "Loading [9010_create_ops_services] file..."

puts "Custom Service creating..."

DiyService.delete_all
domain = Domain.system_domain
admin = User.find_by_login('admin')

User.current_user = admin

# OpProdM010
# 오더리스트를 보여준다
DiyService.setup domain, :GetProdOrdersToday, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS
  check_required_params(params, ['work_date', 'operation_id', 'shift', 'machine_id'])

  order_date = parse_date(params[:work_date])

  conditions = ["prod_orders.order_date between ? and ?"]
  conditions.push(order_date)
  conditions.push(order_date)

  conditions[0] << " and prod_orders.shift = ?"
  conditions.push(params[:shift])

  conditions[0] << " and prod_orders.operation_id = ?"
  conditions.push(params[:operation_id])

  conditions[0] << " and prod_orders.machine_id = ?"
  conditions.push(params[:machine_id])

  orders = self.domain.prod_orders.joins(:operation, :machine, :product).where(conditions).order("order_seq")
  results = []

  orders.each do |order|
    results.push({
      :id => order.id, 
      :name => order.name, 
      :order_date => order.order_date, 
      :shift => order.shift, 
      :machine => order.machine ? order.machine.name : '',
      :machine_id => order.machine_id,
      :operation => order.operation ? order.operation.name : '', 
      :product => order.product ? order.product.name : '', 
      :product_desc => order.product ? order.product.description : '', 
      :product_id => order.product_id,
      :status => order.status, 
      :order_seq => order.order_seq, 
      :actual_start_time => order.actual_start_time, 
      :actual_end_time => order.actual_end_time, 
      :order_qty => order.order_qty, 
      :actual_qty => order.actual_qty, 
      :defect_qty => order.defect_qty, 
      :rework_qty => order.rework_qty, 
      :worker_count => order.worker_count,
      :pallet_qty => order.pallet_qty,
      :customer => order.customer ? order.customer.name : nil
    })
  end

  results
  EOS
  
  in_params :operation_id
  out_params :id
  out_params :name
  out_params :order_date
  out_params :shift
  out_params :machine
  out_params :product
  out_params :product_desc
  out_params :status
  out_params :order_seq
  out_params :actual_start_time
  out_params :actual_end_time
  out_params :order_qty
  out_params :actual_qty
  out_params :defect_qty
  out_params :rework_qty
  out_params :worker_count
  out_params :pallet_qty
end

# OpProdP020
# 계획 추가
DiyService.setup domain, :DoAddPlan, {:script_type => 'DSL', :active_flag => true, :atomic_flag => true} do
  @service_logic = <<-EOS
  check_required_param(params, 'addPlans')

  ProdOrder.add_orders(params)

  {"success" => true, "message" => "Success"}
  EOS
  
  in_params :workcenter_id
  in_params :operation_id
  in_params :machine_id
  in_params :product_id
  in_params :order_qty
  out_params :success
  out_params :message
end

# OpLnstM010
# 라인정지 리스트
DiyService.setup domain, :GetLineStop, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS
  selectStr = "machine_losses.id, machine_losses.status, machine_losses.work_date, machine_losses.event_time, machine_losses.maint_start_time, machine_losses.maint_end_time, "
  selectStr << "machine_losses.reporter_id reporter, machine_losses.maintainer_id maintainer, machine_losses.breakdown_code, machine_losses.line_stop_flag, "
  selectStr << "machine_losses.reporter_comment, machine_losses.maint_comment, machine_losses.maintainer_count, machine_losses.workcenter_id workcenter, "
  selectStr << "operations.name operation, machines.name machine"

  sql = self.domain.machine_losses.select(selectStr).where("machine_losses.status = ?", '1').joins(:operation, :machine).order("machine_losses.event_time desc").to_sql
  machine_losses = MachineLoss.connection.select_all(sql)
  bd_codes = self.domain.common_codes.find_by_name('BREAKDOWN_CODE').codes
  
  machine_losses.each do |machine_loss|
    breakdown_code = machine_loss['breakdown_code']
    bd_code = bd_codes.find { |code| code.name == breakdown_code } if(bd_codes)
    breakdown_code_desc = bd_code.description if(bd_code)
    machine_loss[:breakdown_code_desc] = breakdown_code_desc
  end

  machine_losses
  EOS
  
  out_params :status
  out_params :workcenter
  out_params :operation
  out_params :machine
  out_params :work_date
  out_params :event_time  
  out_params :maint_end_time
  out_params :reporter
  out_params :maintainer
  out_params :loss_code
  out_params :breakdown_code
  out_params :reporter_comment
  out_params :maint_start_time
  out_params :maint_comment
  out_params :line_stop_flag
  out_params :maintainer_count
end

# OpNotiM010
# 공지사항 popup
DiyService.setup domain, :GetNotices, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS
    check_required_params(params, ['work_date', 'operation_id'])
    work_date = parse_date(params[:work_date])

    conditions = ["work_date between ? and ?"]
    conditions.push(work_date)
    conditions.push(work_date)

  #  conditions[0] << " and ((notices.operation_id = ? and notices.machine_id = ?) or (notices.operation_id is null and notices.machine_id is null) or (notices.operation_id = ? and notices.machine_id is null)) and notice_cfms.operation_id is null and notice_cfms.machine_id is null"
  #  conditions.push(params[:operation_id])
  #  conditions.push(params[:machine_id])
  #  conditions.push(params[:operation_id])

    conditions[0] << " and (notices.operation_id = ? or notices.operation_id is null) and notice_cfms.operation_id is null "
    conditions.push(params[:operation_id])

    join_str = "LEFT OUTER JOIN (select * from notice_cfms where to_char(check_time, 'YYYY-MM-DD') = '\#{params[:work_date]}' and operation_id = '\#{params[:operation_id]}') notice_cfms ON notice_cfms.notice_id = notices.id"
    notices = self.domain.notices.where(conditions).joins(join_str).includes(:operation).order("created_at asc").first

    results = {}

    if(notices)
      op = notices.operation
      op_name = op ? op.name : ''
      results = {:id => notices.id, :work_date => notices.work_date, :operation => op_name, :msg => notices.msg, :created_at => notices.created_at, :operation_id => notices.operation_id}    
    end

    results
  EOS
  
  in_params :work_date
  in_params :operation_id
  out_params :id
  out_params :work_date
  out_params :operation
  out_params :msg
end

# notice_cfms insert
DiyService.setup domain, :CreateNoticeCfms, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS
  check_required_params(params, ['notice_id', 'operation_id'])
  cnt = NoticeCfm.where("notice_id = ? and operation_id = ? and check_flag = ?", params[:notice_id], params[:operation_id], true).count

  if(cnt == 0)
    data = {
      :notice_id => params[:notice_id],
      :operation_id => params[:operation_id],
      :check_flag => true,
      :check_time => Time.now
    }
    notice_cfms = NoticeCfm.new(data)
    notice_cfms.save
  end
  EOS
  
  in_params :notice_id
  in_params :operation_id
end

# 공지사항 리스트
DiyService.setup domain, :ListNotices, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS
  check_required_params(params, ['work_date', 'operation_id'])
  work_date = parse_date(params[:work_date])

  conditions = ["work_date between ? and ?"]
  conditions.push(work_date)
  conditions.push(work_date)

  conditions[0] << " and (operation_id = ? or operation_id is null)"
  conditions.push(params[:operation_id])
  notices = self.domain.notices.where(conditions).includes(:operation).order("created_at desc")

  results = []

  notices.each do |notice|
    op = notice.operation
    results.push({:id => notice.id, :work_date => notice.work_date, :operation => (op ? op.name : ''), :msg => notice.msg, :created_at => notice.created_at, :operation_id => (op ? op.id : '')})
  end

  results
  EOS
  
  in_params :work_date
  in_params :shift
  in_params :operation_id
  out_params :id
  out_params :work_date
  out_params :operation_id  
  out_params :operation  
  out_params :msg
  out_params :created_at
end

# OpScanM010, OpScanM020
# 스캔 실적
DiyService.setup domain, :DoActualScan, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS
  prod_order = self.domain.prod_orders.find(params[:prod_order_id])  
  op = prod_order.operation
  prod_param = self.domain.prod_params.where("operation_id = ? and machine_id = ? and product_id = ?", prod_order.operation_id, prod_order.machine_id, prod_order.product_id).first

  if(prod_param.location && prod_param.location.length > 2)
    op.scan(params, prod_order)

    prd_date = domain.shift.current_work_date.strftime('%Y%m%d')
    label_no = params[:label_no]
    label_arr = label_no.split('|')
    loc_cd = label_arr[1]
    prd_code = label_arr[2]
    lot_no = label_arr[3]
    ser_no = label_arr[4]
    qty = label_arr[5]
    user_id = User.current_user.id
    ip = ''

    plsql.connection = ActiveRecord::Base.connection.jdbc_connection
    result = plsql.BARCODE.SF_ACTUAL_MES_TO_BAR( "I00", "\#{prd_date}", "0", '', "\#{loc_cd}", "\#{prd_code}", "\#{label_no}", '2', "\#{qty}", "\#{lot_no}", "\#{ser_no}", '', '', "\#{user_id}", "\#{ip}", '0', 2)
    if(result != 'OK')
        raise Hatio::Exception::InvalidRequest, "ERROR AT PROCEDURE 'SP_CTRL_PROD_PERF_NEW01', \#{result}"
    end
  else
    op.scan(params, prod_order)
  end

  prod_order = self.domain.prod_orders.find(params[:prod_order_id])
  {"success" => true, "message" => "Success", "actual_qty" => prod_order.actual_qty}
  EOS
  
  in_params :prod_order_id
  out_params :success
  out_params :message
  out_params :actual_qty
end

# OpProdM010
# 계획 상태를 변경(작업시작,작업종료)
DiyService.setup domain, :DoProdOrderStatus, {:script_type => 'DSL', :active_flag => true, :atomic_flag => true} do
  @service_logic = <<-EOS
  prod_order = self.domain.prod_orders.find(params[:prod_order_id])  
  prod_order.change_status(params)
  {"success" => true, "message" => "success"}
  EOS
  
  in_params :prod_order_id
  out_params :success
  out_params :message
end

# OpLnstP030, OpLnstP050
# 라인정지 조치 상태 수정
DiyService.setup domain, :UpdateLineStopAdjust, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS
  check_required_params(params, ['machine_loss_id', 'maintainer_count', 'maint_start_time', 'maint_end_time'])

  machine_loss_id = params[:machine_loss_id]
  maintainer_count = params[:maintainer_count]
  maint_start_time = parse_time(params[:maint_start_time])
  maint_end_time = parse_time(params[:maint_end_time])
  maintainer_id = params[:maintainer_id] unless params[:maintainer_id].blank?
  breakdown_code = params[:breakdown_code] unless params[:breakdown_code].blank?
  loss_code_id = params[:loss_code_id] unless params[:loss_code_id].blank?
  maint_comment = params[:maint_comment] unless params[:maint_comment].blank?

  machine_loss = self.domain.machine_losses.find(params[:machine_loss_id])
  machine_loss.status = "2"
  machine_loss.maintainer_id = maintainer_id if(maintainer_id)
  machine_loss.maintainer_count = maintainer_count
  machine_loss.maint_start_time = maint_start_time
  machine_loss.maint_end_time = maint_end_time
  machine_loss.loss_code_id = loss_code_id if(loss_code_id)
  machine_loss.breakdown_code = breakdown_code if(breakdown_code)
  machine_loss.maint_comment = maint_comment if(maint_comment)
  machine_loss.save!

  {"success" => true, "message" => "success"}
  EOS

  in_params :machine_loss_id
  in_params :maintainer_id
  in_params :maintainer_count
  in_params :maint_start_time
  in_params :maint_end_time
  in_params :loss_code_id
  in_params :maint_comment
  out_params :success
  out_params :message
end

# OpLnstP020
# 라인정지 신고
DiyService.setup domain, :CreateLineStop, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS
  check_required_params(params, ['operation_id', 'machine_id', 'shift', 'reporter_id'])

  work_date = self.domain.shift.current_work_date
  shift = params[:shift]
  operation_id = params[:operation_id]
  op = self.domain.operations.find(operation_id)
  machine_id = params[:machine_id]
  workcenter_id = op.workcenter_id

  reporter_id = params[:reporter_id]
  reporter_comment = params[:reporter_comment].blank? ? "" : params[:reporter_comment]
  line_stop_flag = params[:line_stop_flag] unless params[:line_stop_flag].blank?
  line_stop_flag = false if(!line_stop_flag)

  data = {
    :work_date => work_date,
    :shift => shift,
    :reporter_id => reporter_id,
    :reporter_comment => reporter_comment,
    :line_stop_flag => line_stop_flag,
    :status => "1",
    #:event_time => params[:event_time_hour] + ':' + params[:event_time_min],
    :event_time => parse_time(params[:event_time]),
    :loss_code_id => params[:loss_code_id],
    :prod_order_id => params[:prod_order_id],
    :breakdown_code => params[:breakdown_code]
  }

  machine_loss = self.domain.machine_losses.new(data)
  machine_loss.save!

  {"success" => true, "message" => "success"}
EOS

  in_params :work_date
  in_params :shift
  in_params :workcenter_id
  in_params :operation_id
  in_params :machine_id
  in_params :reporter_id
  in_params :reporter_comment
  in_params :line_stop_flag
  out_params :success
  out_params :message
end

# OpLnstP040
# 라인정지 신고 수정
DiyService.setup domain, :UpdateLineStopReport, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS
  check_required_params(params, ['machine_loss_id'])

  line_stop_flag = params[:line_stop_flag] unless params[:line_stop_flag].blank?
  reporter_id = params[:reporter_id] unless params[:reporter_id].blank?
  event_time = params[:event_time] unless params[:event_time].blank?
  reporter_comment = params[:reporter_comment] unless params[:reporter_comment].blank?
  loss_code_id = params[:loss_code_id] unless params[:loss_code_id].blank?
  breakdown_code = params[:breakdown_code] unless params[:breakdown_code].blank?
  machine_loss = self.domain.machine_losses.find(params[:machine_loss_id])

  machine_loss.line_stop_flag = (!line_stop_flag) ? false : true
  machine_loss.reporter_id = reporter_id if(reporter_id)
  machine_loss.event_time = parse_time(event_time) if(event_time)
  machine_loss.loss_code_id = loss_code_id if(loss_code_id)
  machine_loss.breakdown_code = breakdown_code if(breakdown_code)
  machine_loss.reporter_comment = reporter_comment if(reporter_comment)
  machine_loss.save!

  {"success" => true, "message" => "success"}
  EOS
  
  in_params :machine_loss_id
  in_params :line_stop_flag
  in_params :reporter_id
  in_params :event_time
  in_params :reporter_comment
  out_params :success
  out_params :message
end

# OpProdP040
# 실적수정
DiyService.setup domain, :UpdateProdOrderModifyActual, {:script_type => 'DSL', :active_flag => true, :atomic_flag => true} do
  @service_logic = <<-EOS
  prod_order = self.domain.prod_orders.find(params[:prod_order_id])  
  prod_order.modify_actual(params)

  {"success" => true, "message" => "Success"}
  EOS
  
  in_params :prod_order_id
  out_params :success
  out_params :message
end

# OpProdP030, OpProdP070
# 생산계획에 따른 작업자 시간 확인 및 수정
DiyService.setup domain, :UpdateWorkerPlanModifyTime, {:script_type => 'DSL', :active_flag => true, :atomic_flag => true} do
  @service_logic = <<-EOS
check_required_param(params, 'prod_order_id')

status_times = params[:status_worker_times] unless(params[:status_worker_times].blank?)
new_times = params[:new_worker_times] unless(params[:new_worker_times].blank?)
modified_times = params[:modified_worker_times] unless(params[:modified_worker_times].blank?)
removed_times = params[:removed_worker_times] unless(params[:removed_worker_times].blank?)

if(removed_times)
  removed_worker_times = ActiveSupport::JSON.decode(removed_times)

  removed_worker_times.each do |removed_worker_time|
    worker_time = WorkerTime.find(removed_worker_time['id'])
    worker_time.destroy
  end
end

if(modified_times)
  modified_worker_times = ActiveSupport::JSON.decode(modified_times)

  modified_worker_times.each do |modified_worker_time|
    worker_time = WorkerTime.find(modified_worker_time['id'])
    if(worker_time)
      worker_time.user_id = modified_worker_time['user_id']
      worker_time.start_time = parse_time(modified_worker_time['start_time'])
      worker_time.end_time = parse_time(modified_worker_time['end_time'])
    end
    worker_time.save!
  end
end

if(new_times)
  new_worker_times = ActiveSupport::JSON.decode(new_times)

  new_worker_times.each do |new_worker_time|
    data ={
      :prod_order_id => params['prod_order_id'],
      :user_id => new_worker_time['user_id'],
      :start_time => parse_time(new_worker_time['start_time']),
      :end_time => parse_time(new_worker_time['end_time'])
    }
    worker_time = WorkerTime.new(data)
    worker_time.save!
  end
end

if(status_times)
  status_worker_times = ActiveSupport::JSON.decode(status_times)

  status_worker_times.each do |status_worker_time|
    end_wt = WorkerTime.where("end_time is null and user_id = ?", status_worker_time['user_id'])
    end_wt.each do |wt|
      wt.end_time = Time.now
      wt.save!
    end if(end_wt)
    
    data ={
      :prod_order_id => params['prod_order_id'],
      :user_id => status_worker_time['user_id'],
      :start_time => parse_time(status_worker_time['start_time'])
    }
    worker_time = WorkerTime.new(data)
    worker_time.save!
  end
end

{"success" => true, "message" => "Success"}
  EOS
  
  in_params :work_date
  in_params :shift
  in_params :operation_id
  in_params :user_id
  in_params :start_time
  in_params :end_time
  out_params :success
  out_params :message
end

# 현재 미사용
# 공정에 따른 설비 리스트
DiyService.setup domain, :ListAddPlanMachines, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS
  check_required_param(params, 'operation_id')

  machines = self.domain.machines.where("operation_id = ?" , params[:operation_id])
  results = []

  machines.each do |machine|
    machine_desc = machine.description ? ' (' + machine.description + ')' : ''
    results.push({:machine_id => machine.id, :machine => machine.name + machine_desc, :product_id => ''})
  end

  results
  EOS
  
  in_params :work_date
  in_params :operation_id
  in_params :shift
  in_params :workcenter_id
  out_params :machine_id
  out_params :machine
  out_params :product_id
end

# 공정, 설비에 따른 생산 파라미터의 품목 리스트 
DiyService.setup domain, :ListAddPlanProducts, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS
  check_required_params(params, ['operation_id', 'machine_id'])
  prod_name = params['_q']['name-like']

  page = (params[:page] || 1).to_i
  limit = (params[:limit] || 25).to_i
  offset = (page - 1) * limit

  conditions = ["prod_params.operation_id = ? and prod_params.machine_id = ?"]
  conditions.push(params[:operation_id])
  conditions.push(params[:machine_id])

  conditions[0] << " and products.name like '%\#{prod_name}%'" if(prod_name && !prod_name.blank?)
  total_count = self.domain.prod_params.joins(:operation, :machine, :product).where(conditions).count
  sql = self.domain.prod_params.select("prod_params.product_id id, products.name, products.description").joins(:operation, :machine, :product).where(conditions).limit(limit).offset(offset).to_sql
  results = ProdParam.connection.select_all(sql)

  {"items" => results, "success" => true, "total" => total_count}
  EOS
  
  in_params :machine_id
  in_params :operation_id
end

# OpProdP030, OpProdP070
# 생산계획에 따른 작업자 리스트
DiyService.setup domain, :ListWorkerPlanUsers, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS
  prod_order_id = params[:prod_order_id] unless(params[:prod_order_id].blank?)
   record_type = params[:record_type] unless(params[:record_type].blank?)
   results = []

   if(prod_order_id)
     conditions = ["prod_order_id = ?"]
     conditions.push(params[:prod_order_id])

     # 작업 개시 버튼을 눌렀을 경우 
     if(record_type == 'new')
       conditions[0] << ' and end_time is null'
       wts = WorkerTime.select('user_id').includes(:user).where(conditions).group('user_id')

       # 종료 시간이 없는 사용자 리스트가 있다면 뿌려준다.
       if(wts.length > 0)
         wts.each do |wt|
     	    results.push({:user => {:id => wt.user_id, :name => wt.user.name}, :start_time => Time.now})
     	  end
     	# 종료 시간이 없는 사용자가 없다면 
       else
         # TODO 다른 공정에서 작업 중인 사용자가 있는지 체크하여 있다면 제거
         wts = WorkerTime.select('user_id').includes(:user).where("prod_order_id = ?", params[:prod_order_id]).group('user_id')

         # 오더 아이디로 조회하여 모든 사용자를 보여준다.
         if(wts.length > 0)
           wts.each do |wt|
       	    results.push({:user => {:id => wt.user_id, :name => wt.user.name}, :start_time => Time.now})
       	  end

       	# 오더 아이디로 조회하여 사용자가 없다면 최초 시작이므로 공정에 매핑된 사용자 리스트를 보여준다.
         else
           prod_order = self.domain.prod_orders.find(params[:prod_order_id])
           sql = OperationsUsers.select("users.id user_id, users.name user_name").joins(:user).where("operation_id = ?", prod_order.operation_id).to_sql
           ous = OperationsUsers.connection.select_all(sql)
           st = self.domain.shift.shift_start_time(prod_order.order_date, prod_order.shift)
           ous.each do |ou|
             results.push({:user => {:id => ou['user_id'], :name => ou['user_name']}, :start_time => st})
           end
         end
       end

     # 하단 Modify Operator 버튼을 클릭했을 경우 : TODO 중복된 사용자는 제거하고 사용자당 마지막 데이터만 보여준다.
     else
       wts = WorkerTime.includes(:user).where(conditions).order('start_time')
       wts.each do |wt|
   	    results.push({:user => {:id => wt.user_id, :name => wt.user.name}, :start_time => wt.start_time, :end_time => wt.end_time, :id => wt.id})
   	  end
     end
   end

   # TODO 다른 공정에서 작업 중인 사용자가 있는지 체크하여 있다면 제거
   # if(results && results.size > 0)
   #   user_ids = results.collect { |wt| wt[:user] ? wt[:user][:id] : '' }
   #   if(user_ids && user_ids.size > 0)
   #     prod_order = self.domain.prod_orders.find(params[:prod_order_id])
   #     onusers = WorkTime.select("user_id").where("work_date = ? and shift = ? and operation_id != ? and start_time is not null and end_time is null and user_id in (?)", prod_order.work_date, prod_order.shift, prod_order.operation_id, user_ids)
   #     # TODO ....
   #   end
   # end

   results
  EOS
  
  in_params :prod_order_id
  out_params :id
  out_params :user
  out_params :start_time
  out_params :end_time
end

# DEPRECATED OpScanM010
# Flow 다음공정
DiyService.setup domain, :GetScanNextOp, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS
  check_required_param(params, 'prod_order_id')
  prod_order = domain.prod_orders.find(params[:prod_order_id])
  results = prod_order.operation.get_next_ops(prod_order, params)
  results
  EOS
end

# OpRwmtM010
# 자재투입
DiyService.setup domain, :CreateRmLot, {:script_type => 'DSL', :active_flag => true, :atomic_flag => true} do
  @service_logic = <<-EOS
  operation = self.domain.operations.find(params[:operation_id])
  operation.scan_rm_input(params)
  {"success" => true, "message" => "Success"}
  EOS
  
  in_params :label_no
  in_params :operation_id
  out_params :success
  out_params :message
end

# 현재미사용
# OpScanM030
DiyService.setup domain, :GetPackOpInfo, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS

  work_date = self.domain.shift.current_work_date
  shift = self.domain.shift.current_shift
  operation_id = params[:operation_id]
  prod_orders = self.domain.prod_orders.where("order_date = ? and shift = ? and operation_id =? and status = ?", work_date, shift, operation_id, 'R')

  if(!prod_orders || prod_orders.size == 0)
       {"success" => false, "message" => "No running order!"}
  else
       {"success" => true, "message" => "Success", "prod_order_id" => prod_orders.first.id}
  end
  EOS
  
  in_params :operation_id
  out_params :prod_order_id
end

# OpScanM030
# 시리얼 Lot 스캔
DiyService.setup domain, :ScanPackSerial, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS

  prod_order = domain.prod_orders.find(params[:prod_order_id])

  result = prod_order.operation.scan(params, prod_order)

  result
  EOS
  
  in_params :label_no
  in_params :prod_order_id
end

# OpScanM030
# final lot 생성
DiyService.setup domain, :CreatePackLot, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS
  prod_order = domain.prod_orders.find(params[:prod_order_id])

  print_command  = prod_order.operation.create_final_lot(prod_order)

  {"success" => true, "print_command" => print_command}
  EOS
  
  in_params :prod_order_id
  out_params :success
end

# OpProdP060
# 불량등록
DiyService.setup domain, :CreateDefect, {:script_type => 'DSL', :active_flag => true, :atomic_flag => true} do
  @service_logic = <<-EOS
  check_required_params(params, ['prod_order_id', 'work_date', 'operation_id', 'shift', 'defect_info'])

  operation = self.domain.operations.find(params[:operation_id])
  workcenter = self.domain.workcenters.find(operation.workcenter_id)

  dept_type = workcenter.dept_type
  work_date = parse_date(params[:work_date])
  shift = params[:shift]
  operation_id = params[:operation_id]
  defect_list = ActiveSupport::JSON.decode(params[:defect_info])

  sum_defect_qty = 0

  defect_list.each do |defect_info|
    data = {
      :prod_order_id => params[:prod_order_id],
      :dept_type => dept_type,
      :work_date => work_date,
      :shift => shift,
      :operation_id => operation_id,
      :machine_id => defect_info['machine_id'],
      :product_id => defect_info['product_id'],
      :defect_code_id => defect_info['defect_code_id'],
      :defect_qty => defect_info['defect_qty']
    }
    sum_defect_qty += defect_info['defect_qty']
    defect = self.domain.defects.new(data)
    defect.save!
  end

  prod_order = self.domain.prod_orders.find(params[:prod_order_id])
  prod_order.rework_qty += params[:rework_qty].to_i
  prod_order.save!

  {"success" => true, "message" => "success"}
  EOS
  
  in_params :product_id
  in_params :defect_code_id
  in_params :defect_qty
  out_params :success
  out_params :message
end

# OpRwmtM030
# 자재 Lot 리스트
DiyService.setup domain, :GetRmLotList, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS
  check_required_param(params, 'operation_id')

  page = (params[:page] || 1).to_i
  limit = (params[:limit] || 30).to_i
  offset = (page - 1) * limit
  operation = Operation.find(params[:operation_id])

  total_count = self.domain.lots.where("input_op = ? and track_qty > 0", operation.name).count
  rm_lots = self.domain.lots.where("input_op = ? and track_qty > 0", operation.name).order("input_time desc").limit(limit).offset(offset)
  results = []

  rm_lots.each do |rm_lot|
    results.push({
      :id => rm_lot.id,
      :operation => operation.name,
      :lot_no => rm_lot.lot_no,
      :serial_no => rm_lot.serial_no,
      :product => rm_lot.product.name,
      :in_qty => rm_lot.actual_qty,
      :track_qty => rm_lot.track_qty,
      :input_time => rm_lot.tran_time
    })
  end

  results

  {"items" => results, "success" => true, "total" => total_count}
  EOS
  
  in_params :operation_id
  out_params :id
  out_params :operation
  out_params :raw_lot_no
  out_params :serial_no
  out_params :supplier_code
  out_params :part_no
  out_params :qty
  out_params :inv_qty
  out_params :inv_in_time
end

# 현재 미사용
# OpRwmtM030, OPRwmtP040 
# 자재 수량 삭제 및 수정
DiyService.setup domain, :UpdateRmLotQty, {:script_type => 'DSL', :active_flag => true, :atomic_flag => true} do
  @service_logic = <<-EOS
  check_required_params(params, ['rm_lot_id', 'mode'])

  if(params[:mode] == 'update')
    modify_qty = params[:modify_qty] unless params[:modify_qty].blank?

    rm_lot = self.domain.rm_lots.find(params[:rm_lot_id])

    if(modify_qty)
      if(params[:calculation] == 'true')
        rm_lot.inv_qty += modify_qty.to_i
        rm_lot.in_qty += modify_qty.to_i
      else
        rm_lot.inv_qty -= modify_qty.to_i
        rm_lot.in_qty -= modify_qty.to_i
      end
    end
    rm_lot.save!
  else
    rm_lot = self.domain.rm_lots.find(params[:rm_lot_id])
    rm_lot.delete
  end

  {"success" => true, "message" => "Success"}
  EOS
  
  in_params :rm_lot_id
  in_params :modify_qty
  in_params :mode
  in_params :calculation
  out_params :success
  out_params :message
end

# OpProdP040
# Lot에 등록되어 있는 불량코드를 보여준다
DiyService.setup domain, :ListDefectCode, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS
  check_required_param(params, 'prod_order_id')
  lot_id = params[:lot_id] unless(params[:lot_id].blank?)

  conditions = ["prod_order_id = ?"]
  conditions.push(params[:prod_order_id])

  if(lot_id)
    conditions[0] << ' and lot_id = ?'
    conditions.push(lot_id)
  end

  defects = self.domain.defects.where(conditions)
  results = []
  defects.each do |defect|
    results.push({:defect_code => {:id => defect.defect_code_id, :name => defect.defect_code.name}, :defect_qty => defect.defect_qty, :id => defect.id})
  end

  results
  EOS
  
  in_params :prod_order_id
  out_params :id
  out_params :defect_code
  out_params :defect_qty
end

# OpProdM020
# Lot 삭제
DiyService.setup domain, :CancelLot, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS
  check_required_params(params, ['lot_id'])
  lot = Lot.find(params[:lot_id])
  lot.cancel_lot
  {:success => true, :msg => 'Success' }
  EOS
  
  in_params :lot_id
  out_params :success
  out_params :message
end

# OpProdP080
# bar_item_req insert(바코드 시스템 자재요청)
DiyService.setup domain, :RequestRm, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS
  check_required_params(params, ['operation', 'machine', 'request_time', 'request_date', 'remote_ip', 'product_id', 'request_qty', 'requestor_id'])

  product = self.domain.products.find(params['product_id'])

  sql = "select max(req_seq) from bar_item_req where req_date = '" + params[:request_date] + "' and routing = '" + params[:operation] + "' and item_id = '" + product.name + "' "

  seq = DiyService.connection.select_all(sql)

  req_seq = seq[0]['max(req_seq)'].blank? ? 1 : (seq[0]['max(req_seq)'].to_i + 1)

  insert_sql = "insert into bar_item_req (req_date, routing, item_id, req_seq, machine_id, lot_size, req_qty, req_id, reg_dtm, reg_ip) values ('\#{params[:request_date]}', '\#{params[:operation]}', '\#{product.name}', '\#{req_seq}', '\#{params[:machine]}', '\#{product.default_qty}', '\#{params[:request_qty]}', '\#{params[:requestor_id]}', '\#{params[:request_time]}', '\#{params[:remote_ip]}')"

  DiyService.connection.insert(insert_sql)

  {"success" => true, "message" => "Success"}
  EOS
  
  in_params :operation
  in_params :machine
  in_params :request_time
  in_params :request_date
  in_params :remote_ip
  in_params :product_id
  in_params :request_qty
  in_params :requestor_id
  
  out_params :success
  out_params :message
end

# OpScanP100
# 매뉴얼 실적 입력 
DiyService.setup domain, :DoManualInput, {:script_type => 'DSL', :active_flag => true, :atomic_flag => true} do
  @service_logic = <<-EOS
  prod_order = self.domain.prod_orders.find(params[:prod_order_id])  
  prod_order.operation.scan_manual_type(prod_order, params)
  prod_order = self.domain.prod_orders.find(params[:prod_order_id])
  {"success" => true, "message" => "Success", "actual_qty" => prod_order.actual_qty}
  EOS
end

# OpProdP090
# 다중 매뉴얼 실적 입력 
DiyService.setup domain, :DoMultiManualOutput, {:script_type => 'DSL', :active_flag => true, :atomic_flag => true} do
  @service_logic = <<-EOS
  orders_str  = params[:orders]
  orders = ActiveSupport::JSON.decode(orders_str)

  orders.each do |order|
      order_id = order['id']
      order_obj = ProdOrder.find(order_id)
      add_qty = order['add_qty'].to_i
      order_obj.add_actual(add_qty, 0, 0) if(add_qty != 0)
  end

  { "success" => true, "message" => "Success" }
  EOS
end

# OpRwmtM010
# 자재 투입 전 Validation
DiyService.setup domain, :CheckValidRm, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS
  operation = self.domain.operations.find(params[:operation_id])
  operation.check_valid_rm(params)
  {"success" => true, "message" => "Success"}
  EOS
end

# OpScanP110
# Lot Scan 전 Validation
DiyService.setup domain, :CheckValidLot, {:script_type => 'DSL', :active_flag => true} do
  @service_logic = <<-EOS
  operation = self.domain.operations.find(params[:operation_id])
  operation.check_valid_lot(params)
  {"success" => true, "message" => "Success"}
  EOS
end

# OpScanP200
# WIP Input
DiyService.setup domain, :WipInput, {:script_type => 'DSL', :active_flag => true, :atomic_flag => true} do
  @service_logic = <<-EOS
  check_required_params(params, ['operation_id', 'machine_id',  'label_no'])
  op = Operation.find(params[:operation_id])
  op.scan_wip_input(params)
  {:success => true, :message => 'Success'}
  EOS
end

puts "Ops Serivce Loaded!"