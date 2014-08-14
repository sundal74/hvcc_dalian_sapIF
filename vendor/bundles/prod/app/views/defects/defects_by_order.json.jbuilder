json.items do |json|
	json.array!(@collection) do |json, defect|
		json.(defect, :id,:domain_id,:product_id,:child_product_id,:prod_order_id,:defect_code_id,:defect_qty,:description)
		
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
