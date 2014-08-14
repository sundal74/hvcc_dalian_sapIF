json.(@worker_time, :id,:domain_id,:work_date,:shift,:operation_id,:machine_id,:product_id,:prod_order_id,:user_id,:start_time,:end_time,:work_term,:loss_term)

json.user do
	json.id @worker_time.user_id
	json.name @worker_time.user ? @worker_time.user.name : ''
end

json.operation do
	json.id @worker_time.operation_id
	json.name @worker_time.operation ? @worker_time.operation.name : ''
end

json.machine do
	json.id @worker_time.machine_id
	json.name @worker_time.machine ? @worker_time.machine.name : ''
end

json.product do
	json.id @worker_time.product_id
	json.name @worker_time.product ? @worker_time.product.name : ''
end
