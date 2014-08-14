class PmsAlarm < ActiveRecord::Base

  set_table_name :inf_pms_alarm
  
  universal_unique_id
  attr_accessible :alarm_type, :prd_date, :shift, :routing, :st_no, :p_code, :total, :first, :reject, :err_code, :err_cnt, :int_no, :srl_no, :comments, :actdttm, :prog_id, :upload_yn

  def updated_at
    return nil unless(self.actdttm)
    t = Time.strptime(self.actdttm, '%Y%m%d%H%M%S')
    return t
  end
    
end