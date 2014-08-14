json.items do |json|
	json.array!(@collection) do |json, pms_master_station|
		json.(pms_master_station, :id,:domain_id,:routing,:equipment,:st_no,:name,:tsfr_alarm_limit,:monitor_flg)
		json.updated_at pms_master_station.updated_at
	end
end
json.total @total_count
json.success true
