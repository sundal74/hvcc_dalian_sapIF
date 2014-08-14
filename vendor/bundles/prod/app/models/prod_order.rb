class ProdOrder < ActiveRecord::Base

  include ProdOrdersHelper
  
	stampable
	universal_unique_id
	belongs_to :domain
	belongs_to :workcenter
	belongs_to :operation
	belongs_to :machine
	belongs_to :product
	belongs_to :customer
	attr_accessible :name,:order_date,:workcenter_id,:shift,:operation_id,:machine_id,:product_id,:customer_id,:status,:order_seq,:main_op_flag,:uph,:cycletime,:order_qty,:pallet_qty,:actual_qty,:defect_qty,:rework_qty,:actual_start_time,:actual_end_time,:worker_count,:worktime,:upload_flag
  attr_accessor :no_wip_flag
  
  before_validation(:on => :create) do
    self.worker_count ||= 0
    self.worktime ||= 0
    self.actual_qty ||= 0
    self.defect_qty ||= 0
    self.rework_qty ||= 0
    self.status = 'W' if(self.status.nil? || self.status.blank?)
  end
  
  before_save do
    self.workcenter_id = self.domain.operations.find(self.operation_id).workcenter_id if(self.workcenter_id.nil? || self.workcenter_id.blank?)
    self.upload_flag = true if(self.actual_qty_changed?)
  end
  
  after_save do
    return if self.no_wip_flag
    return unless self.operation
    act_qty_gap, defect_qty_gap, desc = 0, 0, ''
    
    # 변경 전, 후 actual_qty를 계산하여 WIP에 반영 
    if(self.actual_qty_changed?)
      act_qty_hist = self.changes['actual_qty']
      act_qty_bef = act_qty_hist[0] || 0
      act_qty_aft = act_qty_hist[1] || 0
      act_qty_gap = act_qty_aft - act_qty_bef
      desc << "Actual : #{act_qty_gap} "
    end
    
    # 변경 전, 후 defect_qty를 계산하여 WIP에 반영 
    if(self.defect_qty_changed?)
      defect_qty_hist = self.changes['defect_qty']
      defect_qty_bef = defect_qty_hist[0] || 0
      defect_qty_aft = defect_qty_hist[1] || 0
      defect_qty_gap = defect_qty_aft - defect_qty_bef
      desc << "Defect : #{defect_qty_gap}"
    end
    
    total_changed_qty = act_qty_gap - defect_qty_gap
    
    if(total_changed_qty != 0)
      # WIP 재공 조정 
      if(self.operation.inv_flag)
        inv = Inventory.find_inv(self.domain, self.operation_id, self.product_id)
        inv.lot_id = self.id
        inv.lot_type = 'Order'
        inv.machine_id = self.machine_id
        inv.description = desc
        
        if(total_changed_qty > 0)
          # inv_in
          inv.inv_in(total_changed_qty)
        else
          # inv_out
          inv.inv_out(-1 * total_changed_qty)
        end
      end
      
      # WIP Target Store WIP 재공 조정 
      if(self.operation.track_rm_store)
        inv = Inventory.find_inv(self.domain, self.operation.track_rm_store_id, self.product_id)
        inv.lot_id = self.id
        inv.lot_type = 'Order'
        inv.machine_id = self.machine_id
        inv.description = desc
        
        if(total_changed_qty > 0)
          inv.inv_out(total_changed_qty)
        else
          inv.inv_in((-1 * total_changed_qty))
        end
      end
    end
  end
    
  ###################################################################################################################################
  # 상태 코드 : W (대기), R(진행), T(완료)
  ###################################################################################################################################
  
  #
  # label master로 부터 lot size를 얻어 리턴 
  #
  def get_lot_size
    # label_master = LabelMaster.get_label_master(self.domain, self.product_id, self.operation_id, self.customer_id)
    #return label_master ? label_master.pallet_qty : self.product.default_qty
    return self.product ? self.product.default_qty : 0
  end
  
  #
  # 오더 status를 run으로 변경 
  #
  def change_status_to_run
    # 공정, 설비 단위로 조회해서 현재 작업이 첫 작업 시작이면 현재 시프트의 시작시간을 넣어준다.
    if(self.order_seq < 99 && self.worktime == 0)
      cnt = self.domain.prod_orders.where("order_date = ? and shift = ? and operation_id = ? and machine_id = ? and (status = 'R' or status = 'T')", self.order_date, self.shift, self.operation_id, self.machine_id).count
      if(cnt == 0)
        self.actual_start_time = self.domain.shift.shift_start_time(self.order_date.to_date, self.shift)
      else
        self.actual_start_time = Time.now
      end
    else
      self.actual_start_time = Time.now
    end
    
    self.status = "R"
    self.actual_end_time = nil
    self.save!
  end
  
  #
  # 오더 status를 terminated로 변경 
  #
  def change_status_to_term
    self.status = "T"
    self.actual_end_time = Time.now
    if(self.actual_end_time && self.actual_start_time)
      this_worktime = self.actual_end_time - self.actual_start_time
      self.worktime += (this_worktime.to_f / 60.to_f).to_i if(this_worktime > 0)
    end
    self.save!
    
    # WorkerTime 변경 
    worker_times = WorkerTime.where("end_time is null and prod_order_id = ?", self.id)
    worker_times.each do |worker_time|
      worker_time.end_time = Time.now
      worker_time.save!
    end if(worker_times)
  end
  
  #
  # Status 변경 - 작업자 화면 
  # 
  def change_status(params)
    self.change_status_to_run if(self.id != params['run_prod_order_id'])
    unless (params['run_prod_order_id'].blank?)
      run_prod_order = self.domain.prod_orders.find(params['run_prod_order_id'])
      run_prod_order.change_status_to_term if run_prod_order
    end
  end
  
  #
  # 실적 입력, 실적 입력 쪽은 다른 트랜잭션과 묶일 가능성이 높으므로 여기를 호출하는 트랜잭션 쪽에서 atomic을 보장하는 것으로 한다.
  # params
  # => act_qty : 실적 수량 
  # => def_qty : 불량 수량 
  # => rwk_qty : Rework 수량
  #
  def add_actual(act_qty, def_qty, rwk_qty)
    add_actual_at(act_qty, def_qty, rwk_qty, Time.now)
  end
  
  def add_actual_at(act_qty, def_qty, rwk_qty, act_time)
    # 1. check validation
    act_qty ||= 0
    def_qty ||= 0
    rwk_qty ||= 0
    
    # 2. order 수량 업데이트 
    self.actual_qty += act_qty
    self.defect_qty += def_qty
    self.rework_qty += rwk_qty
    self.save!
    
    # 3. sum_hourly_actuals 서머리 업데이트 
    SumHourlyActual.add_actual_at(self, act_qty, def_qty, rwk_qty, act_time)
  end
  
  #
  # 실적 삭제, 실적 삭제 쪽은 다른 트랜잭션과 묶일 가능성이 높으므로 여기를 호출하는 트랜잭션 쪽에서 atomic을 보장하는 것으로 한다.
  #
  def subtract_actual(act_qty, def_qty, rwk_qty)
    # 1. check validation
    act_qty ||= 0
    def_qty ||= 0
    rwk_qty ||= 0
    
    # 2. order 수량 빼기 
    if((self.actual_qty - act_qty) >= 0)
      self.actual_qty -= act_qty 
    else
      self.actual_qty = 0
    end
    
    if((self.defect_qty - def_qty) >= 0)
      self.defect_qty -= def_qty
    else
      self.defect_qty = 0
    end
    
    if((self.rework_qty - rwk_qty) >= 0)
      self.rework_qty -= rwk_qty
    else
      self.rework_qty = 0
    end
    
    self.save!
    
    # 3. sum_hourly_actuals 서머리 빼기
    SumHourlyActual.add_actual(self, (-1 * act_qty), def_qty, rwk_qty)
  end
  
  #
  # 실적 수정
  #
  def modify_actual(params)    
    sum_defect_qty = 0
    mod_act_qty = params['modify_qty'].blank? ? 0 : params['modify_qty'].to_i 
    mod_rwk_qty = params['modify_rework_qty'].blank? ? 0 : params['modify_rework_qty'].to_i
    
    # Lot 실적 변경 
    if(!params['lot_id'].blank?)
      lot = self.domain.lots.find_by_id(params['lot_id'])
      if(lot)
        lot.actual_qty += mod_act_qty
        lot.defect_qty += sum_defect_qty
        lot.rework_qty += mod_rwk_qty
        lot.description = params[:description]
        lot.save!
      else
        QtyActual.add_actual(self, mod_act_qty, sum_defect_qty, nil, mod_rwk_qty, params[:description])
      end
    # QtyActual에 추가
    else 
      QtyActual.add_actual(self, mod_act_qty, sum_defect_qty, nil, mod_rwk_qty, params[:description])
    end
  end
  
  #
  # 생산계획 추가 - 작업자 화면 
  #
  def self.add_orders(params)
    domain = Domain.find(params['domain_id'])
    add_orders = ActiveSupport::JSON.decode(params[:addPlans])
    add_orders.each do |add_order|
      product = domain.products.find(add_order['product_id'])
      prod_param = domain.prod_params.where("operation_id = ? and machine_id = ? and product_id = ?", add_order['operation_id'], add_order['machine_id'], add_order['product_id']).first
      add_order[:order_date] = parse_date(add_order['order_date'])
      add_order[:product_id] = add_order['product_id']
      add_order[:order_seq] = 99
      add_order[:uph] = prod_param.target_uph if(prod_param)
      add_order[:cycletime] = prod_param.cycletime if(prod_param)
      add_order[:pallet_qty] = product.default_qty
      new_order = domain.prod_orders.new(add_order)
      new_order.save!
    end
  end
    
end