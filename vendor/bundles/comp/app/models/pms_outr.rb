class PmsOutr < ActiveRecord::Base

  set_table_name :inf_pms_outr

  attr_accessible :prd_date,:shift,:routing,:st_no,:int_no,:p_code,:actual,:actdttm,:prog_id,:upload_yn  
  
end