json.items do |json|
	json.array!(@collection) do |json, std_work_doc|
		json.(std_work_doc, :id,:domain_id,:name,:description,:operation_id,:machine_id,:file_group_id,:creator_id,:updater_id,:created_at,:updated_at)
		json.operation do
			json.id std_work_doc.operation_id
			json.name std_work_doc.operation ? std_work_doc.operation.name : ''
			json.desc std_work_doc.operation ? std_work_doc.operation.description : ''
		end

		json.machine do
			json.id std_work_doc.machine_id
			json.name std_work_doc.machine ? std_work_doc.machine.name : ''
			json.desc std_work_doc.machine ? std_work_doc.machine.description : ''
		end

		json.creator do
			json.id std_work_doc.creator_id
			json.name std_work_doc.creator ? std_work_doc.creator.name : ''
		end
		
		json.updater do
			json.id std_work_doc.updater_id
			json.name std_work_doc.updater ? std_work_doc.updater.name : ''
		end
	end
end
json.total @total_count
json.success true
