json.items do |json|
	json.array!(@collection) do |json, spc_item|
		json.(spc_item, :id,:domain_id,:name,:description,:operation_id,:x_usl,:x_lsl,:r_usl,:r_lsl,:creator_id,:updater_id,:created_at,:updated_at)
		
		json.operation_name spc_item.operation.name
		
		json.operation do
			json.id spc_item.operation_id
			json.name spc_item.operation ? spc_item.operation.name : ''
			json.desc spc_item.operation ? spc_item.operation.description : ''
		end
		json.creator do
			json.id spc_item.creator_id
			json.name spc_item.creator ? spc_item.creator.name : ''
		end
		
		json.updater do
			json.id spc_item.updater_id
			json.name spc_item.updater ? spc_item.updater.name : ''
		end
	end
end
json.total @total_count
json.success true
