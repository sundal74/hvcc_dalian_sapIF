require 'rubygems'
require 'torquebox-messaging'

class ActualInfTask < TorqueBox::Messaging::Task
  
  def check_actual(payload)    
    # 1. INF_PMS_OUTR 테이블에서 UPLOAD_YN이 N인 데이터를 조회
    # domain = Domain.system_domain
    # current_work_date = domain.shift.current_work_date
    # current_shift = domain.shift.current_shift
    # query_date_str = (current_work_date - 1).strftime('%Y%m%d')
    # sql = PmsOutr.select("O.PRD_DATE, O.SHIFT, O.ROUTING, O.INT_NO, O.ST_NO, O.P_CODE, O.ACTUAL, M.MODEL_NO, S.EQUIPMENT, O.ACTDTTM").joins(" O INNER JOIN INF_PMS_MASTER_MODEL M ON O.P_CODE = M.P_CODE INNER JOIN INF_PMS_MASTER_STATION S ON O.ST_NO = S.ST_NO").where("O.UPLOAD_YN = 'N' AND M.MODEL_NO IS NOT NULL AND S.EQUIPMENT IS NOT NULL AND O.PRD_DATE >= '#{query_date_str}' AND O.ROUTING = S.ROUTING AND O.ROUTING = M.ROUTING").order("O.ACTDTTM desc").limit(100).to_sql
    # pms_outs = PmsOutr.connection.select_all(sql)
    # return if(pms_outs.size == 0)
    # 
    # pms_outs.each do |pms_out|
    #   begin
    #     # 현재 work_date와 order의 work_date가 다르다면 작업시작을 하지 않고 그냥 실적만 업데이트 한다. 
    #     job_start_flag = (current_work_date.strftime('%Y%m%d') == pms_out['prd_date'] && current_shift == pms_out['shift'].to_i)
    #     self.add_actual(domain, pms_out, job_start_flag)
    #   rescue Exception => e
    #     debug_print e
    #   end
    # end
  end
  
  def add_actual(domain, pms_out, job_start_flag)
    # PRD_DATE, SHIFT, ROUTING, PRODUCT, MACHINE으로 PROD_ORDER를 찾는다.
	  work_date_str = pms_out['prd_date']
    work_date = Date.strptime(work_date_str, '%Y%m%d')
    shift = pms_out['shift'].to_i
    routing = pms_out['routing']
    equipment = pms_out['equipment']
    model_no = pms_out['model_no']
    st_no = pms_out['st_no']
    int_no = pms_out['int_no']
    p_code = pms_out['p_code']
    actdttm = pms_out['actdttm']
	  actual = pms_out['actual'].to_i
    op_id = "#{domain.id}-#{routing}"
    mc_id = "#{domain.id}-#{equipment}"
    pd_id = "#{domain.id}-#{model_no}"
    
    prod_orders = domain.prod_orders.
    where("order_date = ? and shift = ? and operation_id = ? and machine_id = ? and product_id = ?", work_date, shift, op_id, mc_id, pd_id).limit(1)
    
    # PROD_ORDER가 없다면 생성한다
    if(!prod_orders || prod_orders.length == 0)
      prod_order = domain.prod_orders.new
      prod_order.order_date = work_date
      prod_order.shift = shift
      prod_order.operation_id = op_id
      prod_order.machine_id = mc_id
      prod_order.product_id = pd_id
      prod_order.status = 'W'
      prod_order.order_seq = 99
      prod_order.main_op_flag = true
      prod_order.main_machine_flag = true
      prod_order.save!
    else
      prod_order = prod_orders.first
    end
    
    prod_order.no_wip_flag = true
    act_time = Time.strptime(actdttm[0..13], '%Y%m%d%H%M%S')
    
    # 이전에 Running 중인 order를 찾아서 자기 자신이 아니라면 상태를 변경한다. 
    if(prod_order.status != 'R' && job_start_flag)
      prev_run_orders = domain.prod_orders.where("order_date = ? and shift = ? and operation_id = ? and machine_id = ? and status = 'R'", work_date, shift, op_id, mc_id).limit(1)
      if(prev_run_orders && prev_run_orders.length > 0)
        prev_run_orders.first.change_status_to_term
      end      
      
      prod_order.change_status_to_run
      # worker_times 자동으로 추가 
      workers = prod_order.operation.users
      workers.each do |worker|
        worker_time = prod_order.domain.worker_times.new
        worker_time.prod_order = prod_order
        worker_time.user_id = worker.id
        worker_time.start_time = Time.now
        worker_time.save!
      end if(workers)
    end
    
    prod_order.add_actual_at(actual, 0, 0, act_time)
	  update_sql = "UPDATE INF_PMS_OUTR SET UPLOAD_YN = 'Y' WHERE PRD_DATE = '#{work_date_str}' AND SHIFT = '#{shift}' AND ROUTING = '#{routing}' AND ST_NO = '#{st_no}' AND INT_NO = '#{int_no}' AND P_CODE = '#{p_code}' AND ACTDTTM = '#{actdttm}' AND UPLOAD_YN = 'N'"
    PmsOutr.connection.execute(update_sql)
    #puts "Job Start? : #{job_start_flag}, ORDER : #{work_date_str}, #{shift}, #{routing}, #{equipment}, #{model_no}, #{prod_order.actual_qty}, #{actdttm}"
  end
  
end