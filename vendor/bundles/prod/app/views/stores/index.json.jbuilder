json.items do |json|
	json.array!(@collection) do |json, store|
		json.(store, :id,:domain_id,:name,:description,:creator_id,:created_at,:updater_id,:updated_at)
		json.creator do
			json.id store.creator_id
			json.name store.creator ? store.creator.name : ''
		end
		json.updater do
			json.id store.updater_id
			json.name store.updater ? store.updater.name : ''
		end
	end
end
json.total @total_count
json.success true
