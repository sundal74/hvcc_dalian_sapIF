class PmsMasterItem < ActiveRecord::Base

  set_table_name :inf_pms_master_item
  
  trace_removable
  universal_unique_id
  belongs_to :domain
  attr_accessible :routing,:st_no,:st_seq_no,:item_no,:item_name,:item_order,:len,:point_under_len,:x_usl,:x_lsl,:r_usl,:r_lsl,:monitor_flg,:sqc_flg,:tsfr_flg,:unit,:actdttm,:prog_id,:download_yn

  def x_usl_f
    self.x_usl.to_f
  end
  
  def x_lsl_f
    self.x_lsl.to_f
  end
  
  def r_usl_f
    self.r_usl.to_f
  end
  
  def r_lsl_f
    self.r_lsl.to_f
  end
  
  def updated_at
    return nil unless(self.actdttm)
    t = Time.strptime(self.actdttm, '%Y%m%d%H%M%S')
    return t
  end
  
  #
  # from_date ~ to_date spc values
  #
  def get_values(item_no, p_code, from_date, to_date)
    cond = ["item_no = ? and prd_date between ? and ?", item_no, from_date, to_date]
    if(p_code)
      cond[0] << " and trim(p_code) = ?"
      cond.push(p_code)
    end
    PmsSpc.select("to_char(to_date(prd_date, 'YYYYMMDD'), 'MM-DD') prd_date, seq, val1, val2, val3, val4, val5, x_val, r_val").where(cond).order("prd_date asc, seq asc")
  end
    
end