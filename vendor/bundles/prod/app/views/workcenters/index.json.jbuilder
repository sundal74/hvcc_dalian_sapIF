json.items do |json|
	json.array!(@collection) do |json, workcenter|
		json.(workcenter, :id,:domain_id,:name,:description,:dept_type,:prod_dept,:creator_id,:updater_id,:created_at,:updated_at)
		
	  	json.creator do
	    	json.id workcenter.creator_id
	    	json.name workcenter.creator ? workcenter.creator.name : ''
	  	end
	
	  	json.updater do
	    	json.id workcenter.updater_id
	    	json.name workcenter.updater ? workcenter.updater.name : ''
	  	end
	end
end
json.total @total_count
json.success true
