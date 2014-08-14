class LabelSeq < ActiveRecord::Base

  universal_unique_id
  belongs_to :operation
  belongs_to :product  
  attr_accessible :work_date, :operation_id, :product_id, :label_seq

  #
  # 새로운 라벨 시리얼, label_seq로 부터 4자리 시퀀스 문자열을 생성한다.
  #
  def self.new_label_serial(work_date, operation_id, product_id)
    work_date = Date.parse(work_date) if (work_date.class.name == 'String')
    work_date_str = work_date.strftime('%Y%m%d')
    ls = LabelSeq.where("work_date = ? and operation_id = ? and product_id = ?", work_date_str, operation_id, product_id).first
    
    unless (ls)
      ls = LabelSeq.new
      ls.work_date = work_date_str
      ls.operation_id = operation_id
      ls.product_id = product_id
      ls.label_seq = 0
      ls.save!
    end
    
    ls.label_seq_up
    serial_str = ls.label_seq.to_s
    serial_size = serial_str.size
    if(serial_size >= 3)
      return serial_str
    else
      1.upto(3 - serial_size) { |idx| serial_str = ("0" + serial_str) }
      return serial_str
    end
  end
  
  #
  # 새로운 라벨 번호를 생성한다.
  #
  def label_seq_up
    self.label_seq += 1
    self.label_seq = 0 if(self.label_seq > 999)
    begin
      self.save!
    rescue
      self.label_seq += 1
      self.save!
    end
  end
  
end