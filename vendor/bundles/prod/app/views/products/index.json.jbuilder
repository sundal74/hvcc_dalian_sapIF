json.items do |json|
	json.array!(@collection) do |json, product|
		json.(product, :id,:domain_id,:name,:description,:prod_type,:pack_type,:unit,:default_qty,:short_name,:model_no,:cust_code,:cust_part_no,:cust_part_name,:created_at,:updated_at)
		json.creator do
			json.id product.creator_id
			json.name product.creator ? product.creator.name : ''
		end
		json.updater do
			json.id product.updater_id
			json.name product.updater ? product.updater.name : ''
		end
	end
end
json.total @total_count
json.success true
