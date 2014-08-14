json.(@prod_param, :id,:domain_id,:operation_id,:machine_id,:product_id,:location,:target_uph,:cycletime,:creator_id,:updater_id,:created_at,:updated_at)
json.operation do
	json.id @prod_param.operation_id
	json.name @prod_param.operation ? @prod_param.operation.name : ''
end
json.machine do
	json.id @prod_param.machine_id
	json.name @prod_param.machine ? @prod_param.machine.name : ''
end
json.product do
	json.id @prod_param.product_id
	json.name @prod_param.product ? @prod_param.product.name : ''
end
