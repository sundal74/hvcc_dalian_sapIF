module OperationsHelper
  
  #
  # Lot 실적 처리 
  # params
  # => label_no : scan한 label no
  # => actual_qty : 실적 수량 
  # => defect_qty : 불량 수량 
  # => rework_qty : Rework 수량 
  #
  def scan_actual_lot(prod_order, params)
    Lot.raise_if_exist(params[:label_no])
    # 1. Lot 생성 
    lot = Lot.new_lot(params[:label_no], prod_order)
    # 2. 실적 처리
    lot.process_actual({:actual_qty => lot.actual_qty, :defect_qty => 0, :rework_qty => 0})    
  end
  
  #
  # 매뉴얼 수량 처리, 수량 Based 실적 업데이트
  #
  def scan_manual(prod_order, actual_qty, defect_info, rework_qty, desc)
    actual_qty, defect_qty, rework_qty = get_qtys(prod_order, actual_qty, defect_info, rework_qty)
    QtyActual.add_actual(prod_order, actual_qty, defect_qty, defect_info, rework_qty, desc)
  end
  
  #
  # 수량 추출 
  #
  def get_qtys(prod_order, actual_qty, defect_info, rework_qty)
    # 수량 계산 
    actual_qty = (!actual_qty) ? prod_order.get_lot_size : actual_qty.to_i
    defect_qty = get_total_defect_qty(defect_info)
    rework_qty = (!rework_qty) ? 0 : rework_qty.to_i
    # raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.defect_gte_actual') if(defect_qty > actual_qty)
    return actual_qty, defect_qty, rework_qty
  end
  
  #
  # defect_info로 부터 total defect 수량을 계산 
  #
  def get_total_defect_qty(defect_info)
    if(defect_info && !defect_info.blank?)
      defect_list = ActiveSupport::JSON.decode(defect_info)
      return defect_list.inject(0) { |sum, hash| sum += hash['defect_qty'].to_i }
    else
      return 0
    end
  end
  
  ###################################################################################################################################
  #                                                     NOT USED
  ###################################################################################################################################
  
  #
  # Rm Lot 처리 
  #
  def scan_rm_lot(prod_order, params)
    # Lot.raise_if_not_exist(params[:label_no])
    # lot = Lot.find_by_name(params[:label_no])
    # raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.lot_already_input') if(lot.input_time)
    # # 공정에 자재 투입 : inv_qty, inv
    # lot.prod_input(self)
    # lot.save!
  end
  
  #
  # 현재 공정에서 생산 진행 중인 오더를 찾아서 product를 찾고 BOM validation 체크 
  #
  def check_valid_bom(prod_order, raw_product)
    # 쿼리로 validation check
    # count = self.domain.product_parts.where("parent_product_id = ? and child_product_id = ?", prod_order.product_id, raw_product.id).count
    # raise Hatio::Exception::ValidationWarning, (I18n.translate 'error.bom_mismatch_rm') if(count == 0)
  end
  
  #
  # Actual Scan 시점에 BOM Validation
  # BOM 중에 Raw Material이 아닌 품목의 Inventory만 체크해서 하나라도 존재하지 않으면 에러 ...
  #
  def check_rm_inv(prod_order, act_qty)
    # 해당 품목의 BOM 정보를 얻는다.
    # boms = prod_order.product.child_half_products
    # return if(boms.size == 0)
    # 
    # # 자재 투입 공정인 경우는 현재 공정의 생산 품목의 BOM에 해당하는 자재(반제품)이 투입된 것이 있는지 체크한다. For tracking
    # if(self.rm_input_flag)
    #   boms.each do |bom|
    #     next if(bom['child_product_id'].blank? || bom['child_product_id'] == prod_order.product_id || bom['qty'].to_i == 0)
    #     track_qty = bom['qty'].to_i * act_qty
    #     next if track_qty <= 0        
    #     inv_lot = self.domain.lots.where("input_op = ? and product_id = ? and track_qty >= ?", self.name, bom['child_product_id'], track_qty).first
    #     raise Hatio::Exception::ValidationWarning, (I18n.translate 'error.insufficient_inv_qty') + " : #{bom['child_product_id']}" unless(inv_lot)
    #   end
    # # WIP을 차감하는 공정인 경우는 해당 store에 현재 자재(반제품) 수량이 있는지 체크한다. For inventory
    # elsif(self.track_rm_store)
    #   boms.each do |bom|
    #     next if(bom['child_product_id'].blank? || bom['child_product_id'] == prod_order.product_id || bom['qty'].to_i == 0)
    #     inv_out_qty = bom['qty'].to_i * act_qty
    #     next if inv_out_qty <= 0        
    #     inv = self.domain.inventories.where("store_id = ? and product_id = ?", self.track_rm_store_id, bom['child_product_id']).first
    #     raise Hatio::Exception::ValidationWarning, (I18n.translate 'error.insufficient_inv_qty') + " : Inventory Not Found #{bom['child_product']}" unless(inv)
    #     raise Hatio::Exception::ValidationWarning, (I18n.translate 'error.insufficient_inv_qty') + " : #{bom['child_product']}" if(!inv.qty || inv.qty < inv_out_qty)
    #   end
    # end
  end
  
end