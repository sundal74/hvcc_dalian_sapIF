class ProdPlan < ActiveRecord::Base

	stampable
	universal_unique_id
	belongs_to :domain
	belongs_to :workcenter
	belongs_to :operation
	belongs_to :product
	belongs_to :customer
	attr_accessible :plan_date,:workcenter_id,:operation_id,:product_id,:customer_id,:shift1_plan_qty,:shift1_seq,:shift2_plan_qty,:shift2_seq,:shift3_plan_qty,:shift3_seq,:total_plan_qty
	
	before_save do
    self.total_plan_qty = 0
    self.total_plan_qty += self.shift1_plan_qty if(self.shift1_plan_qty)
    self.total_plan_qty += self.shift2_plan_qty if(self.shift2_plan_qty)
    self.total_plan_qty += self.shift3_plan_qty if(self.shift3_plan_qty)
    self.workcenter_id = self.operation.workcenter_id if(!self.workcenter_id || self.workcenter_id.empty?)
  end
  
end
