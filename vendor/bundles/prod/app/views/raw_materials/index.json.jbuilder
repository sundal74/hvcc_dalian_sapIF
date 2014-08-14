json.items do |json|
	json.array!(@collection) do |json, raw_material|
		json.(raw_material, :id,:domain_id,:name,:description,:prod_type,:unit,:default_qty,:loc_cd,:routing,:baseloc_cd,:qc_fg,:use_yn,:label_print_fg,:created_at,:updated_at)
		json.creator do
			json.id raw_material.creator_id
			json.name raw_material.creator ? raw_material.creator.name : ''
		end
		json.updater do
			json.id raw_material.updater_id
			json.name raw_material.updater ? raw_material.updater.name : ''
		end
	end
end
json.total @total_count
json.success true
