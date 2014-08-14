json.items do |json|
	json.array!(@collection) do |json, operation|
		json.(operation, :id,:domain_id,:name,:description,:workcenter_id,:dept_type,:op_type,:op_seq,:inv_flag,:rm_input_flag,:track_rm_store_id,:main_op_flag,:updated_at,:created_at)
		json.workcenter do
			json.id operation.workcenter_id
			json.name operation.workcenter ? operation.workcenter.name : ''
		end
		json.track_rm_store do
			json.id operation.track_rm_store_id
			json.name operation.track_rm_store ? operation.track_rm_store.name : ''
		end
		json.creator do
			json.id operation.creator_id
			json.name operation.creator ? operation.creator.name : ''
		end
		json.updater do
			json.id operation.updater_id
			json.name operation.updater ? operation.updater.name : ''
		end
	end
end
json.total @total_count
json.success true
