class SpcValue < ActiveRecord::Base

	universal_unique_id
	belongs_to :spc_item
	attr_accessible :spc_item_id,:work_date,:seq,:val1,:val2,:val3,:val4,:val5,:x_val,:r_val,:x_usl,:x_lsl,:r_usl,:r_lsl

  before_create do
    self.x_val = ((val1 + val2 + val3 + val4 + val5) / 5.0) if(x_val.nil? || x_val.blank?)
    if(r_val.nil? || r_val.blank?)
      arr = [val1, val2, val3, val4, val5]
      arr.sort!
      self.r_val = arr[4] - arr[0]
    end
    
    if(self.spc_item_id)
      self.x_usl = self.spc_item.x_usl
      self.x_lsl = self.spc_item.x_lsl
      self.r_usl = self.spc_item.r_usl
      self.r_lsl = self.spc_item.r_lsl
    end
  end
  
  def work_date_str
    return self.work_date ? self.work_date.strftime('%m-%d') : ''
  end
  
end
