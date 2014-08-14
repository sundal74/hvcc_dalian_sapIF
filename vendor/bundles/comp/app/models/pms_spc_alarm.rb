class PmsSpcAlarm < ActiveRecord::Base

  set_table_name :inf_pms_spc_alarm
  
	universal_unique_id
	belongs_to :domain
	attr_accessible :prd_date,:seq,:routing,:st_no,:p_code,:item_no,:alarm_type,:val1,:val2,:val3,:val4,:val5,:actdttm

end
