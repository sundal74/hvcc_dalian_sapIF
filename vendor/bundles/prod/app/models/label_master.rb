class LabelMaster < ActiveRecord::Base

	stampable
	trace_removable
	universal_unique_id
	belongs_to :domain
	belongs_to :operation
	belongs_to :product
	belongs_to :label_model
	belongs_to :customer
	attr_accessible :dept_type,:operation_id,:product_id,:label_model_id,:customer_id,:part_no,:part_name,:part_no_seq,:car_type,:car_name,:pallet_qty,:cut_qty,:ship_loc,:area,:customer_plant,:handle_type,:box_no,:jis_code

  #
  # LabelMaster를 조회 
  #
  def self.get_label_master(domain, product_id, operation_id, customer_id)
    customer_id = (customer_id && !customer_id.empty?) ? customer_id : nil
    if(customer_id)
      label_master = domain.label_masters.where("product_id = ? and operation_id = ? and customer_id = ?", product_id, operation_id, customer_id).first
    else
      label_master = domain.label_masters.where("product_id = ? and operation_id = ? and customer_id is null", product_id, operation_id).first
    end
    
    return label_master
  end
  
  # 
  # DEPRECATED
  # Lot 오브젝트 정보로 부터 라벨 커맨드로 생성 
  #
  def create_finish_label_command_by_lot(lot)
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.label_master_has_no_barcode_model') unless self.label_model
    print_command = self.label_model.command
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.empty_barcode_command') unless print_command
    
    mapping_hash = {'operation' => lot.operation.name}
    mapping_hash['operation_name'] = lot.operation.description
    mapping_hash['part_no'] = lot.product.name
    mapping_hash['part_name'] = lot.product.description
    mapping_hash['lot_size'] = lot.product.default_qty
    mapping_hash['qty'] = lot.actual_qty
    mapping_hash['qty_2'] = mapping_hash['qty']
    mapping_hash['serial_no'] = LabelSeq.new_label_serial(lot.work_date, lot.operation_id, lot.product_id)
    cust_obj = self.domain.customers.find(lot.prod_order.customer_id) if(lot.prod_order && lot.prod_order.customer)
    mapping_hash['customer'] = cust_obj.name if(cust_obj)
    mapping_hash['customer_name'] = (cust_obj ? cust_obj.name : '') if(cust_obj)
    mapping_hash['cust_part_name'] = self.part_name
    lot_no_date = lot.work_date.strftime('%d%m%y')
    mapping_hash['lot_no'] = "#{lot_no_date}|#{mapping_hash['part_no']}|#{mapping_hash['operation']}|#{mapping_hash['serial_no']}"
    mapping_hash['lot_no_2'] = mapping_hash['lot_no']
    mapping_hash['label_number'] = "#{lot_no_date}|#{mapping_hash['part_no']}|#{mapping_hash['operation']}|#{mapping_hash['serial_no']}|#{mapping_hash['qty']}"
    
    if(lot)
      lot.name = mapping_hash['label_number']
      lot.serial_no = mapping_hash['serial_no']
      lot.lot_no = mapping_hash['lot_no']
    end
    
    convert_data = {}
    vars = print_command.scan(/\${\w+\}/)
    vars.each do |var|
      var_name = var.sub("${", "").sub("}", "").downcase
      convert_data[var_name] = mapping_hash[var_name]
    end
        
    convert_data.each do |name, value|
      name = '${' + name.upcase + '}'
      value = value.nil? ? "" : value.to_s
      print_command.gsub!(name, value) 
    end
    
    return print_command
  end
  
end
