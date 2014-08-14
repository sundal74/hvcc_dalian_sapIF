json.items do |json|
	json.array!(@collection) do |json, lot|
		json.(lot, :id,:domain_id,:name,:description,:lot_no,:serial_no,:status,:prod_order_id,:shift,:operation_id,:machine_id,:product_id,:actual_qty,:tran_time)

		json.product do
			json.id lot.product_id
			json.name lot.product ? lot.product.name : ''
			json.desc lot.product ? lot.product.description : ''
		end
		
		json.product_desc lot.product ? lot.product.description : ''

		json.operation do
			json.id lot.operation_id
			json.name lot.operation ? lot.operation.name : ''
			json.desc lot.operation ? lot.operation.description : ''
		end

		json.machine do
			json.id lot.machine_id
			json.name lot.machine ? lot.machine.name : ''
			json.desc lot.machine ? lot.machine.description : ''
		end		
	end
end
json.total @total_count
json.success true
