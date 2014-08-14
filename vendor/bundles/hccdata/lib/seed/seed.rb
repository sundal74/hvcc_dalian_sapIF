debug_print "Loading [Hvcc dalian data] bundle data loading..."

Dir[File.join(File.dirname(__FILE__), 'build', '*.rb')].sort.each do |build_file|
  load build_file
end

puts "Completed to load [Hvcc dalian data] bundle data!"