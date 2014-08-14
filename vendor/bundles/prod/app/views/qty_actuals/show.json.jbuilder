json.(@qty_actual, :id,:domain_id,:work_date,:shift,:operation_id,:machine_id,:product_id,:customer_id, :prod_order_id,:actual_qty,:defect_qty,:rework_qty,:description,:created_at,:updated_at)
json.operation do
	json.id @qty_actual.operation_id
	json.name @qty_actual.operation ? @qty_actual.operation.name : ''
end
json.machine do
	json.id @qty_actual.machine_id
	json.name @qty_actual.machine ? @qty_actual.machine.name : ''
end
json.product do
	json.id @qty_actual.product_id
	json.name @qty_actual.product ? @qty_actual.product.name : ''
end
json.customer do
	json.id @qty_actual.customer_id
	json.name @qty_actual.customer ? qty_actual.customer.name : ''
end