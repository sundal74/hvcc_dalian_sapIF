json.(@label_master, :id,:domain_id,:dept_type,:operation_id,:product_id,:label_model_id,:customer_id,:part_no,:part_name,:car_type,:car_name,:pallet_qty,:cut_qty,:ship_loc,:area,:customer_plant,:handle_type,:box_no,:creator_id,:updater_id,:created_at,:updated_at)

json.operation do
	json.id @label_master.operation_id
	json.name @label_master.operation ? @label_master.operation.name : ''
end

json.product do
	json.id @label_master.product_id
	json.name @label_master.product ? @label_master.product.name : ''
end

json.label_model do
	json.id @label_master.label_model_id
	json.name @label_master.label_model ? @label_master.label_model.name : ''
end

json.customer do
	json.id @label_master.customer_id
	json.name @label_master.customer ? @label_master.customer.name : ''
end