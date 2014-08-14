class SpcItem < ActiveRecord::Base

	stampable
	trace_removable
	universal_unique_id
	belongs_to :domain
	belongs_to :operation
	has_many :spc_values
	attr_accessible :name,:description,:operation_id,:x_usl,:x_lsl,:r_usl,:r_lsl
  
  #
  # from_date ~ to_date spc values
  #
  def get_values(from_date, to_date)
    self.spc_values.select("work_date, seq, val1, val2, val3, val4, val5, x_val, r_val, x_usl, x_lsl, r_usl, r_lsl").where("spc_item_id = ? and work_date between ? and ?", self.id, from_date, to_date).order("work_date asc, seq asc")
  end
  
end
