json.items do |json|
	json.array!(@collection) do |json, op_defect|
		json.(op_defect, :operation_id, :defect_code_id)
		json.defect_code do
			json.id op_defect.defect_code_id
			json.name op_defect.defect_code ? op_defect.defect_code.name : ''
			json.desc op_defect.defect_code ? op_defect.defect_code.description : ''
		end
	end
end
