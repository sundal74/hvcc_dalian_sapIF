class SumBts < ActiveRecord::Base
	
	set_table_name :sum_bts
  universal_unique_id  
	belongs_to :domain
	belongs_to :operation
	belongs_to :machine
	belongs_to :product
	attr_accessible :work_date,:operation_id,:machine_id, :product_id,:plan_qty,:actual_qty,:plan_below_qty,:plan_achv_qty,:plan_act_lower_qty,:plan_act_gap_qty,:vol_perf,:mix_perf,:seq_perf,:bts_value,:shift

end
