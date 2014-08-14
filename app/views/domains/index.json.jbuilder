json.items do |json|
	json.array!(@domains) do |json, domain|
  		json.(domain, :id,:name,:description,:system_flag,:timezone,:created_at,:creator_id,:updated_at,:updater_id)
	end
end
json.success true
json.total collection.total_count