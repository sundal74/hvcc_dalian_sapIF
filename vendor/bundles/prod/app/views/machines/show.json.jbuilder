json.(@machine, :id,:domain_id,:name,:description,:operation_id,:cycletime,:uph,:main_op_flag,:main_mc_flag,:plan_dist_rate,:check_flag,:check_cycle,:creator_id,:updater_id,:created_at,:updated_at)
json.operation do
	json.id @machine.operation_id
	json.name @machine.operation ? @machine.operation.name : ''
end
