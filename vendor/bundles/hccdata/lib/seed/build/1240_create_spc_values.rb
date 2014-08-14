puts "Loading [1240_create_spc_values] file..."

SpcValue.delete_all
domain = Domain.system_domain
admin = User.find("admin")

User.current_user = admin

spc_items = domain.spc_items
data_count = 0
start_date = Date.today - 30
end_date = Date.today

spc_items.each do |spc_item|
  start_date.upto(end_date) do |date|
    1.upto(3) do |seq|
      spc_value = SpcValue.new
      spc_value.spc_item_id = spc_item.id
      spc_value.work_date = date
      spc_value.seq = seq.to_s
      spc_value.val1 = (60.0 - rand(0.11)).round(3)
      spc_value.val2 = (60.0 - rand(0.11)).round(3)
      spc_value.val3 = (60.0 - rand(0.11)).round(3)
      spc_value.val4 = (60.0 - rand(0.11)).round(3)
      spc_value.val5 = (60.0 - rand(0.11)).round(3)
      spc_value.save!
      data_count += 1
    end
  end
end

puts "Total #{data_count} SpcValues Loaded!"