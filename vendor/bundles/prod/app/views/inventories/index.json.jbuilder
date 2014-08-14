json.items do |json|
	json.array!(@collection) do |json, inventory|
		json.(inventory, :id,:domain_id,:store_id,:product_id,:qty) # :machine_id, :machine_name, :machine_desc)
		
		# json.store do
		# 	json.id inventory.store_id
		# 	json.name inventory.store_name
		# 	json.desc inventory.store_desc
		# end
		# 
		# json.product do
		# 	json.id inventory.product_id
		# 	json.name inventory.product_name
		# 	json.desc inventory.product_desc
		# end
		# 
		# json.machine do
		# 	json.id inventory.machine_id
		# 	json.name inventory.machine_name
		# 	json.desc inventory.machine_desc
		# end
		
		json.store do
			json.id inventory.store_id
			json.name inventory.store ? inventory.store.name : ''
			json.desc inventory.store ? inventory.store.description : ''
		end
		
		json.product do
			json.id inventory.product_id
			json.name inventory.product ? inventory.product.name : ''
			json.desc inventory.product ? inventory.product.description : ''
		end
	end
end
json.total @total_count
json.success true
