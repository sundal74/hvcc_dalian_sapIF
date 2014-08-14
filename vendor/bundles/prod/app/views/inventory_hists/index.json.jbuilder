json.items do |json|
	json.array!(@collection) do |json, inventory_hist|
		json.(inventory_hist, :id,:domain_id,:inventory_id,:machine_id,:store_id,:product_id,:inv_qty,:qty,:action_code,:lot_type,:lot_id,:from_store_id,:to_store_id,:description,:updated_at)
		
		json.store do
			json.id inventory_hist.store_id
			json.name inventory_hist.store ? inventory_hist.store.name : ''
			json.desc inventory_hist.store ? inventory_hist.store.description : ''
		end

		json.product do
			json.id inventory_hist.product_id
			json.name inventory_hist.product ? inventory_hist.product.name : ''
			json.desc inventory_hist.product ? inventory_hist.product.description : ''
		end
		
		json.machine do
			json.id inventory_hist.machine_id
			json.name inventory_hist.machine ? inventory_hist.machine.name : ''
			json.desc inventory_hist.machine ? inventory_hist.machine.description : ''
		end

		# json.lot do
		# 	json.id inventory_hist.lot_id
		# 	json.name inventory_hist.lot ? inventory_hist.lot.name : ''
		# end
		# 
		# json.from_store do
		# 	json.id inventory_hist.from_store_id
		# 	json.name inventory_hist.from_store ? inventory_hist.from_store.name : ''
		# end
		# 
		# json.to_store do
		# 	json.id inventory_hist.to_store_id
		# 	json.name inventory_hist.to_store ? inventory_hist.to_store.name : ''
		# end
	end
end
json.total @total_count
json.success true
