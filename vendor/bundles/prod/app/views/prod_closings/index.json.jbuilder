json.items do |json|
	json.array!(@collection) do |json, prod_closing|
		json.work_date prod_closing['work_date']
		json.workcenter prod_closing['workcenter']
		json.operation_id prod_closing['operation_id']
		json.operation prod_closing['operation']
		json.operation_desc prod_closing['operation_desc']
		json.closer_id prod_closing['closer_id']
		json.closer_name prod_closing['closer_name']
		json.closed_flag prod_closing['closed_flag']
		json.closed_at prod_closing['closed_at']
		json.closable prod_closing['closable']
	end
end
json.total @total_count
json.success true
