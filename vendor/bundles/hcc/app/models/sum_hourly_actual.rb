class SumHourlyActual < ActiveRecord::Base

  universal_unique_id
	belongs_to :domain
	belongs_to :prod_order
	belongs_to :operation
	belongs_to :machine
	belongs_to :product
	attr_accessible :work_date,:shift,:prod_order_id,:operation_id,:machine_id,:product_id,:actual_hour,:actual_min,:last_actual_time,:order_qty,:actual_qty,:defect_qty

  #
  # 실적 입력 
  #
  def self.add_actual(prod_order, act_qty, def_qty, rwk_qty)
    add_actual_at(prod_order, act_qty, def_qty, rwk_qty, Time.now)
  end
  
  #
  # 실적만 업데이트 - 실적 시간까지 넘겨줘야 한다.  
  #
  def self.add_actual_at(prod_order, act_qty, def_qty, rwk_qty, act_time)
    actual_hour = act_time.hour
    actual_min = (act_time.min / 10)
    actual = prod_order.domain.sum_hourly_actuals.where("prod_order_id = ? and actual_hour = ? and actual_min = ?", prod_order.id, actual_hour, actual_min).first
    
    unless actual
      actual = prod_order.domain.sum_hourly_actuals.new
      actual.prod_order_id = prod_order.id
      actual.work_date = prod_order.order_date
      actual.shift = prod_order.shift
      actual.operation_id = prod_order.operation_id
      actual.machine_id = prod_order.machine_id
      actual.product_id = prod_order.product_id
      actual.actual_hour = actual_hour
      actual.actual_min = actual_min
      actual.last_actual_time = act_time
      actual.order_qty = prod_order.order_qty
    end
    
    actual.actual_qty ||= 0
    actual.defect_qty ||= 0
    actual.actual_qty += act_qty
    actual.defect_qty += def_qty
    actual.save!    
  end
  
end
