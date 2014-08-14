class CurrnetWorkDate < ActiveRecord::Base
	
	set_table_name :current_work_date
	belongs_to :domain
	attr_accessible :work_date,:shift

end
