class SumPlanActual < ActiveRecord::Base
	
  universal_unique_id  
	belongs_to :domain
	belongs_to :operation
	belongs_to :machine
	belongs_to :product
	attr_accessible :sum_year, :sum_month, :operation_id, :machine_id, :product_id,:order_qty,:actual_qty,:defect_qty,:rework_qty,:target_uph

end
