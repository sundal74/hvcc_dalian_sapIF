json.(@spc_item, :id,:domain_id,:name,:description,:operation_id,:x_usl,:x_lsl,:r_usl,:r_lsl,:creator_id,:updater_id,:created_at,:updated_at)
json.operation do
	json.id @spc_item.operation_id
	json.name @spc_item.operation ? @spc_item.operation.name : ''
end
