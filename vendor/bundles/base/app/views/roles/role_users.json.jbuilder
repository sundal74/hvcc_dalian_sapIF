json.items do |json|
	json.array!(@collection) do |json, user|
		json.(user, :id, :login, :name, :email, :dept)
	end
end
json.success true
json.total @collection.size