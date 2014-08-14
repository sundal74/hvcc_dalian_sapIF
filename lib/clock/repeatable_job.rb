class RepeatableJob
  def perform
    begin
      jobsTodo = Job.where(["at <= ? and status = ? and retry_count < 3", Time.now, "u"])
      jobsTodo.all.each do |job|
          Delayed::Job.enqueue AlarmJob.new(nil, job.name, job.id)
      end if jobsTodo
    rescue Exception => e
      puts "Error occurred when repeatable_job - #{e.to_s}"
    end
  end
end