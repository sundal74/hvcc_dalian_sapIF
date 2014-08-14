class LabelModel < ActiveRecord::Base

	stampable
	trace_removable
	meaningful_id [:domain_id, :name]
	belongs_to :domain
	attr_accessible :name,:description,:printer_type,:command,:active_flag,:dept_type

  def self.active_label
    return LabelModel.where("active_flag = ?", true).first
  end
  
  def self.get_label(depttype)
    return LabelModel.where("active_flag = ? and dept_type = ?", true, depttype).first
  end
end
