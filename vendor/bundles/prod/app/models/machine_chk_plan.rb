class MachineChkPlan < ActiveRecord::Base

	stampable
	universal_unique_id
	belongs_to :domain
	belongs_to :machine
	belongs_to :inspector, :class_name => "User"
	attr_accessible :name,:description,:machine_id,:status,:plan_date,:due_date,:check_date,:start_time,:end_time,:work_term,:chk_comment,:pm_part,:pm_type,:reporter,:inspector_id,:checker_count,:total_work_term,:upload_flag,:upload_time,:upload_ok_flag,:upload_msg
	attr_accessor :pm_part_codes, :pm_type_codes
  
	before_validation do
    self.status = 'W' if(!self.status || self.status.blank?)
    # work_term, total_work_term 계산
    if(self.end_time && self.start_time)
      self.status = 'T'
      self.work_term = ((self.end_time - self.start_time).to_f / 60.0).to_i
      self.checker_count = 1 if(!self.checker_count || self.checker_count == 0)
      self.total_work_term = self.work_term * self.checker_count
    end
  end
  
  def title
    mc_name = self.machine ? self.machine.name : ''
    state = (self.status == 'W') ? "Plan" : "Actual"
    "#{mc_name} [#{state}]"
  end
  
  def start
    "#{self.plan_date} 00:00:00"
  end
  
  def end
    "#{self.plan_date} 23:59:59"
  end
  
  def cid
    "101"
  end
  
  def ad
    true
  end
  
  def self.get_cid(pm_type, status)
    if(pm_type == '004')
      return status == 'T' ? 1 : 2
    else
      return status == 'T' ? 3 : 4
    end
  end
  
  def pm_part_code
    self.pm_part_codes = self.domain.common_codes.find_by_name('PM_PART').codes unless(self.pm_part_codes)
    pm_part_code = self.pm_part_codes.find { |code| code.name == self.pm_part }
    pm_part_code.description
  end
  
  def pm_type_code
    self.pm_type_codes = self.domain.common_codes.find_by_name('PM_TYPE').codes unless(self.pm_type_codes)
    pm_type_code = self.pm_type_codes.find { |code| code.name == self.pm_type }
    pm_type_code.description
  end
end
