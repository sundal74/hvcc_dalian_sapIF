json.items do |json|
	json.array!(@collection) do |json, terminology|
  		json.(terminology, :id, :domain_id, :name, :description, :locale, :category, :display, :display_short, :updater_id, :updated_at, :creator_id, :created_at)
		
	  	json.creator do
	    	json.id terminology.creator_id
	    	json.name terminology.creator ? terminology.creator.name : ''
	  	end if terminology.creator

	  	json.updater do
	    	json.id terminology.updater_id
	    	json.name terminology.updater ? terminology.updater.name : ''
	  	end if terminology.updater
	end
end
json.total @total_count
json.success true