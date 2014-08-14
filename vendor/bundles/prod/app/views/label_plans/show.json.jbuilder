json.(@label_plan, :id,:domain_id,:order_date,:shift,:operation_id,:product_id,:customer_id,:order_qty,:lot_qty,:print_qty,:printed_qty,:completed_flag,:reprinted_flag,:creator_id,:updater_id,:created_at,:updated_at)

json.operation do
	json.id @label_plan.operation_id
	json.name @label_plan.operation ? @label_plan.operation.name : ''
end

json.product do
	json.id @label_plan.product_id
	json.name @label_plan.product ? @label_plan.product.name : ''
end

json.customer do
	json.id @label_plan.customer_id
	json.name @label_plan.customer ? @label_plan.customer.name : ''
end
