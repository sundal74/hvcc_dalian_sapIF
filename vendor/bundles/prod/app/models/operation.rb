class Operation < ActiveRecord::Base

    include OperationsHelper
    
   	stampable
   	trace_removable
   	meaningful_id [:domain_id, :name]
   	belongs_to :domain
   	belongs_to :workcenter
   	belongs_to :track_rm_store, :class_name => "Store"
    has_and_belongs_to_many :users, :join_table => "operations_users"
    has_and_belongs_to_many :defect_codes, :join_table => "operations_defects"
    attr_accessible :name,:description,:workcenter_id,:dept_type,:op_type,:op_seq,:inv_flag,:track_rm_store_id,:rm_input_flag,:main_op_flag,:location
    
    #
    # Operation이 store라면 store를 찾아 리턴 
    #
    def get_store
      return self.inv_flag ? Store.find(self.id) : nil
    end
    
    #
    # op_type이 MANUAL 인 경우 
    #
    def scan_manual_type(prod_order, params)
      scan_manual(prod_order, params[:actual_qty], params[:defect_info], params[:rework_qty], params[:description])
    end
    
    #
    # scan 시 최초 진입점 
    #
    def scan(params, prod_order)
      # op_type은 의미가 없고 모든 공정을 LOT 타입으로 본다. 
      self.scan_actual_lot_type(prod_order, params)
    end
    
    #
    # op_type 이 LOT 인 경우 
    # prod_order
    # params
    # => label_no : scan한 label 정보 
    # => actual_qty : 실적 수량 
    # => defect_info : 불량 수량 정보
    # => rework_qty : Rework 수량
    #
    def scan_actual_lot_type(prod_order, params)
      Lot.check_valid_label(params[:label_no], prod_order)
      scan_actual_lot(prod_order, params)
    end
    
    #
    # WIP Input
    #
    def scan_wip_input(params)
      # 20130605 | V611 | F500MKABA03C | YFE | 011 | 80|
      Lot.raise_if_exist(params[:label_no])
      label_arr = params[:label_no].split('|')
      
      if(self.inv_flag)
        qty = label_arr[5].to_i
        pd = self.domain.products.find_by_name(label_arr[2])
        raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.product_not_exist') unless pd
        # prod_params 체크 
        cnt = self.domain.prod_params.where("operation_id = ? and machine_id = ? and product_id = ?", self.id, params[:machine_id], pd.id).count
        raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.invalid_label') if(cnt == 0)
        inv = Inventory.find_inv(self.domain, self.id, pd.id)
        inv.description = "WIP : #{qty}"
        inv.machine_id = params[:machine_id]
        inv.inv_in(qty)
      else
        # WIP 관리 공정이 아니면 에러, TODO Locale
        raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.operation_is_not_store') if(cnt == 0)
      end
            
      # Lot.raise_if_exist(params[:label_no])
      # label_arr = params[:label_no].split('|')
      # lot = self.domain.lots.new
      # lot.name = params[:label_no]
      # lot.operation_id = params[:operation_id]
      # lot.machine_id = params[:machine_id]
      # prod = self.domain.products.find_by_name(label_arr[1])
      # lot.product_id = prod.id
      # lot.lot_no = "#{label_arr[0]}|#{label_arr[1]}|#{label_arr[2]}|#{label_arr[3]}"
      # lot.serial_no = label_arr[3]
      # lot.actual_qty = label_arr[4].to_i
      # lot.status = 'INIT'
      # lot.work_date = self.domain.shift.current_work_date
      # lot.shift = self.domain.shift.current_shift
      # lot.lot_type = 'WIP'
      # lot.save!
      # 
      # if(lot.operation && lot.operation.inv_flag)
      #   inv = Inventory.find_inv(self.domain, lot.operation_id, lot.product_id)
      #   inv.lot_type = 'WIP'
      #   inv.lot_id = lot.id
      #   inv.description = "WIP : #{lot.actual_qty}"
      #   inv.machine_id = lot.machine_id
      #   inv.inv_in(lot.actual_qty)
      # end
    end
    
    ###################################################################################################################################
    #                                                     NOT USED
    ###################################################################################################################################
    
    #
    # Lot scan 전 validation 
    #
    def check_valid_lot(params)
      prod_order = ProdOrder.find(params[:prod_order_id])
      raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.invalid_order') unless prod_order
      Lot.check_valid_label(params[:label_no], prod_order)
      Lot.raise_if_exist(params[:label_no])
      # act_qty = params[:label_no].split('|')[4]
      # raw material inventory를 체크한다. 
      # self.check_rm_inv(prod_order, act_qty.to_i)
    end
    
    #
    # 자재 투입 전 Validation
    #
    def check_valid_rm(params)
      prod_order = ProdOrder.find(params[:prod_order_id])
      raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.invalid_order') unless prod_order
      
      # 1. Check Label Validation
      label_no = params[:label_no]
      RmLot.validate_label(label_no)
      label_arr = label_no.split('|')
      raw_product = self.domain.products.find_by_name(label_arr[1])
      raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.product_not_exist') + '(Product : ' + label_arr[1] + ')' unless(raw_product)
      # 2. Check BOM
      self.check_valid_bom(prod_order, raw_product)
    end
    
    #
    # 자재 투입 처리 
    #
    def scan_rm_input(params)
      # valid_check_rm 에서 validation check
      prod_order = ProdOrder.find(params[:prod_order_id])
      scan_rm_lot(prod_order, params)
    end
end
