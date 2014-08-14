class QtyActual < ActiveRecord::Base

	stampable
	trace_removable
	universal_unique_id
	belongs_to :domain
	belongs_to :operation
	belongs_to :machine
	belongs_to :product
	belongs_to :customer
	belongs_to :prod_order
	attr_accessible :work_date,:shift,:operation_id,:machine_id,:product_id,:customer_id,:prod_order_id,:actual_qty,:defect_qty,:rework_qty,:description
	
  after_create do
    self.prod_order.add_actual(self.actual_qty, self.defect_qty, self.rework_qty) if(self.prod_order)
  end

  #
  # 실적 등록 
  #
  def self.add_actual(prod_order, actual_qty, defect_qty, defect_info, rework_qty, description)
    actual = prod_order.domain.qty_actuals.new
    actual.prod_order_id = prod_order.id
    actual.work_date = prod_order.order_date
    actual.shift = prod_order.shift
    actual.operation_id = prod_order.operation_id
    actual.machine_id = prod_order.machine_id
    actual.product_id = prod_order.product_id
    actual.customer_id = prod_order.customer_id
    actual.actual_qty = actual_qty
    actual.defect_qty = defect_qty
    actual.rework_qty = rework_qty
    actual.description = description
    actual.save!
  end
  
end
