class QualityAlarmMailer < ActionMailer::Base
  default from: "MES-ADMIN@hvccglobal.com"
  
  def alarm(pms_alarms)
    return if(!pms_alarms || pms_alarms.size == 0)
    
    @tsfr_alarms = pms_alarms.find_all { |pms_alarm| pms_alarm['alarm_type'] == '1' }
    @error_alarms = pms_alarms.find_all { |pms_alarm| pms_alarm['alarm_type'] == '2' }
    @measure_miss_alarms = pms_alarms.find_all { |pms_alarm| pms_alarm['alarm_type'] == '3' }
    @ng_product_alarms = pms_alarms.find_all { |pms_alarm| pms_alarm['alarm_type'] == '4' }
    
    emails = get_mailing_list
    mail(:to => emails, :subject => "MES Alarm") do |format|
      format.html
    end
  end
  
  # def alarm
  #   query_time = Time.now - (60 * 600)
  #   query_time_str = query_time.strftime('%Y%m%d%H%M%S')
  #   query_time_str << "000"
  #   sql = "select * from (
  #     select * from (select * from inf_pms_alarm where actdttm >= '#{query_time_str}' and alarm_type = '1' order by actdttm desc) a where rownum < 5
  #       union all
  #     select * from (select * from inf_pms_alarm where actdttm >= '#{query_time_str}' and alarm_type = '2' order by actdttm desc) b where rownum < 5
  #       union all
  #     select * from (select * from inf_pms_alarm where actdttm >= '#{query_time_str}' and alarm_type = '3' order by actdttm desc) c where rownum < 5
  #       union all
  #     select * from (select * from inf_pms_alarm where actdttm >= '#{query_time_str}' and alarm_type = '4' order by actdttm desc) d where rownum < 5
  #   )"
  #   
  #   pms_alarms = PmsAlarm.connection.select_all(sql)
  #   return if(!pms_alarms || pms_alarms.size == 0)
  #   
  #   @tsfr_alarms = pms_alarms.find_all { |pms_alarm| pms_alarm['alarm_type'] == '1' }
  #   @error_alarms = pms_alarms.find_all { |pms_alarm| pms_alarm['alarm_type'] == '2' }
  #   @measure_miss_alarms = pms_alarms.find_all { |pms_alarm| pms_alarm['alarm_type'] == '3' }
  #   @ng_product_alarms = pms_alarms.find_all { |pms_alarm| pms_alarm['alarm_type'] == '4' }
  #   
  #   emails = get_mailing_list
  #   mail(:to => emails, :subject => "MES Alarm") do |format|
  #     format.html
  #   end
  # end
  
  def get_mailing_list
    results = User.select("email").where("alarm_flag = ?", true)
    emails = results.collect { |result| result['email'] }
    emails
  end
end