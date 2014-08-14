json.items do |json|
	json.array!(@collection) do |json, loss_template|
		json.(loss_template, :id,:domain_id,:week_day,:start_time,:end_time,:loss_term,:loss_code_id,:control_flag,:creator_id,:updater_id,:created_at,:updated_at)
		json.loss_code do
			json.id loss_template.loss_code_id
			json.name loss_template.loss_code ? loss_template.loss_code.name : ''
		end
		json.creator do
			json.id loss_template.creator_id
			json.name loss_template.creator ? loss_template.creator.name : ''
		end
		json.updater do
			json.id loss_template.updater_id
			json.name loss_template.updater ? loss_template.updater.name : ''
		end if loss_template.updater
	end
end
json.total @total_count
json.success true
