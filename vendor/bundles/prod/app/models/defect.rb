class Defect < ActiveRecord::Base

	stampable
	universal_unique_id
	belongs_to :domain
	belongs_to :prod_order
	belongs_to :operation
	belongs_to :machine
	belongs_to :product
	belongs_to :child_product, :class_name => "Product", :foreign_key => "child_product_id"
	belongs_to :defect_code
	attr_accessible :dept_type,:work_date,:shift,:operation_id,:machine_id,:product_id,:child_product_id,:prod_order_id,:defect_code_id,:defect_qty,:description,:upload_flag

  #
  # Scrap 생성 혹은 수정 후 
  #
  after_save do
    # 변경 전, 후 defect_qty를 계산하여 prod_order에 실적 반영 
    if(self.defect_qty_changed?)
      defect_qty_hist = self.changes['defect_qty']
      defect_qty_bef = defect_qty_hist[0] || 0
      defect_qty_aft = defect_qty_hist[1] || 0
      defect_qty_gap = defect_qty_aft - defect_qty_bef
      self.prod_order.add_actual(0, defect_qty_gap, 0) if(defect_qty_gap != 0 && self.prod_order)
    end
  end
  
  before_save do
    self.upload_flag = true if(self.defect_qty_changed?)
    
    if(self.prod_order)
      self.work_date = self.prod_order.order_date unless(self.work_date)
      self.shift = self.prod_order.shift unless(self.shift)
      self.operation_id = self.prod_order.operation_id unless(self.operation)
      self.machine_id = self.prod_order.machine_id unless(self.machine)
      self.product_id = self.prod_order.product_id unless(self.product)
    end
  end
  
end