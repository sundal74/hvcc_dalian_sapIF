class PmsSpc < ActiveRecord::Base

  set_table_name :inf_pms_spc

  attr_accessible :prd_date,:routing,:st_no,:p_code,:item_no,:item_name,:seq,:val1,:val2,:val3,:val4,:val5,:x_val,:r_val,:actdttm,:prog_id,:upload_yn
  
  attr_accessor :x_usl, :x_lsl, :r_usl, :r_lsl
  
  def calc_avg
    return ((self.val1 + self.val2 + self.val3 + self.val4 + self.val5) / 5.0)
  end
  
  def calc_dev
    arr = [self.val1, self.val2, self.val3, self.val4, self.val5]
    return arr.max - arr.min
  end
  
end