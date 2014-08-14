class BarProdPlan < ActiveRecord::Base

  self.table_name = "barcode.prod_plan"
  
	attr_accessible :plan_dt, :baseloc_cd, :loc_cd, :item_cd, :plan_sq, :lot_fg, :lot_qty, :plan_qty, :reg_id, :reg_dtm, :reg_ip, :item_sq

end
