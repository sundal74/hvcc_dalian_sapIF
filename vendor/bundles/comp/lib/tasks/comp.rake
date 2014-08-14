namespace :comp do
  
  desc "Load Comp initial data"
  
  task :load_data => :environment do
    puts "Start to load Comp inital data ...."
    
    load "#{Rails.root}/vendor/bundles/comp/lib/seed/seed.rb"
    
    puts "Completed to load Comp inital data!"
  end
  
  desc "Load Comp data from files - rake hatio:load_data_from_files[src_file_name]"
  
  task :load_data_from_files, [:src_file_name] => :environment do |t, args|
    src_file_name = args.src_file_name
    puts "Start to load #{src_file_name} file ...."
    
    load "#{Rails.root}/vendor/bundles/comp/lib/seed/build/#{src_file_name}"
    
    puts "Completed to load data!"
  end
  
end
