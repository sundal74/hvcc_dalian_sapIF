json.items do |json|
	json.array!(@collection) do |json, label_model|
		json.(label_model, :id,:domain_id,:name,:description,:printer_type,:dept_type,:command,:active_flag,:creator_id,:updater_id,:created_at,:updated_at)
		json.creator do
			json.id label_model.creator_id
			json.name label_model.creator ? label_model.creator.name : ''
		end

		json.updater do
			json.id label_model.updater_id
			json.name label_model.updater ? label_model.updater.name : ''
		end

		end
end
json.total @total_count
json.success true
