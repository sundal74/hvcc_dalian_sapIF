json.items do |json|
	json.array!(@collection) do |json, pms_spc_alarm|
		json.(pms_spc_alarm, :id,:domain_id,:prd_date,:seq,:routing,:st_no,:p_code,:item_no,:alarm_type,:val1,:val2,:val3,:val4,:val5,:actdttm)
		end
end
json.total @total_count
json.success true
