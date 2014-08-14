json.(@prod_plan, :id,:domain_id,:plan_date,:shift,:workcenter_id,:operation_id,:product_id,:shift1_seq,:shift2_seq,:shift3_seq,:shift1_plan_qty,:shift2_plan_qty,:shift3_plan_qty,:creator_id,:updater_id,:created_at,:updated_at)

json.workcenter do
	json.id prod_plan.workcenter_id
	json.name prod_plan.workcenter ? prod_plan.workcenter.name : ''
end

json.operation do
	json.id prod_plan.operation_id
	json.name prod_plan.operation ? prod_plan.operation.name : ''
end

json.product do
	json.id prod_plan.product_id
	json.name prod_plan.product ? prod_plan.product.name : ''
end

