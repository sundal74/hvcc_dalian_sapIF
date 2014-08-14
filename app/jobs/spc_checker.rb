class SpcChecker
  
  def initialize(options = {})
    @options = options
  end
  
  def run
    debug_print "SPC Check Task"
    SpcCheckTask.async(:check_spc, :name => 'Name', :alarm_type => '1')
  end
  
  def on_error(exception)
    Rails.logger.error(exception)
  end
  
end