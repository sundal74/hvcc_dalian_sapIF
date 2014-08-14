json.(@loss_template, :id,:domain_id,:week_day,:start_time,:end_time,:loss_term,:loss_code_id,:control_flag,:creator_id,:updater_id,:created_at,:updated_at)

json.loss_code do
	json.id @loss_template.loss_code_id
	json.name @loss_template.loss_code ? @loss_template.loss_code.name : ''
end
		
