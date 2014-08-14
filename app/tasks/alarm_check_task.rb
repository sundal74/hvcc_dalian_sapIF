require 'rubygems'
require 'torquebox-messaging'

class AlarmCheckTask < TorqueBox::Messaging::Task
  
  def check_alarm(payload)
    query_time = Time.now - (60 * 15)
    query_time_str = query_time.strftime('%Y%m%d%H%M%S')
    query_time_str << "000"
    
    sql = "select * from (
      select * from (select * from inf_pms_alarm where actdttm >= '#{query_time_str}' and alarm_type = '1' order by actdttm desc) a where rownum < 5
        union all
      select * from (select * from inf_pms_alarm where actdttm >= '#{query_time_str}' and alarm_type = '2' order by actdttm desc) b where rownum < 5
        union all
      select * from (select * from inf_pms_alarm where actdttm >= '#{query_time_str}' and alarm_type = '3' order by actdttm desc) c where rownum < 5
        union all
      select * from (select * from inf_pms_alarm where actdttm >= '#{query_time_str}' and alarm_type = '4' order by actdttm desc) d where rownum < 5
    )"
    
    pms_alarms = PmsAlarm.connection.select_all(sql)
    QualityAlarmMailer.alarm(pms_alarms).deliver if(pms_alarms.size > 0)
  end
  
end