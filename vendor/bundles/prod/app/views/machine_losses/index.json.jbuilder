json.items do |json|
	json.array!(@collection) do |json, machine_loss|
		json.(machine_loss, :id,:domain_id,:work_date,:shift,:workcenter_id,:operation_id,:machine_id,:status,:reporter_id,:maintainer_id,:loss_code_id,:breakdown_code,:event_time,:maint_start_time,:maint_end_time,:loss_term,:maint_term,:reporter_comment,:maint_comment,:line_stop_flag,:maintainer_count,:creator_id,:updater_id,:created_at,:updated_at)
		
		json.elapsed_time machine_loss.elapsed_time
		
		json.workcenter do
			json.id machine_loss.workcenter_id
			json.name machine_loss.workcenter ? machine_loss.workcenter.name : ''
		end

		json.operation do
			json.id machine_loss.operation_id
			json.name machine_loss.operation ? machine_loss.operation.name : ''
			json.desc machine_loss.operation ? machine_loss.operation.description : ''
		end

		json.machine do
			json.id machine_loss.machine_id
			json.name machine_loss.machine ? machine_loss.machine.name : ''
			json.desc machine_loss.machine ? machine_loss.machine.description : ''
		end

		json.reporter do
			json.id machine_loss.reporter_id
			json.name machine_loss.reporter ? machine_loss.reporter.name : ''
		end

		json.maintainer do
			json.id machine_loss.maintainer_id
			json.name machine_loss.maintainer ? machine_loss.maintainer.name : ''
		end
	end
end
json.total @total_count
json.success true
