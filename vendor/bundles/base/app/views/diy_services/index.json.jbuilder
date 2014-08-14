json.items do |json|
	json.array!(@collection) do |json, diy_service|
  		json.(diy_service, :id,:domain_id,:name,:description,:script_type,:collection_tag,:member_tag,:active_flag,:show_params_flag,:service_logic,:logic_file,:atomic_flag,:creator_id,:updater_id,:created_at,:updated_at)
		
	  	# json.creator do
	  	# 	    	json.id diy_service.creator_id
	  	# 	    	json.name diy_service.creator ? diy_service.creator.name : ''
	  	# end if diy_service.creator
	
	  	json.updater do
	    	json.id diy_service.updater_id
	    	json.name diy_service.updater ? diy_service.updater.name : ''
	  	end if diy_service.updater
	end
end

json.total @total_count