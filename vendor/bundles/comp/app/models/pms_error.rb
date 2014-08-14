class PmsError < ActiveRecord::Base

  set_table_name :inf_pms_error

  attr_accessible :prd_date,:shift,:routing,:st_no,:err_code,:err_cnt,:actdttm,:prog_id,:upload_yn  
  
end