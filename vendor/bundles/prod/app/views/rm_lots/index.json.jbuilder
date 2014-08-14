json.items do |json|
	json.array!(@collection) do |json, rm_lot|
		json.(rm_lot, :id,:domain_id,:operation_id,:raw_lot_no,:serial_no,:supplier_code,:part_no,:invoice_no,:print_date,:qty,:inv_qty,:inv_in_time)
		json.operation do
			json.id rm_lot.operation_id
			json.name rm_lot.operation ? rm_lot.operation.name : ''
		end
	end
end
json.total @total_count
json.success true
