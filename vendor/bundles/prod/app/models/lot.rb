class Lot < ActiveRecord::Base

  trace_removable
  # TODO 체크 label_no를 그냥 아이디로 한다. name은 사용하지 않는다.
  meaningful_id [:domain_id, :name]
  belongs_to :domain
  belongs_to :prod_order
  belongs_to :product
  belongs_to :operation
  belongs_to :machine
  has_many :serial_lots
  attr_accessible :name,:description,:lot_no,:serial_no,:status,:prod_order_id,:work_date,:shift,:product_id,:operation_id,:machine_id,:lot_type,:action,:actual_qty,:defect_qty,:rework_qty,:tran_time,:inv_status,:input_op,:input_time,:track_qty

  ###################################################################################################################################
  # 상태 코드 : INIT (생성), TERMINATED(완료), RUN(진행), WAIT_TO_MOVE(완료 후 대기), WAIT_TO_RUN (실행 대기)
  ###################################################################################################################################

  ###################################################################################################################################
  # barcode_label : 날짜 | 로케이션 코드 | 품목 코드 | LOT NO | Serial No. | 수량 (ex : 320130605 | V611 | F500MKABA03C | YFE | 011 | 80|)
  ###################################################################################################################################

  before_validation do
    self.status ||= 'INIT'
    self.action ||= 'CREATE'
    self.tran_time ||= Time.now
    self.actual_qty ||= 0
    self.defect_qty ||= 0
    self.rework_qty ||= 0
    self.track_qty ||= 0
  end
    
  #
  # Lot 수정 전
  #
  after_save do
    # 변경 전, 후 actual_qty를 계산하여 prod_order에 실적 반영 
    if(self.actual_qty_changed?)
      act_qty_hist = self.changes['actual_qty']
      act_qty_bef = act_qty_hist[0] || 0
      act_qty_aft = act_qty_hist[1] || 0
      act_qty_gap = act_qty_aft - act_qty_bef
      self.prod_order.add_actual(act_qty_gap, 0, 0) if(act_qty_gap != 0 && self.prod_order)
    end
  end
  
  #
  # 삭제 후 prod_order에 실적 수량 반영 
  #
  before_destroy do
    self.prod_order.subtract_actual(self.actual_qty, self.defect_qty, self.rework_qty) if(self.prod_order)
  end
  
  #########################################################
  #             LABEL PARSING AND VALIDATION
  #########################################################
  #
  # new lot
  #
  def self.new_lot(label, prod_order)
    lot = prod_order.domain.lots.new
    
    if(label && !label.empty?)
      lot.name = label
      label_info_arr = label.split('|')
      
      # 20130605 | V611 | F500MKABA03C | YFE | 011 | 80|
      if(label_info_arr.length == 6)
        lot.lot_no = label_info_arr[3]
        lot.serial_no = label_info_arr[4]
        lot.actual_qty = label_info_arr[5].to_i
      end
    end
    
    lot.status = 'INIT'
    lot.prod_order_id = prod_order.id
    lot.work_date = prod_order.order_date
    lot.shift = prod_order.shift
    lot.operation_id = prod_order.operation_id
    lot.machine_id = prod_order.machine_id
    lot.product_id = prod_order.product_id
    lot
  end
  
  # 
  # 라벨 validation
  #
  def self.check_valid_label(label, prod_order)
    label_arr = label.split('|')
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.invalid_label_type') if(label_arr.length != 6)
    cnt = prod_order.domain.prod_params.where("operation_id = ? and machine_id = ? and product_id = ? and location = ?", prod_order.operation_id, prod_order.machine_id, prod_order.product_id, label_arr[1]).count
    # 생산 파라미터에 등록이 되지 않았다면 에러 ...
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.mismatch_label_and_operation') if(cnt == 0)
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.mismatch_label_and_order') if(label_arr[2] != prod_order.product.name)
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.invalid_label_serial') if(label_arr[3].length != 3)
    # TODO locale 처리 필요 10000개를 넘어가면 이상한 값으로 인식 ...
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.invalid_label_qty') if(label_arr[5].length > 5)
  end
  
  #
  # Lot이 존재하는지 체크하고 존재하면 raise
  #
  def self.raise_if_exist(label)
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.lot_already_exist') if(Lot.lot_exist?(label))
  end
  
  #
  # Lot이 존재하는지 체크하고 존재하지 않으면 raise
  #
  def self.raise_if_not_exist(label)
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.lot_not_exist') unless(Lot.lot_exist?(label))
  end
  
  #
  # Lot이 존재하는지 체크, TODO lot_no로 찾기 ...
  #
  def self.lot_exist?(label)
    return Lot.where("name = ?", label).count > 0
  end
  
  #########################################################
  #                   CALCULATE ACTUAL
  #########################################################
  
  #
  # Lot 삭제 --> 오더 실적에 반영 
  #
  def cancel_lot
    self.destroy
  end
  
  #
  # Lot 실적 처리 
  #
  def process_actual(params)
    self.actual_qty = params[:actual_qty] unless params[:actual_qty].blank?
    self.defect_qty = params[:defect_qty] unless params[:defect_qty].blank?
    self.rework_qty = params[:rework_qty] unless params[:rework_qty].blank?
    self.status = "TERMINATED"
    self.save!

    # 자재 매핑
    # self.mapping_lot(self.operation) if(self.operation.rm_input_flag)    
  end
  
  #########################################################
  #                   LOT INVENTORIES
  #########################################################
  
  # #
  # # inventory in
  # #
  # def inv_in(store_id, in_qty)
  #   self.operation_id = store_id if(self.operation_id != store_id)
  #   inv = Inventory.find_inv(self.domain, store_id, self.product_id)
  #   inv.lot_id = self.id
  #   inv.lot_type = 'LOT'
  #   inv.description = self.description if(self.description)
  #   inv.inv_in(in_qty)
  # end
  # 
  # #
  # # inventory out
  # #
  # def inv_out(store_id, out_qty)
  #   inv = Inventory.find_inv(self.domain, store_id, self.product_id)
  #   inv.lot_type = 'LOT'
  #   inv.lot_id = self.id
  #   inv.description = self.description if(self.description)
  #   inv.inv_out(out_qty)
  # end
  # 
  # #
  # # inventory transfer
  # #
  # def inv_transfer(source_store_id, target_store_id, move_qty)
  #   self.operation_id = target_store_id
  #   inv = Inventory.find_inv(self.domain, source_store_id, self.product_id)
  #   inv.lot_type = 'LOT'
  #   inv.lot_id = self.id
  #   inv.description = self.description if(self.description)
  #   inv.inv_transfer(target_store_id, move_qty)
  # end
  
  #########################################################
  #             LOTS AND RAW MATERIAL LOTS
  #########################################################
  
  #
  # 공정에 자재 투입 
  #
  def prod_input(input_operation)
    # inv_status : Input
    self.track_qty = self.actual_qty
    self.input_time = Time.now
    self.input_op = input_operation.name
  end
  
  #
  # Lot에 매핑된 rm_lots를 조회 
  #
  def rm_lots
    sql = "select rl.id, rl.product_id, map.use_qty, rl.lot_no, rl.serial_no, rl.input_time, map.use_qty from lots rl left outer join lots_rms map on rl.id = map.rm_lot_id where map.lot_id = '#{self.id}'"
    Lot.connection.select_all(sql)
  end
  
  #
  # store에 존재하는 rm lot과 mapping
  #
  def mapping_lot(input_operation)
    boms = self.product.child_half_products
    return if(boms.size == 0)
    
    # TODO bom에 포함되어 있는 자품목과 input_operation으로 재고가 있는 공정을 한번에 조회 
    boms.each do |bom|
      next if(bom['child_product_id'].blank? || bom['child_product_id'] == self.product_id || bom['qty'].to_i == 0)
      bom_qty = bom['qty'].to_i
      
      # 재고를 빼야 하는 수량 계산 : 자품목의 수량 * actual_qty
      track_out_qty = bom_qty * self.actual_qty
      next if track_out_qty <= 0
      
      while(track_out_qty > 0) do
        rm_lot = self.domain.lots.where("input_op = ? and product_id = ? and track_qty > 0", input_operation.name, bom['child_product_id']).order("input_time asc").first
        if(rm_lot)
          track_out_qty = rm_lot.mapping_with_lot(input_operation, self, track_out_qty)
        else
          track_out_qty = 0
        end
      end
    end
  end
  
  #
  # LOT - RMLOT Mapping
  #
  def mapping_with_lot(store, lot, cur_track_qty)
    return 0 if cur_track_qty <= 0    
    mapping_qty = (cur_track_qty >= self.track_qty) ? self.track_qty : cur_track_qty
    self.track_qty -= mapping_qty
    self.save!
    # Lot & Lot mapping
    LotsRms.create(:lot_id => lot.id, :rm_lot_id => self.id, :use_qty => mapping_qty)
    return (cur_track_qty - mapping_qty)
  end
    
end
