class PmsTsfr < ActiveRecord::Base

  set_table_name :inf_pms_tsfr

  attr_accessible :prd_date,:shift,:routing,:st_no,:p_code,:total,:first,:reject,:actdttm,:prog_id,:upload_yn
  
end