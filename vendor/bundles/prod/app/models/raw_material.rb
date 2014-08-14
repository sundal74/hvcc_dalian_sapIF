class RawMaterial < ActiveRecord::Base

  set_table_name :products
  
	stampable
	trace_removable
	meaningful_id [:domain_id, :name]
	belongs_to :domain
	attr_accessible :name,:description,:unit,:default_qty,:prod_type,:loc_cd,:routing,:baseloc_cd,:qc_fg,:use_yn,:label_print_fg
  default_scope where(:prod_type => 'RM')
  
end
