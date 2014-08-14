class ProdClosing < ActiveRecord::Base

	universal_unique_id
	belongs_to :domain
	belongs_to :operation
	belongs_to :closer, :class_name => 'User', :foreign_key => 'closer_id'
	attr_accessible :work_date,:operation_id,:closer_id,:closed_flag,:closed_at

  before_validation(:on => :create) do
    self.closed_at = Time.now unless(self.closed_at)
  end
end
