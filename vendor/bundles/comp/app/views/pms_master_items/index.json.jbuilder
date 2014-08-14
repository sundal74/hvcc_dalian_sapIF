json.items do |json|
	json.array!(@collection) do |json, pms_master_item|
		json.(pms_master_item, :id,:domain_id,:routing,:st_no,:st_seq_no,:item_no,:item_name,:item_order,:x_usl,:x_lsl,:r_usl,:r_lsl,:len,:point_under_len,:monitor_flg,:sqc_flg,:tsfr_flg,:unit)
			json.updated_at pms_master_item.updated_at
		end
end
json.total @total_count
json.success true
