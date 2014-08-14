namespace :hccdata do
  
  desc "Load HCC initial data"
  
  task :load_data => :environment do
    puts "Start to load HCC inital data ...."
    
    load "#{Rails.root}/vendor/bundles/hccdata/lib/seed/seed.rb"
    
    puts "Completed to load HCC inital data!"
  end
  
  desc "Load HCC data from files - rake hatio:load_data_from_files[src_file_name]"
  
  task :load_data_from_files, [:src_file_name] => :environment do |t, args|
    src_file_name = args.src_file_name
    puts "Start to load #{src_file_name} file ...."
    
    load "#{Rails.root}/vendor/bundles/hccdata/lib/seed/build/#{src_file_name}"
    
    puts "Completed to load data!"
  end
  
  desc "Download from Terminologies to target file - rake hatio:download_terms[tar_file_name]"
  
  task :download_terms, [:tar_file_name] => :environment do |t, args|
    tar_file_name = args.tar_file_name
    terms = Terminology.all
    
    File.open(tar_file_name, "w:UTF-8") do |f|
      f.write "name,locale,category,display,display_short\n"
      terms.each do |term|
        disp = term.display.gsub("\n", " ")
        puts "#{term.name},#{term.locale},#{term.category},#{disp},#{term.display_short}"
        f.write "#{term.name},#{term.locale},#{term.category},#{disp},#{term.display_short}\n"
      end
    end
  end
  
  desc "Upload Terminologies from source file - rake hatio:upload_terms[src_file_name]"
  
  task :upload_terms, [:src_file_name] => :environment do |t, args|
    src_file_name = args.src_file_name
    Terminology.delete_all
    domain = Domain.system_domain
    
    File.open(src_file_name, "r:UTF-8").each_line do |line|
      str_arr = line.split(',')
      puts "#{str_arr[0]},#{str_arr[1]},#{str_arr[2]},#{str_arr[3]},#{str_arr[4]}"
      term = domain.terminologies.new
      term.name = str_arr[0]
      term.locale = str_arr[1]
      term.category = str_arr[2]
      term.display = str_arr[3]
      term.display_short = str_arr[4]
      term.save!
    end
  end
  
end
