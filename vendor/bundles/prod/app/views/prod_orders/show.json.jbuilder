json.(@prod_order, :id,:domain_id,:order_date,:workcenter_id,:shift,:operation_id,:machine_id,:product_id,:customer_id,:status,:order_seq,:main_op_flag,:uph,:cycletime,:order_qty,:pallet_qty,:actual_qty,:defect_qty,:rework_qty,:actual_start_time,:actual_end_time,:worker_count,:updated_at)
		
json.operation do
	json.id @prod_order.operation_id
	json.name @prod_order.operation ? @prod_order.operation.name : ''
end

json.machine do
	json.id @prod_order.machine_id
	json.name @prod_order.machine ? @prod_order.machine.name : ''
end

json.product do
	json.id @prod_order.product_id
	json.name @prod_order.product ? @prod_order.product.name : ''
end

json.customer do
	json.id @prod_order.customer_id
	json.name @prod_order.customer ? @prod_order.customer.name : ''
end