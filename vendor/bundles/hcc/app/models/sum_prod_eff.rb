class SumProdEff < ActiveRecord::Base
	
  universal_unique_id
	belongs_to :domain
	belongs_to :operation
	belongs_to :machine
	belongs_to :product
	attr_accessible :work_date,:operation_id,:machine_id,:product_id,:net_ct,:machine_ct,:actual_qty,:input_worktime,:net_worktime,:prod_eff,:real_worktime,:loss_worktime,:mh_loss_worktime,:order_qty

end
