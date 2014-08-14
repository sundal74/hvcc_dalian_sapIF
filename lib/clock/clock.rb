require File.expand_path('../../../config/boot',        __FILE__)
require File.expand_path('../../../config/environment', __FILE__)
require 'clockwork'

include Clockwork

every(5.seconds, 'Queueing interval job') do
   Delayed::Job.enqueue RepeatableJob.new
   puts "Repeatable Job enqueued!"
end