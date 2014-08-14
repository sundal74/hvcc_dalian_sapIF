json.items do |json|
	json.array!(@collection) do |json, machine_chk_plan|
		json.(machine_chk_plan, :id,:domain_id,:name,:description,:machine_id,:status,:plan_date,:due_date,:check_date,:start_time,:end_time,:work_term,:chk_comment,:pm_part,:pm_type,:reporter,:inspector_id,:checker_count,:total_work_term,:upload_flag,:creator_id,:updater_id,:created_at,:updated_at, :cid, :title, :ad, :start, :end)
		
		json.machine do
			json.id machine_chk_plan.machine_id
			json.name machine_chk_plan.machine ? machine_chk_plan.machine.name : ''
			json.desc machine_chk_plan.machine ? machine_chk_plan.machine.description : ''
		end

		json.inspector do
			json.id machine_chk_plan.inspector_id
			json.name machine_chk_plan.inspector ? machine_chk_plan.inspector.name : ''
		end
	end
end
json.total @total_count
json.success true
