puts "Loading [1800_create_pms_tsfr] file..."

PmsTsfr.delete_all
separator = ','
domain = Domain.system_domain

headers = []
data_count = 0

File.open(File.dirname(__FILE__) + '/PMS_TSFR.csv', 'r').each_with_index do |line, index|
  if index == 0
    # 첫 번째 라인은 헤더 정보 
    headers = line.strip.split(separator).collect{ |header| header.strip.downcase }
  else
    # 두 번째 이상 부터는 데이터 
    next if line.strip.empty?
    next if line.strip.starts_with? '#'
    seq = -1
    data = {}
    values = line.split(separator).collect do |v| 
      seq += 1
      data[headers[seq]] = v.strip
    end
    
    begin
      PmsTsfr.create!(data)
    rescue ::Exception => e
      debug_print data
    end
    
    data_count += 1
  end
end

puts "Total #{data_count} Pms Tsfr Loaded!"