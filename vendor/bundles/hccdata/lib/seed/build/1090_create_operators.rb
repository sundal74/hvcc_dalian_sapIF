puts "Loading [1090_create_operations] file..."

OperationsUsers.delete_all
separator = ','
domain = Domain.system_domain
admin = User.find("admin")
User.current_user = admin

headers = []
data_count = 0

File.open(File.dirname(__FILE__) + '/OPERATORS.csv', 'r').each_with_index do |line, index|
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
    
    op_user = OperationsUsers.new(data)
    op_user.save
    data_count += 1
  end
end

puts "Total #{data_count} Operators Loaded!"