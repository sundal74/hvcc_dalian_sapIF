json.(@inventory, :id,:domain_id,:store_id,:product_id,:qty)

json.store do
	json.id @inventory.store_id
	json.name @inventory.store ? @inventory.store.name : ''
end

json.product do
	json.id @inventory.product_id
	json.name @inventory.product ? @inventory.product.name : ''
end
