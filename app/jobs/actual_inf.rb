class ActualInf
  
  def initialize(options = {})
    @options = options
  end
  
  def run
    ActualInfTask.async(:check_actual)
  end
  
  def on_error(exception)
    Rails.logger.error(exception)
  end
  
end