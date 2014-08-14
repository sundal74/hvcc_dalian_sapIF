json.items do |json|
	json.array!(@collection) do |json, machine|
		json.(machine, :id,:domain_id,:name,:description,:operation_id,:cycletime,:uph,:main_op_flag,:main_mc_flag,:plan_dist_rate,:check_flag,:check_cycle,:creator_id,:updater_id,:created_at,:updated_at)
		json.operation do
			json.id machine.operation_id
			json.name machine.operation ? machine.operation.name : ''
			json.desc machine.operation ? machine.operation.description : ''
		end
		json.creator do
			json.id machine.creator_id
			json.name machine.creator ? machine.creator.name : ''
		end
		json.updater do
			json.id machine.updater_id
			json.name machine.updater ? machine.updater.name : ''
		end
	end
end
json.total @total_count
json.success true
