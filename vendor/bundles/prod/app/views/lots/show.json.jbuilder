json.(@lot, :id,:domain_id,:name,:description,:lot_no,:serial_no,:status,:prod_order_id,:shift,:product_id,:operation_id,:machine_id,:actual_qty,:tran_time)

json.product do
	json.id @lot.product_id
	json.name @lot.product ? @lot.product.name : ''
end

json.operation do
	json.id @lot.operation_id
	json.name @lot.operation ? @lot.operation.name : ''
end

json.machine do
	json.id @lot.machine_id
	json.name @lot.machine ? @lot.machine.name : ''
end