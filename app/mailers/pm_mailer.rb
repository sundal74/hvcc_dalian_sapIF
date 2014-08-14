class PmMailer < ActionMailer::Base
  default from: "MES-ADMIN@hvccglobal.com"
  
  def alarm(pm_list, overdue_pm_list)
    return if((!pm_list || pm_list.empty?) && (!overdue_pm_list || overdue_pm_list.empty?))
    
    @pm_list, @overdue_pm_list = pm_list, overdue_pm_list
    @mail_title = "#{Date.today.strftime(GlobalConfig.default_date_format)} Preventive Maintenance Alarm"
    emails = get_mailing_list
    mail(:to => emails, :subject => @mail_title) do |format|
      format.html
    end
  end
    
  def get_mailing_list
    code = CommonCode.find_by_name("PM_MAILING")
    return nil if(!code)
    emails = code.description.split(';')
    emails
  end
end