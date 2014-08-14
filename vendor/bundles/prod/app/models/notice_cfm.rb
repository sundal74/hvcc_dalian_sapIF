class NoticeCfm < ActiveRecord::Base

	universal_unique_id
	belongs_to :notice
	belongs_to :operation
	attr_accessible :notice_id,:operation_id,:check_flag,:check_time

end
