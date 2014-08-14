class AlarmNotifier
  
  def initialize(options = {})
    @options = options
  end
  
  def run
    AlarmCheckTask.async(:check_alarm)
  end
  
  def on_error(exception)
    Rails.logger.error(exception)
  end
  
end