debug_print "Loading [Comp] bundle data..."

Dir[File.join(File.dirname(__FILE__), 'build', '*.rb')].sort.each do |build_file|
  load build_file
end

puts "Completed to load [Comp] bundle data!"
