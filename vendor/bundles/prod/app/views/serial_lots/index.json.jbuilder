json.items do |json|
	json.array!(@collection) do |json, serial_lot|
		json.(serial_lot, :id,:domain_id,:name,:operation_id,:machine_id,:product_id,:prod_order_id,:lot_id,:work_date,:shift,:serial_no,:actual_qty,:defect_qty,:scan_time,:confirm_flag,:creator_id,:updater_id,:created_at,:updated_at)
		json.operation do
			json.id serial_lot.operation_id
			json.name serial_lot.operation ? serial_lot.operation.name : ''
		end

		json.machine do
			json.id serial_lot.machine_id
			json.name serial_lot.machine ? serial_lot.machine.name : ''
		end

		json.product do
			json.id serial_lot.product_id
			json.name serial_lot.product ? serial_lot.product.name : ''
		end
	end
end
json.total @total_count
json.success true
