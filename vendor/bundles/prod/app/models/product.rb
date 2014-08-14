class Product < ActiveRecord::Base

	stampable
	trace_removable
	meaningful_id [:domain_id, :name]
	belongs_to :domain
	attr_accessible :name,:description,:prod_type,:unit,:default_qty,:pack_type,:short_name,:model_no,:cust_code,:cust_part_no,:cust_part_name
  
  #
  # 변경시 BARCODE 테이블에 반영 
  #
  after_save do
    bar_sql = "select count(*) count from barcode.item where item_cd = '#{self.name}'"
    bar_res = Product.connection.select_all(bar_sql)
    if(bar_res && bar_res.length == 1 && bar_res[0]['count'])
      item_cd = ActiveRecord::Base.connection.quote(self.name)
      item_nm = ActiveRecord::Base.connection.quote(self.description)
      item_unit = ActiveRecord::Base.connection.quote(self.unit)
      item_short_name = ActiveRecord::Base.connection.quote(self.short_name)
      item_model_no = ActiveRecord::Base.connection.quote(self.model_no)
      customer_cd = ActiveRecord::Base.connection.quote(self.cust_code)
      cust_item_cd = ActiveRecord::Base.connection.quote(self.cust_part_no)
      cust_item_nm = ActiveRecord::Base.connection.quote(self.cust_part_name)
      
      if(self.prod_type == 'FERT')
        acct_fg = '2'
        label_print_fg = '2'
        qty_column = 'pallet_qty'
      elsif(self.prod_type == 'HALB')
        acct_fg = '4'
        label_print_fg = '1'
        qty_column = 'box_qty'
      elsif(self.prod_type == 'RM')
        acct_fg = '0'
        label_print_fg = '1'
        qty_column = 'box_qty'
      end
      
      # insert
      if(bar_res[0]['count'] == '0')
        reg_dtm = self.created_at.strftime('%Y%m%d%H%M%S')
        bar_sql = "insert into barcode.item(item_cd, item_nm, unit, #{qty_column}, acct_fg, label_print_fg, use_yn, item_tp, model_no, customer_cd, cust_item_cd, cust_item_nm, reg_id, reg_dtm) values(#{item_cd}, #{item_nm}, #{item_unit}, #{self.default_qty}, '#{acct_fg}', '#{label_print_fg}', '1', #{item_short_name}, #{item_model_no}, #{customer_cd}, #{cust_item_cd}, #{cust_item_nm}, '#{self.creator_id}', '#{reg_dtm}')"
      else
        mod_dtm = self.updated_at.strftime('%Y%m%d%H%M%S')
        bar_sql = "update barcode.item set use_yn = '1', item_nm = #{item_nm}, unit = #{item_unit}, #{qty_column} = #{self.default_qty}, acct_fg = '#{acct_fg}', label_print_fg = '#{label_print_fg}', item_tp = #{item_short_name}, model_no = #{item_model_no}, customer_cd = #{customer_cd}, cust_item_cd = #{cust_item_cd}, cust_item_nm = #{cust_item_nm}, mod_id = '#{self.updater_id}', mod_dtm = '#{mod_dtm}' where item_cd = #{item_cd}"
      end
      
      Product.connection.execute(bar_sql)
    end
  end
  
  #
  # 삭제시 BARCODE 테이블에 반영 
  #
  after_destroy do
    item_cd = ActiveRecord::Base.connection.quote(self.name)
    mod_dtm = Time.now.strftime('%Y%m%d%H%M%S')
    bar_sql = "update barcode.item set use_yn = '0', mod_id = '#{User.current_user.id}', mod_dtm = '#{mod_dtm}' where item_cd = #{item_cd}"
    Product.connection.execute(bar_sql)
  end
  
  #
  # product의 자품목 리스트를 조회 
  #
  def product_parts
    self.domain.product_parts.where(:parent_product_id => self.id)
  end
  
  #
  # product의 자품목 중 Raw Material을 제외한 리스트를 조회 
  #
  def child_half_products
    sql = "select pp.* from product_parts pp, products p where pp.child_product_id = p.id and p.prod_type != 'RM' and pp.parent_product_id = '#{self.id}'"
    Product.connection.select_all(sql)
  end
  
  #
  # order의 product, operation, customer로 label master에서 찾고 없으면 product, operation으로 찾고 그래도 없으면 product 테이블에서 찾는다.
  #
  def get_lot_size(prod_plan)
    self.default_qty
    # lot_size, label_master, customer_id = 0, nil, prod_plan.customer_id    
    # if(customer_id && !customer_id.empty?)
    #   label_master = LabelMaster.get_label_master(prod_plan.domain, prod_plan.product_id, prod_plan.operation_id, customer_id)
    #   label_master = self.domain.label_masters.where("product_id = ? and operation_id = ?", prod_plan.product_id, prod_plan.operation_id).first unless(label_master)
    # else
    #   label_master = self.domain.label_masters.where("product_id = ? and operation_id = ?", prod_plan.product_id, prod_plan.operation_id).first
    # end
    # 
    # if(label_master)
    #   lot_size = label_master.pallet_qty
    # else
    #   lot_size = self.default_qty
    # end
    # return lot_size
  end
  
end
