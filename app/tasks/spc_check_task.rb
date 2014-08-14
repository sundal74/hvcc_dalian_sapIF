require 'rubygems'
require 'torquebox-messaging'

class SpcCheckTask < TorqueBox::Messaging::Task
  
  def check_spc(payload)
    debug_print "SPC Checker"
  end
  
end