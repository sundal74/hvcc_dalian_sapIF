json.items do |json|
	json.array!(@collection) do |json, worker_time|
		json.(worker_time, :id,:domain_id,:work_date,:shift,:operation_id,:machine_id,:product_id,:prod_order_id,:user_id,:start_time,:end_time,:work_term,:loss_term)
		
		json.user do
			json.id worker_time.user_id
			json.name worker_time.user ? worker_time.user.name : ''
		end

		json.operation do
			json.id worker_time.operation_id
			json.name worker_time.operation ? worker_time.operation.name : ''
			json.desc worker_time.operation ? worker_time.operation.description : ''
		end

		json.machine do
			json.id worker_time.machine_id
			json.name worker_time.machine ? worker_time.machine.name : ''
			json.desc worker_time.machine ? worker_time.machine.description : ''
		end

		json.product do
			json.id worker_time.product_id
			json.name worker_time.product ? worker_time.product.name : ''
			json.desc worker_time.product ? worker_time.product.description : ''
		end
	end
end
json.total @total_count
json.success true
