class RmLot < ActiveRecord::Base

	meaningful_id [:domain_id, :name]
	belongs_to :domain
	belongs_to :operation
	attr_accessible :name,:operation_id,:lot_no,:serial_no,:supplier_code,:part_no,:invoice_no,:print_date,:in_qty,:out_qty,:inv_qty,:inv_in_time,:inv_out_time
  attr_accessor :product_id, :supplier_id
  
  #
  # RmLot 수정 전 --> Inventory 에 반영 
  #
  before_save do
    unless(inv_in_time)
      self.inv_qty = self.in_qty
      self.inv_in_time = Time.now
    end
    
    if(self.operation && self.operation.inv_flag)
      # 변경 전, 후 수량을 계산하여 Inventory에 반영 
      if(self.inv_qty_changed?)
        inv_qty_hist = self.changes['inv_qty']
        inv_qty_bef = inv_qty_hist[0] || 0
        inv_qty_aft = inv_qty_hist[1] || 0
        inv_qty_gap = inv_qty_aft - inv_qty_bef
        
        if(inv_qty_gap == 0)
        elsif(inv_qty_gap > 0)
          inv = Inventory.find_inv(self.domain, self.operation_id, "#{self.domain_id}-#{self.part_no}")
          inv.inv_in(inv_qty_gap)
        else
          inv = Inventory.find_inv(self.domain, self.operation_id, "#{self.domain_id}-#{self.part_no}")
          inv.inv_out(inv_qty_gap)
          self.out_qty += (-1 * inv_qty_gap)
          self.inv_out_time = Time.now
        end
      end
    end
  end
  
  #
  # 삭제 후 --> Inventory 에 반영 
  #
  before_destroy do
    if(self.operation && self.operation.inv_flag)
      inv = Inventory.find_inv(self.domain, self.operation_id, "#{self.domain_id}-#{self.part_no}")
      inv.inv_out(self.inv_qty)
    end
  end
  
  #
  # before validation
  #
  before_validation do
    self.in_qty ||= 0
    self.out_qty ||= 0
    self.inv_qty ||= 0
  end
  
  ################################################################################################
  # barcode_label : part_no | qty | supplier_code | print_date | serial_no | lot_no | invoice_no
  # name == barcode label
  ################################################################################################
  
  #
  # 자재 라벨 validation
  #
  def self.validate_label(label)
    # part_no | qty | supplier_code | print_date | serial_no | lot_no | invoice_no
    label_arr = label.split('|')
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.invalid_label_type') if(label_arr.length != 7 && label_arr.length != 5)
    
    # 300513 | product_id | operation_id | serial_no | qty
    if(label_arr.length == 5) 
      product = Product.find_by_name(label_arr[1])    
      raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.invalid_label') + ' ' + (I18n.translate 'error.product_not_exist') unless(product)
      raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.invalid_label') + ' ' + (I18n.translate 'error.lot_qty_gte_zero') if(label_arr[4].to_i == 0)
    end
    
    RmLot.raise_if_exist(label)
  end
  
  #
  # 자재가 존재하는지 체크하고 존재하면 raise
  #
  def self.raise_if_exist(label)
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.lot_already_exist') if(RmLot.rmlot_exist?(label))
  end
  
  #
  # 자재가 존재하는지 체크하고 존재하지 않으면 raise
  #
  def self.raise_if_not_exist(label)
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.lot_not_exist') unless(RmLot.rmlot_exist?(label))
  end
  
  #
  # Lot이 존재하는지 체크
  #
  def self.rmlot_exist?(label)
    return RmLot.where("name = ?", label).count > 0
  end
  
  #
  # 라벨 정보로 부터 파싱 A143BBJAB01|300|AA001|2013-03-19|0319005|0318A143BBJAB01005|I-1
  #  
  def self.parse_label(label, rm_lot)
    label_arr = label.split('|')
    if(label_arr.size == 7) 
      return parse_rm_label(label, rm_lot)
    elsif(label_arr.size == 5)
      return parse_lot_label(label, rm_lot)
    else
      raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.invalid_label')
    end
  end
  
  #
  # 자재 label을 파싱 
  #
  def self.parse_rm_label(label, rm_lot)
    label_arr = label.split('|')
    rm_lot.name = label
    rm_lot.part_no = label_arr[0]
    product = rm_lot.domain.products.find_by_name(rm_lot.part_no)    
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.invalid_label') unless(product)
    rm_lot.in_qty = label_arr[1].to_i
    rm_lot.supplier_code = label_arr[2]
    rm_lot.print_date = label_arr[3]
    rm_lot.serial_no = label_arr[4]
    rm_lot.lot_no = label_arr[5]
    rm_lot.invoice_no = label_arr[6]
    rm_lot.product_id = product.id
    rm_lot
  end
  
  #
  # 반제품 lot label을 파싱 
  # 반제품 라벨 형식 : 20130316|A152QBVAB01|6PAUF|0003|100
  #             날짜 | 파트넘버 | 공정 코드 | 시리얼 | 수량 
  #
  def self.parse_lot_label(label, rm_lot)
    label_arr = label.split('|')
    rm_lot.name = label
    rm_lot.part_no = label_arr[1]
    product = rm_lot.domain.products.find_by_name(rm_lot.part_no)    
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.invalid_label') unless(product)
    rm_lot.serial_no = label_arr[3]
    rm_lot.lot_no = "#{label_arr[0]}|#{rm_lot.part_no}|#{label_arr[2]}|#{rm_lot.serial_no}"
    rm_lot.in_qty = label_arr[4].to_i
    rm_lot.product_id = product.id
    rm_lot
  end

  # 
  # new lot
  #
  def self.new_lot(domain, label)
    rm_lot = domain.rm_lots.new
    RmLot.parse_label(label, rm_lot)
    rm_lot
  end
  
  #
  # LOT - RMLOT Mapping
  #
  def mapping_with_lot(store, lot, current_inv_qty)
    return 0 if current_inv_qty <= 0
    mapping_qty = (current_inv_qty >= self.inv_qty) ? self.inv_qty : current_inv_qty    
    self.inv_qty -= mapping_qty
    self.save!
    
    # Lot & RmLot mapping
    LotsRms.create(:lot_id => lot.id, :rm_lot_id => self.id, :use_qty => mapping_qty)
    return (current_inv_qty - mapping_qty)
  end
  
  #
  # store에 현재 존재하는 rm_lot 정보를 모두 가져온다.
  #
  def self.find_inv_rm_lots(store, product_id)
    product = Product.find(product_id)
    store.domain.rm_lots.where("operation_id = ? and part_no = ? and inv_qty > 0", store.id, product.name).order("inv_in_time asc")
  end
  
  #
  # inventory in
  #
  def inv_in(store)
    self.operation_id = store.id if(!self.operation_id && self.operation_id.empty?)
    self.inv_qty = self.in_qty
    self.inv_in_time = Time.now
    self.save
    
    inv = Inventory.find_inv(self.domain, store.id, self.product_id)
    inv.lot_id = self.id
    inv.inv_in(self.inv_qty)
  end
  
  #
  # inventory out
  #
  def inv_out(store)
    inv = Inventory.find_inv(self.domain, store.id, "#{self.domain_id}-#{self.part_no}")
    inv.lot_id = self.id
    inv.inv_out(self.inv_qty)
    
    self.inv_qty = 0
    self.out_qty = self.in_qty
    self.inv_out_time = Time.now
    self.save
  end
  
  #
  # inventory out : 모든 수량을 Out하는 게 아니라 일부 개수만 OUT
  #
  def inv_part_out(store, out_qty)
    product = self.domain.products.find_by_name(self.part_no)
    inv = Inventory.find_inv(self.domain, store.id, product.id)
    inv.lot_id = self.id
    inv.inv_out(out_qty)
    self.out_qty ||= 0
    self.out_qty += out_qty
    self.inv_qty -= out_qty
    self.inv_out_time = Time.now
    self.save
  end
  
  #
  # inventory transfer
  #
  def inv_transfer(source_store, target_store)
    inv = Inventory.find_inv(self.domain, source_store.id, self.product_id)
    inv.lot_id = self.id
    inv.inv_transfer(target_store.id, self.qty)
    self.operation_id = target_store.id
    self.inv_qty = self.in_qty
    self.in_time = Time.now
    self.save
  end
  
  #
  # barcode system in-out
  #
  def rm_bar_mat(params)
    rm_lot = self.domain.rm_lots.find(self.id)
    
    # in_sql = "select mat.store_loc, mat.product, mat.lot_size, mat.qty, mat.time, p.description product_desc from (
    #       select loc_cd store_loc, item_cd product, lot_qty lot_size, lot_rqty qty, whi_dt time
    #       from bar_matin 
    #       where lot_no = '#{rm_lot.lot_no}' and ser_no = '#{rm_lot.serial_no}' and item_cd = '#{rm_lot.part_no}' 
    #       union 
    #       select loc_cd store_loc, item_cd product, lot_qty lot_size, lot_rqty qty, who_dt time
    #       from bar_matout 
    #       where lot_no = '#{rm_lot.lot_no}' and ser_no = '#{rm_lot.serial_no}' and item_cd = '#{rm_lot.part_no}') 
    #       mat left outer join products p on mat.product = p.name order by mat.time desc"
    # RmLot.connection.select_all(in_sql)
    []
  end
  
end
