puts "Loading [1100_create_pms_master_station] file..."

PmsMasterStation.delete_all
separator = ','
domain = Domain.system_domain

headers = []
data_count = 0

routing = Operation.where("name = '6CTKA'").first
domain.operations.create!({:name => '6CTKA', :description => 'Comp', :workcenter_id => domain.workcenters.first.id, :op_seq => 10, :op_type => 'LOT', :dept_type => 2}) unless routing

routing = Operation.where("name = '6CTKB'").first
domain.operations.create!({:name => '6CTKB', :description => 'Comp', :workcenter_id => domain.workcenters.first.id, :op_seq => 11, :op_type => 'LOT', :dept_type => 2}) unless routing

routing = Operation.where("name = '6CTKC'").first
domain.operations.create!({:name => '6CTKC', :description => 'Comp', :workcenter_id => domain.workcenters.first.id, :op_seq => 11, :op_type => 'LOT', :dept_type => 2}) unless routing

routing = Operation.where("name = '6CTKD'").first
domain.operations.create!({:name => '6CTKD', :description => 'Comp', :workcenter_id => domain.workcenters.first.id, :op_seq => 11, :op_type => 'LOT', :dept_type => 2}) unless routing

File.open(File.dirname(__FILE__) + '/PMS_MASTER_STATION.csv', 'r').each_with_index do |line, index|
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
    
    domain.pms_master_stations.create!(data)
    data_count += 1
  end
end

puts "Total #{data_count} Pms Master Station Loaded!"