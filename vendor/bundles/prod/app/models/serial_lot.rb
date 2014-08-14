class SerialLot < ActiveRecord::Base

	meaningful_id [:domain_id, :name]
	belongs_to :domain
	belongs_to :prod_order
	belongs_to :operation
	belongs_to :machine
	belongs_to :product
	belongs_to :lot
	attr_accessible :name,:prod_order_id,:operation_id,:machine_id,:product_id,:lot_id,:work_date,:shift,:serial_no,:scan_time,:confirm_flag
	
  # before_validation do
  #     self.work_date = self.work_date.to_date if self.work_date
  #   end

  #
  # SerialLot 생성시 --> 오더 실적 추가 
  #
  before_create do
	  self.scan_time ||= Time.now
  end
  
  #
  # Lot이 존재하는지 체크하고 존재하면 raise
  #
  def self.raise_if_exist(label)
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.lot_already_exist') if(SerialLot.lot_exist?(label))
  end
  
  #
  # Lot이 존재하는지 체크하고 존재하지 않으면 raise
  #
  def self.raise_if_not_exist(label)
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.lot_not_exist') unless(SerialLot.lot_exist?(label))
  end
  
  #
  # Lot이 존재하는지 체크
  #
  def self.lot_exist?(label)
    return SerialLot.where("name = ?", label).count > 0
  end
  
  # 
  # SerialLot에 대한 라벨 validation
  #
  def self.validate_label(label, prod_order)
    # YYYYMMDD | PRODUCT | SERIAL(4)
    label_arr = label.split('|')
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.invalid_label_type') if(label_arr.length != 3)
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.mismatch_label_and_order') if(label_arr[1] != prod_order.product.name)
    raise Hatio::Exception::InvalidRequest, (I18n.translate 'error.invalid_label_serial') if(label_arr[2].length != 4)
    SerialLot.raise_if_exist(label)
  end
  
  #
  # serial label 파싱 
  #
  def self.parse_label(label, prod_order)
    label_list = label.split('|')
    product_name = label_list[0]
    product = prod_order.domain.products.find_by_name(product_name)    
    serial_no = label_list[2]
    return SerialLot.new_serial_lot(label, serial_no, prod_order)
  end

  #
  # label, prod_order로 SerialLot new
  #
  def self.new_serial_lot(label, serial_no, prod_order)
    serial_lot = prod_order.domain.serial_lots.new
    serial_lot.name = label
    serial_lot.serial_no = serial_no
    serial_lot.work_date = prod_order.order_date
    serial_lot.shift = prod_order.shift
    serial_lot.prod_order_id = prod_order.id
    serial_lot.operation_id = prod_order.operation_id
    serial_lot.machine_id = prod_order.machine_id
    serial_lot.product_id = prod_order.product_id
    serial_lot    
  end
  
  #
  # TODO 이름 변경 필요 
  # TODO 확인 필요 - 동시에 두 개 이상의 고객사의 Serial을 생산할 수 있는지 
  # store에 현재 존재하는 serial_lot 정보를 모두 가져온다.
  #
  def self.find_inv_serial_lots(operation, product_id)
    operation.domain.serial_lots.where("operation_id = ? and product_id = ? and lot_id is null", operation.id, product_id).order("scan_time asc")
  end
  
end