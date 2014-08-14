json.items do |json|
	json.array!(@boms) do |json, bom|
		json.(bom, :id, :domain_id, :parent_product_id, :qty, :bom_type, :unit)
		json.child_product_id bom.child_product_id
		json.name bom.child_product ? bom.child_product.name : ''
		json.child_product do
			json.id bom.child_product_id
			json.name bom.child_product ? bom.child_product.name : '' 
		end
		json.child_product_name bom.child_product ? bom.child_product.name : '' 
		json.child_product_desc bom.child_product ? bom.child_product.description : '' 
	end
end
json.total @total_count
json.success true