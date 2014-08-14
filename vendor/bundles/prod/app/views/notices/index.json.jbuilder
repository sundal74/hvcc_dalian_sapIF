json.items do |json|
	json.array!(@collection) do |json, notice|
		json.(notice, :id,:domain_id,:work_date,:operation_id,:msg,:creator_id,:updater_id,:created_at,:updated_at)
		
		json.operation do
			json.id notice.operation_id
			json.name notice.operation ? notice.operation.name : ''
			json.desc notice.operation ? notice.operation.description : ''
		end

		json.creator do
			json.id notice.creator_id
			json.name notice.creator ? notice.creator.name : ''
		end
		
		json.updater do
			json.id notice.updater_id
			json.name notice.updater ? notice.updater.name : ''
		end
	end
end
json.total @total_count
json.success true
