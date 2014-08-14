class PmsTsfrRjt < ActiveRecord::Base

  set_table_name :inf_pms_tsfr_rjt

  attr_accessible :prd_date,:shift,:routing,:st_no,:p_code,:int_no,:actdttm,:prog_id,:upload_yn
  
end