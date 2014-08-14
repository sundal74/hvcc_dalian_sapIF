json.items do |json|
	json.array!(@collection) do |json, diy_selection|
  		json.(diy_selection, :id,:domain_id,:name,:description,:script_type,:view_type,:pagination_flag, :updater_id, :updated_at, :creator_id, :created_at)
		
	  	# json.creator do
	  	# 	    	json.id diy_selection.creator_id
	  	# 	    	json.name diy_selection.creator ? diy_selection.creator.name : ''
	  	# end if diy_selection.creator

	  	json.updater do
	    	json.id diy_selection.updater_id
	    	json.name diy_selection.updater ? diy_selection.updater.name : ''
	  	end if diy_selection.updater
	end
end
json.total @total_count
json.success true