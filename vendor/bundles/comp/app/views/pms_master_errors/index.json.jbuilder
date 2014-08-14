json.items do |json|
	json.array!(@collection) do |json, pms_master_error|
		json.(pms_master_error, :id,:domain_id,:routing,:st_no,:err_code,:err_name,:err_type)
			json.updated_at pms_master_error.updated_at
		end
end
json.total @total_count
json.success true
