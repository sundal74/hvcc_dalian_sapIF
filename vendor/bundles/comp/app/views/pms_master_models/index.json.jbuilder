json.items do |json|
	json.array!(@collection) do |json, pms_master_model|
		json.(pms_master_model, :id,:domain_id,:routing,:p_code,:model_no,:model_name)
			json.updated_at pms_master_model.updated_at
		end
end
json.total @total_count
json.success true
