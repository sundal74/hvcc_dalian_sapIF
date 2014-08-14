json.items do |json|
	json.array!(@collection) do |json, defect|
		json.(defect, :id,:domain_id,:work_date,:shift,:operation_id,:machine_id,:product_id,:child_product_id,:prod_order_id,:defect_code_id,:defect_qty,:description,:created_at)
		json.operation do
			json.id defect.operation_id
			json.name defect.operation ? defect.operation.name : ''
			json.desc defect.operation ? defect.operation.description : ''
		end

		json.machine do
			json.id defect.machine_id
			json.name defect.machine ? defect.machine.name : ''
			json.desc defect.machine ? defect.machine.description : ''
		end

		json.product do
			json.id defect.product_id
			json.name defect.product ? defect.product.name : ''
			json.desc defect.product ? defect.product.description : ''
		end

		json.child_product do
			json.id defect.child_product_id
			json.name defect.child_product ? defect.child_product.name : ''
		end
		
		json.defect_code do
			json.id defect.defect_code_id
			json.name defect.defect_code ? defect.defect_code.name : ''
			json.desc defect.defect_code ? defect.defect_code.description : ''
		end
	end
end
json.total @total_count
json.success true
