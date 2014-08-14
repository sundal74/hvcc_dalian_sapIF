json.items do |json|
	json.array!(@collection) do |json, loss_code|
		json.(loss_code, :id,:domain_id,:name,:description,:control_flag,:creator_id,:updater_id,:created_at,:updated_at)
		json.creator do
			json.id loss_code.creator_id
			json.name loss_code.creator ? loss_code.creator.name : ''
		end
		json.updater do
			json.id loss_code.updater_id
			json.name loss_code.updater ? loss_code.updater.name : ''
		end
	end
end
json.total @total_count
json.success true
