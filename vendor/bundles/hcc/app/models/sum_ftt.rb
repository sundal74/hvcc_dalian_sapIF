class SumFtt < ActiveRecord::Base
	
	set_table_name :sum_ftt
  universal_unique_id
	belongs_to :domain
	belongs_to :operation
	belongs_to :machine
	attr_accessible :work_date,:operation_id,:machine_id,:input_qty,:defect_qty,:rework_qty,:repair_qty,:ftt_value,:total_defect_qty

end
