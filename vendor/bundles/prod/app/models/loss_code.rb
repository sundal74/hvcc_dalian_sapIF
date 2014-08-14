class LossCode < ActiveRecord::Base

	stampable
	trace_removable
	meaningful_id [:domain_id, :name]
	belongs_to :domain
	attr_accessible :name,:description,:control_flag

end
