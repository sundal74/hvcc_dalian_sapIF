class Notice < ActiveRecord::Base

	stampable
	universal_unique_id
	belongs_to :domain
	belongs_to :operation
	has_one :notice_cfm
	attr_accessible :work_date,:shift,:priority,:operation_id,:msg

  # before_validation do
  #   self.work_date = self.work_date.to_date if self.work_date
  # end
    
end
