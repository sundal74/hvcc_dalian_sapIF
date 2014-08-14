class LossTemplate < ActiveRecord::Base

	stampable
	trace_removable
	universal_unique_id
	belongs_to :domain
	belongs_to :loss_code
	attr_accessible :week_day,:start_time,:end_time,:loss_term,:loss_code_id,:control_flag

end
