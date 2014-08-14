class PmsHistTrace < ActiveRecord::Base

  set_table_name :inf_pms_hist_trace

  attr_accessible :prd_date,:routing,:st_no,:p_code,:int_no,:ser_no,:seq,:prog_id,:actdttm,:upload_yn  
  
end