require 'rubygems'
require 'torquebox-messaging'

class PmCheckTask < TorqueBox::Messaging::Task
  
  def check_pm(payload)
    today = Date.today
    pms = MachineChkPlan.where("to_char(due_date, 'YYYY-MM-DD') = ? and status != 'T'", today.strftime(GlobalConfig.default_date_format))
    overdue_pms = MachineChkPlan.where("due_date < ? and status != 'T'", today).order("due_date desc")
    PmMailer.alarm(pms, overdue_pms).deliver
  end
  
end