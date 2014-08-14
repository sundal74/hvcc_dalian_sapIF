class Machine < ActiveRecord::Base

	stampable
	trace_removable
	meaningful_id [:domain_id, :name]
	belongs_to :domain
	belongs_to :operation
	attr_accessible :name,:description,:operation_id,:status,:cycletime,:uph,:main_op_flag,:main_mc_flag,:plan_dist_rate,:check_flag,:check_cycle

end
