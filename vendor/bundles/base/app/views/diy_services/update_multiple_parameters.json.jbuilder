json.items do |json|
	json.array!(@service_params) do |json, service_param|
		json.(service_param, :id, :resource_type, :resource_id, :name, :description, :rank)
	end
end