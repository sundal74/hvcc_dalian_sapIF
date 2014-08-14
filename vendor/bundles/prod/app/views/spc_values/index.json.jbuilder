json.items do |json|
	json.array!(@collection) do |json, spc_value|
		json.(spc_value, :id,:spc_item_id,:work_date_str,:seq,:val1,:val2,:val3,:val4,:val5,:x_val,:r_val)
		json.spc_item do
			json.id spc_value.spc_item_id
			json.name spc_value.spc_item ? spc_value.spc_item.name : ''
		end
	end
end
json.total @total_count
json.success true
