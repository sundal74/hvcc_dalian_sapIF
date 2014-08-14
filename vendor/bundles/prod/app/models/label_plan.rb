class LabelPlan < ActiveRecord::Base

	stampable
	universal_unique_id
	belongs_to :domain
	belongs_to :operation
	belongs_to :product
	belongs_to :customer
	attr_accessible :name,:order_date,:shift,:operation_id,:product_id,:customer_id,:order_qty,:lot_qty,:print_qty,:printed_qty,:completed_flag,:reprinted_flag,:internal_seq

  before_validation(:on => :create) do
    self.lot_qty = self.product.default_qty if(!self.lot_qty || self.lot_qty == 0)
    if((!self.print_qty || self.print_qty == 0) && self.order_qty && self.lot_qty > 0)
      self.print_qty = (self.order_qty.to_f / self.lot_qty.to_f).ceil
    end
  end
  
  #
  # print commands : print_qty만큼 커맨드 라벨을 생성. 
  #
  def create_print_commands(to_lot_qty, to_print_qty)
    commands = []
    1.upto(to_print_qty) { |idx| commands.push(self.create_print_command(to_lot_qty)) }
    return commands
  end
  
  #
  # print command 개별 생성
  #
  # 제품 커맨드  20130618|V611|SCP1TIBLB01|YFR|001|1|
  #         날짜 | Location 코드 | 품목 | Lot No | 시리얼 | 수량
  #
  def create_print_command(to_lot_qty)
    return unless self.operation
    label_model = LabelModel.get_label(self.operation.dept_type)
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.active_barcode_label_not_exist') unless label_model
    print_command = label_model.command
    mapping_data = self.create_label_data(to_lot_qty)
    return convert_print_command(print_command, mapping_data)
  end
  
  #
  # 라벨 매핑 데이터
  #
  def create_label_data(to_lot_qty)
    if(self.operation.dept_type == '1')
      return self.create_machinig_label(to_lot_qty)
    else
      return self.create_assembly_label(to_lot_qty)
    end
  end
  
  #
  # create machining label data
  #
  def create_machinig_label(to_lot_qty)
    # LABEL_NUMBER, WORK_DATE, WORK_DATE_DOT, QTY, LOT_NO, SERIAL_NO, 
    # LOCATION, PART_NO, PART_NAME, PART_SHORT_NAME, LOCATION, LOCATION_NAME
    work_date = self.order_date.strftime('%Y%m%d')
    work_date_dot = self.order_date.strftime('%Y.%m.%d')
    mapping = {'qty' => to_lot_qty, 'work_date' => work_date}
    mapping['work_date_dot'] = work_date_dot
    mapping['lot_no'] = self.create_lot_no(self.order_date)
    mapping['part_no'] = self.product.name
    mapping['part_name'] = self.product.description
    mapping['part_short_name'] = self.product.short_name
    mapping['serial_no'] = LabelSeq.new_label_serial(self.order_date, self.operation_id, self.product_id)
	  mapping['gubun'] = 'H'
    mapping['location'] = ''
    mapping['location_name'] = ''
    pp = self.domain.prod_params.select("location").where("location is not null and operation_id = ? and product_id = ?", self.operation_id, self.product_id).first
    if(pp)
      mapping['location'] = pp.location
      loc_result = LabelPlan.connection.select_all("select loc_nm from barcode.loc where loc_cd = '#{pp.location}'")
      mapping['location_name'] = loc_result[0]['loc_nm'] if(loc_result && loc_result.length > 0)
    else
      # operation 코드를 location코드 대신 넣는다.
      mapping['location'] = self.operation_id
      mapping['gubun'] = ''
    end
    
    mapping['label_number'] = "#{work_date}|#{mapping['location']}|#{mapping['part_no']}|#{mapping['lot_no']}|#{mapping['serial_no']}|#{mapping['qty']}|"
    return mapping
  end
  
  #
  # create assembly label data
  #
  def create_assembly_label(to_lot_qty)
    # CUSTOMER, QTY, PART_NO, WORK_DATE_DOT, LOT_NO, SERIAL_NO, LABEL_NUMBER
    # MODEL_NO, MODEL_NAME, CUST_PART_NO, GUBUN, HCCD, SHIFT, LOCATION
    work_date = self.order_date.strftime('%Y%m%d')
    work_date_dot = self.order_date.strftime('%Y.%m.%d')
    mapping = {'qty' => to_lot_qty, 'work_date' => work_date}
    mapping['work_date_dot'] = work_date_dot
    mapping['lot_no'] = self.create_lot_no(self.order_date)
    mapping['part_no'] = self.product.name
    mapping['part_name'] = self.product.description
    mapping['serial_no'] = LabelSeq.new_label_serial(self.order_date, self.operation_id, self.product_id)
    mapping['location'] = ''
    pp = self.domain.prod_params.select("location").where("operation_id = ? and product_id = ?", self.operation_id, self.product_id).first
    mapping['location'] = pp.location if(pp && pp.location)
    mapping['model_no'] = self.product.model_no
    mapping['model_name'] = self.product.short_name
    mapping['customer'] = self.product.cust_code
    mapping['cust_part_no'] = self.product.cust_part_no
    mapping['cust_part_name'] = self.product.cust_part_name
    mapping['gubun'] = 'H'
    mapping['hccd'] = 'HVCCD'
    mapping['shift'] = (self.shift == 1 ? 'A' : 'D')
    mapping['label_number'] = "#{work_date}|#{mapping['location']}|#{mapping['part_no']}|#{mapping['lot_no']}|#{mapping['serial_no']}|#{mapping['qty']}|"
    return mapping
  end
  
  #
  # mapping_data를 바탕으로 print command를 변환한다. 
  #
  def convert_print_command(print_command, command_mapping_data)
    convert_data = {}
    vars = print_command.scan(/\${\w+\}/)
    vars.each do |var|
      var_name = var.sub("${", "").sub("}", "").downcase
      convert_data[var_name] = command_mapping_data[var_name]
    end
        
    convert_data.each do |name, value|
      name = '${' + name.upcase + '}'
      value = value.nil? ? "" : value.to_s
      print_command.gsub!(name, value) 
    end
    
    return print_command
  end
  
  #
  # lot_no 생성 
  #
  def create_lot_no(date)
    strDate = date.strftime('%Y%m%d')
    rYY, rMM, rDD = nil, nil, nil
    sYY = strDate[3..3]
    sMM = strDate[4..5]
    sDD = strDate[6..7]

    case sYY
      when "1"
        rYY = "W"
      when "2"
        rYY = "X"
      when "3"
        rYY = "Y"
      when "4"
        rYY = "Z"
      when "5"
        rYY = "A"
      when "6"
        rYY = "B"
      when "7"
        rYY = "C"
      when "8"
        rYY = "D"
      when "9"
        rYY = "E"
      when "0"
        rYY = "F"
      else
    end

    case sMM
      when "01"
        rMM = "A"
      when "02"
        rMM = "B"
      when "03"
        rMM = "C"
      when "04"
        rMM = "D"
      when "05"
        rMM = "E"
      when "06"
        rMM = "F"
      when "07"
        rMM = "G"
      when "08"
        rMM = "H"
      when "09"
        rMM = "I"
      when "10"
        rMM = "J"
      when "11"
        rMM = "K"
      when "12"
        rMM = "L"
      else
    end

    case sDD
      when "01"
        rDD = "A"
      when "02"
        rDD = "B"
      when "03"
        rDD = "C"
      when "04"
        rDD = "D"
      when "05"
        rDD = "E"
      when "06"
        rDD = "F"
      when "07"
        rDD = "G"
      when "08"
        rDD = "H"
      when "09"
        rDD = "I"
      when "10"
        rDD = "J"
      when "11"
        rDD = "K"
      when "12"
        rDD = "L"
      when "13"
        rDD = "M"
      when "14"
        rDD = "N"
      when "15"
        rDD = "O"
      when "16"
        rDD = "P"
      when "17"
        rDD = "Q"
      when "18"
        rDD = "R"
      when "19"
        rDD = "S"
      when "20"
        rDD = "T"
      when "21"
        rDD = "U"
      when "22"
        rDD = "V"
      when "23"
        rDD = "W"
      when "24"
        rDD = "X"
      when "25"
        rDD = "Y"
      when "26"
        rDD = "Z"
      when "27"
        rDD = "1"
      when "28"
        rDD = "2"
      when "29"
        rDD = "3"
      when "30"
        rDD = "4"
      when "31"
        rDD = "5"
      else
    end
    
    return "#{rYY}#{rMM}#{rDD}"
  end
  
  # #
  # # print command 개별 생성
  # #
  # # 제품 커맨드  260313|A155KBXBB01|6CAMA|0001|100
  # #           날짜 | 파트넘버 | 공정 | 시리얼 | 수량
  # #
  # def create_print_command
  #   label_model = LabelModel.active_label
  #   raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.active_barcode_label_not_exist') unless label_model
  #   print_command = label_model.command
  #   mapping_data = self.create_label_data
  #   return convert_print_command(print_command, mapping_data)
  # end
  # 
  # #
  # # 라벨 매핑 데이터 
  # #
  # def create_label_data
  #   # OPERATION, OPERATION_NAME, PART_NO, PART_NAME, LOT_SIZE, QTY, SERIAL_NO, LOT_NO, CUSTOMER, CUSTOMER_NAME, CUST_PART_NAME    
  #   cust_obj, cust_part_no, cust_part_name, lot_size = nil, '', '', self.lot_qty.to_i
  #   if(self.customer_id && !self.customer_id.empty?)
  #     label_master = LabelMaster.get_label_master(self.domain, self.product_id, self.operation_id, self.customer_id)
  #     if(label_master)
  #       lot_size = label_master.pallet_qty
  #       cust_obj = label_master.customer
  #       cust_part_no = label_master.part_no
  #       cust_part_name = label_master.part_name
  #     end
  #   else
  #     label_master = self.domain.label_masters.where("domain_id = ? and product_id = ? and operation_id = ?", self.domain_id, self.product_id, self.operation_id).first
  #     if(label_master)
  #       lot_size = label_master.pallet_qty
  #       cust_part_no = label_master.part_no
  #       cust_part_name = label_master.part_name
  #     end
  #   end
  #   
  #   mapping_hash = {'operation' => self.operation.name}
  #   mapping_hash['operation_name'] = self.operation.description
  #   mapping_hash['part_no'] = self.product.name
  #   mapping_hash['part_name'] = self.product.description
  #   mapping_hash['lot_size'] = lot_size
  #   mapping_hash['qty'] = lot_size
  #   mapping_hash['qty_2'] = lot_size
  #   mapping_hash['serial_no'] = LabelSeq.new_label_serial(self.order_date, self.operation_id, self.product_id)
  #   mapping_hash['customer'] = cust_obj ? cust_obj.name : ''
  #   mapping_hash['customer_name'] = cust_obj ? cust_obj.description : ''
  #   mapping_hash['cust_part_no'] = cust_part_no
  #   mapping_hash['cust_part_name'] = cust_part_name
  #   lot_no_date = self.order_date.strftime('%d%m%y')
  #   mapping_hash['lot_no'] = "#{lot_no_date}|#{mapping_hash['part_no']}|#{mapping_hash['operation']}|#{mapping_hash['serial_no']}"
  #   mapping_hash['lot_no_2'] = mapping_hash['lot_no']
  #   mapping_hash['label_number'] = "#{lot_no_date}|#{mapping_hash['part_no']}|#{mapping_hash['operation']}|#{mapping_hash['serial_no']}|#{mapping_hash['qty']}"
  #   return mapping_hash
  # end
  
end
