json.items do |json|
	json.array!(@collection) do |json, supplier|
		json.(supplier, :id,:domain_id,:name,:description,:creator_id,:updater_id,:created_at,:updated_at)

		json.creator do
			json.id supplier.creator_id
			json.name supplier.creator ? supplier.creator.name : ''
		end
		
		json.updater do
			json.id supplier.updater_id
			json.name supplier.updater ? supplier.updater.name : ''
		end
	end
end
json.total @total_count
json.success true
