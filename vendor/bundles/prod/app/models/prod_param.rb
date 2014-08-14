class ProdParam < ActiveRecord::Base

  universal_unique_id
	stampable
	trace_removable
	belongs_to :domain
	belongs_to :operation
	belongs_to :machine
	belongs_to :product
	attr_accessible :operation_id,:machine_id,:product_id,:location,:target_uph,:cycletime

end
