if(RUBY_PLATFORM =~ /java/)
  require 'java'
  java_import 'java.lang.System'
end

class GcJob

  def initialize(options = {})
    @options = options
  end

  def run
    if(RUBY_PLATFORM =~ /java/)
      System.gc()
    end
  end

  def on_error(exception)
    Rails.logger.error(exception)
  end

end