puts "Loading [1230_create_spc_items] file..."

SpcItem.delete_all
domain = Domain.system_domain
admin = User.find("admin")

User.current_user = admin

spc_item_names = ['CYLINDER_HEIGHT']
operation = domain.operations.first

spc_item_names.each do |spc_item_name|
  spc_item = domain.spc_items.new
  spc_item.name = spc_item_name
  spc_item.operation_id = operation.id
  spc_item.x_usl = 59.689
  spc_item.x_lsl = 59.525
  spc_item.r_usl = 0.7
  spc_item.r_lsl = 0.45
  spc_item.save!
end

puts "SpcItems Loaded!"