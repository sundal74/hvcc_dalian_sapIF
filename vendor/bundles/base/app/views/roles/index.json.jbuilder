json.items do |json|
	json.array!(@collection) do |json, role|
  		json.(role, :id,:domain_id,:name,:description,:created_at,:creator_id,:updated_at,:updater_id)

	  	json.creator do
	    	json.id role.creator_id
	    	json.name role.creator ? role.creator.name : ''
	  	end
	
	  	json.updater do
	    	json.id role.updater_id
	    	json.name role.updater ? role.updater.name : ''
	  	end
	end
end
json.success true
json.total @total_count