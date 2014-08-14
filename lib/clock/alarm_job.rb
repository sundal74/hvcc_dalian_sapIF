class AlarmJob < Struct.new(:require_name, :action_class_name, :job_id)
  def perform
    job = Job.find(job_id)
    raise "Job Not Found - #{job_id}" unless job
    
    begin
      require "#{require_name}" if require_name
      c = action_class_name.constantize
      c.execute
      job.status = "s"
      job.save!
    rescue Exception => e
      puts "Error occurred when alarm_job - #{e.to_s}"       
      errorMsg = e.to_s
      errorMsg << "Call stack\n"
      e.backtrace.each { |line| errorMsg << "  #{line}\n" }
      job.error = errorMsg
      job.retry_count += 1
      job.save!
    end
  end
end