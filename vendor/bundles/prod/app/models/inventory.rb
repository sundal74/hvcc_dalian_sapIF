class Inventory < ActiveRecord::Base

	universal_unique_id
	trace_removable
	belongs_to :domain
	belongs_to :store
	belongs_to :product
	attr_accessible :store_id,:product_id,:qty
	attr_accessor :machine_id, :action_code, :lot_type, :lot_id, :action_qty, :from_store_id, :to_store_id, :description
	
	validates :domain_id, :store_id, :product_id, :presence => true
  
  after_save do
    if(self.qty_changed?)
      qty_hist = self.changes['qty']
      qty_bef = qty_hist[0] || 0
      qty_aft = qty_hist[1] || 0
      qty_gap = qty_aft - qty_bef
      
      unless(self.action_code.blank?)
        data = {
          :inventory_id => self.id, 
          :store_id => self.store_id, 
          :machine_id => self.machine_id,
          :product_id => self.product_id, 
          :action_code => self.action_code,
          :lot_type => self.lot_type,
          :lot_id => self.lot_id,
          :inv_qty => qty_bef,
          :qty => self.action_qty,
          :from_store_id => self.from_store_id,
          :to_store_id => self.to_store_id,
          :description => self.description
        }
        inv_hist = self.domain.inventory_hists.new(data)
        inv_hist.save!
      end
    end
  end
  
  #
  # store_id, product_id로 Inventory를 조회 
  #
  def self.find_inv(domain, store_id, product_id)
    inv = domain.inventories.where("store_id = ? and product_id = ?", store_id, product_id).first
    inv = domain.inventories.new({:store_id => store_id, :product_id => product_id}) unless inv
    return inv
  end
  
  #
  # In action
  #
  def inv_in(qty)
    in_qty = _to_int(qty)
    self.action_code = 'IN'
    self.action_qty = in_qty
    self.qty ||= 0
    self.qty += in_qty
    self.save!
  end
  
  #
  # In action
  #
  def inv_out(qty)
    out_qty = _to_int(qty)
    self.qty ||= 0
    self.action_code = 'OUT'
    self.action_qty = out_qty
    self.qty -= out_qty
    self.save!
  end
  
  #
  # 현재 Store에서 target store로 qty 수량 만큼 이동 
  #
  def inv_transfer(target_store_id, qty)
    qty = _to_int(qty)
    return if(qty == 0)
    raise "Empty target store not allowed!" if(target_store_id.nil? || target_store_id.blank?)
    target_inv = Inventory.find_inv(self.domain, target_store_id, self.product_id)
    Inventory.transaction do
      self.inv_out_transfer(target_store_id, qty)
      target_inv.inv_in_transfer(self.store_id, qty)
    end
  end
  
  def inv_in_transfer(from_store_id, qty)
    self.from_store_id = from_store_id
    self.action_code = 'TRANSFER'
    self.action_qty = qty
    self.qty += qty
    self.save!
  end
  
  def inv_out_transfer(to_store_id, qty)
    self.to_store_id = to_store_id
    self.action_code = 'TRANSFER'
    self.action_qty = qty
    self.qty -= qty
    self.save!
  end
  
  #
  # Reconcile action
  #
  def inv_reconcile(add_qty, description)
    self.qty ||= 0
    add_qty = _to_int(add_qty)

    if(add_qty != 0)
      self.action_code = 'ADJUST'
      self.action_qty = add_qty
      self.qty += add_qty
      self.description = description
      self.save!
    end
  end
  
  private 
  
  def _to_int(qty)
    qty = 0 if(qty.nil? || qty.blank?)
    return (qty.class.name == 'Fixnum') ? qty : qty.to_i
  end
  
  ###################################################################################################################################
  #                                                     NOT USED
  ###################################################################################################################################
  
  #
  # target_store에 있는 WIP에서 BOM을 바탕으로 수량을 차감한다.
  #
  def self.target_inv_out(target_store, prod_order, remove_qty, desc)
    # boms = prod_order.product.child_half_products
    # return if(boms.size == 0)
    #     
    # # TODO bom에 포함되어 있는 자품목과 현재 공정으로 재고가 있는 공정을 한번에 조회 
    # boms.each do |bom|
    #   next if(bom['child_product_id'].blank? || bom['child_product_id'] == prod_order.product_id || bom['qty'].to_i == 0)
    #   bom_qty = bom['qty'].to_i
    #   # 재고를 빼야 하는 수량 계산 : 자품목의 수량 * lot_size
    #   inv_out_qty = bom_qty * remove_qty
    #   next if inv_out_qty <= 0
    #   inv = Inventory.find_inv(prod_order.domain, target_store.id, bom['child_product_id'])
    #   inv.lot_type = 'Order'
    #   inv.lot_id = prod_order.id
    #   inv.machine_id = prod_order.machine_id
    #   inv.description = desc
    #   inv.inv_out(inv_out_qty)
    # end
  end
  
  #
  # target_store에 있는 WIP에서 BOM을 바탕으로 수량을 추가한다.
  #
  def self.target_inv_in(target_store, prod_order, add_qty, desc)
    # boms = prod_order.product.child_half_products
    # return if(boms.size == 0)
    #     
    # # TODO bom에 포함되어 있는 자품목과 현재 공정으로 재고가 있는 공정을 한번에 조회 
    # boms.each do |bom|
    #   next if(bom['child_product_id'].blank? || bom['child_product_id'] == prod_order.product_id || bom['qty'].to_i == 0)
    #   bom_qty = bom['qty'].to_i
    #   # 재고를 빼야 하는 수량 계산 : 자품목의 수량 * lot_size
    #   inv_in_qty = bom_qty * add_qty
    #   next if inv_in_qty <= 0
    #   inv = Inventory.find_inv(prod_order.domain, target_store.id, bom['child_product_id'])
    #   inv.lot_type = 'Order'
    #   inv.lot_id = prod_order.id
    #   inv.machine_id = prod_order.machine_id
    #   inv.description = desc
    #   inv.inv_in(inv_in_qty)
    # end
  end
end
