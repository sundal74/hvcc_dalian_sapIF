json.items do |json|
	json.array!(@collection) do |json, prod_param|
		json.(prod_param, :id,:domain_id,:operation_id,:machine_id,:product_id,:location,:target_uph,:cycletime,:creator_id,:updater_id,:created_at,:updated_at)
		json.operation do
			json.id prod_param.operation_id
			json.name prod_param.operation ? prod_param.operation.name : ''
			json.desc prod_param.operation ? prod_param.operation.description : ''
		end

		json.machine do
			json.id prod_param.machine_id
			json.name prod_param.machine ? prod_param.machine.name : ''
			json.desc prod_param.machine ? prod_param.machine.description : ''
		end

		json.product do
			json.id prod_param.product_id
			json.name prod_param.product ? prod_param.product.name : ''
			json.desc prod_param.product ? prod_param.product.description : ''
		end

		json.creator do
			json.id prod_param.creator_id
			json.name prod_param.creator ? prod_param.creator.name : ''
		end
		json.updater do
			json.id prod_param.updater_id
			json.name prod_param.updater ? prod_param.updater.name : ''
		end
	end
end
json.total @total_count
json.success true
