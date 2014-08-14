class DefectCode < ActiveRecord::Base

	stampable
	trace_removable
	meaningful_id [:domain_id, :name]
	belongs_to :domain
	attr_accessible :name,:description,:code_type

end
