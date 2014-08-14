class SumOee < ActiveRecord::Base
	
	set_table_name :sum_oee
  universal_unique_id
	belongs_to :domain
	belongs_to :operation
	belongs_to :machine
	attr_accessible :work_date,:operation_id,:machine_id,:machine_ct,:machine_runtime,:valid_runtime,:actual_qty,:defect_qty,:prod_qty,:availability,:perf_eff,:quality,:oee_value

end
