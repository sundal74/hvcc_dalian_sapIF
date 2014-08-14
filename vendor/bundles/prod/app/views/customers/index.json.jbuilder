json.items do |json|
	json.array!(@collection) do |json, customer|
		json.(customer, :id,:domain_id,:name,:description,:creator_id,:updater_id,:created_at,:updated_at)
		json.creator do
			json.id customer.creator_id
			json.name customer.creator ? customer.creator.name : ''
		end
		json.updater do
			json.id customer.updater_id
			json.name customer.updater ? customer.updater.name : ''
		end
	end
end
json.total @total_count
json.success true
