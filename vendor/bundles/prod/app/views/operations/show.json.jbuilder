json.(@operation, :id,:domain_id,:name,:description,:workcenter_id,:dept_type,:op_seq,:op_type,:inv_flag,:rm_input_flag,:track_rm_store_id,:main_op_flag,:creator_id,:updater_id,:created_at,:updated_at)
json.workcenter do
	json.id @operation.workcenter_id
	json.name @operation.workcenter ? @operation.workcenter.name : ''
end

json.track_rm_store do
	json.id @operation.track_rm_store_id
	json.name @operation.track_rm_store ? @operation.track_rm_store.name : ''
end