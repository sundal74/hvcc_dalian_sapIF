class PmsMasterStation < ActiveRecord::Base

  set_table_name :inf_pms_master_station
  
  trace_removable
  universal_unique_id
  belongs_to :domain
  attr_accessible :routing,:equipment,:st_no,:name,:tsfr_alarm_limit,:monitor_flg,:actdttm,:prog_id,:download_yn
  
  def updated_at
    return nil unless(self.actdttm)
    t = Time.strptime(self.actdttm, '%Y%m%d%H%M%S')
    return t
  end
  
end