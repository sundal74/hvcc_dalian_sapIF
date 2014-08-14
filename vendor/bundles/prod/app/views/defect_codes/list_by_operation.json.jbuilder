json.items do |json|
	json.array!(@collection) do |json, op_defect|
		json.id op_defect.defect_code_id
		json.name op_defect.defect_code ? op_defect.defect_code.name : ''
		json.description op_defect.defect_code ? op_defect.defect_code.description : ''
	end
end
json.total @total_count
json.success true
