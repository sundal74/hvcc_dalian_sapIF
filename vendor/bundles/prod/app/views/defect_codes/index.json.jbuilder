json.items do |json|
	json.array!(@collection) do |json, defect_code|
		json.(defect_code, :id,:domain_id,:name,:description,:creator_id,:updater_id,:created_at,:updated_at)
		json.creator do
			json.id defect_code.creator_id
			json.name defect_code.creator ? defect_code.creator.name : ''
		end
		json.updater do
			json.id defect_code.updater_id
			json.name defect_code.updater ? defect_code.updater.name : ''
		end if defect_code.updater
	end
end
json.total @total_count
json.success true
