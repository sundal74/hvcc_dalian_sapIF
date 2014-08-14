puts "Loading [0010_create_users] file..."

domain = Domain.system_domain
admin = User.find("admin")
User.current_user = admin
separator = ','

headers = []
data_count = 0

File.open(File.dirname(__FILE__) + '/USERS.csv', 'r').each_with_index do |line, index|
  if index == 0
    # 첫 번째 라인은 헤더 정보 
    headers = line.strip.split(separator).collect{|header| header.strip.downcase}
  else
    # 두 번째 이상 부터는 데이터 
    next if line.strip.empty?
    next if line.strip.starts_with? '#'
    seq = -1
    data = {}
    values = line.split(separator).collect do |v| 
      seq += 1
      if (headers[seq] && headers[seq].ends_with?('_flag'))
        flag = (v && v == 'Y') ? true : false;
        data[headers[seq]] = flag
      else
        data[headers[seq]] = v.strip
      end
    end
    
    user = User.find_by_login(data['id'].downcase)
    
    unless(user)
      User.create!({:login => data['id'], :name => data['name'], :email => data['email'] || "#{data['id']}@sample.com", :dept => data['dept'], :password => data['id'], :password_confirmation => data['id'], :admin_flag => data['admin_flag'], :timezone => 'Bangkok', :lang => 'en-US', :default_domain_id => domain.id, :operator_flag => data['operator_flag'], :active_flag => true}, :without_protection => true)
    end
  end
end

puts "Total #{data_count} Users Loaded!"