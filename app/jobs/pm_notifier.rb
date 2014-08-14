class PmNotifier
  
  def initialize(options = {})
    @options = options
  end
  
  def run
    PmCheckTask.async(:check_pm)
  end
  
  def on_error(exception)
    Rails.logger.error(exception)
  end
  
end