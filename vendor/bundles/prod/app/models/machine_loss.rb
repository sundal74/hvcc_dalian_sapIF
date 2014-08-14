class MachineLoss < ActiveRecord::Base

	stampable
	universal_unique_id
	belongs_to :domain
	belongs_to :workcenter
	belongs_to :operation
	belongs_to :machine
	belongs_to :product
	belongs_to :prod_order
	belongs_to :reporter, :class_name => "User"
	belongs_to :maintainer, :class_name => "User"
	belongs_to :loss_code
	attr_accessible :work_date,:shift,:workcenter_id,:operation_id,:machine_id,:material_id,:prod_order_id,:status,:reporter_id,:maintainer_id,:loss_code_id,:breakdown_code,:event_time,:maint_start_time,:maint_end_time,:loss_term,:maint_term,:reporter_comment,:maint_comment,:line_stop_flag,:maintainer_count, :order_no, :notice_no, :print_flag, :notice_flag, :upload_flag, :upload_time
	
	before_validation do
	  self.status = '1' if (self.id.blank? && self.status.blank?)
	  self.print_flag = false if (self.print_flag.nil?)
	  self.notice_flag = false if (self.notice_flag.nil?)
	  self.upload_flag = false if (self.upload_flag.nil?)
	  self.status = '2' if (!self.maint_end_time.nil? || !self.maint_end_time.blank?)
	  
    if(self.prod_order_id && !self.prod_order_id.blank?)
      self.work_date = self.prod_order.order_date unless(self.work_date)
      self.shift = self.prod_order.shift unless(self.shift)
      self.workcenter_id = self.prod_order.workcenter_id if(!self.workcenter_id || self.workcenter_id.blank?)
      self.operation_id = self.prod_order.operation_id if(!self.operation_id || self.operation_id.blank?)
      self.machine_id = self.prod_order.machine_id if(!self.machine_id || self.machine_id.blank?)
      self.product_id = self.prod_order.product_id if(!self.product_id || self.product_id.blank?)
    end
    
    self.workcenter_id = self.operation.workcenter_id if((!self.workcenter_id || self.workcenter_id.empty?) && self.operation)
    
    if(self.status == '1' && !self.event_time) 
      self.event_time = Time.now
    end
    
    if(self.maint_start_time && self.maint_end_time)
      self.maint_term = ((self.maint_end_time - self.maint_start_time).to_f / 60.0).to_i
    end
    
    if(self.event_time && self.maint_end_time)
      self.loss_term = ((self.maint_end_time - self.event_time).to_f / 60.0).to_i
    end
  end
  
  def elapsed_time
    if(self.status == '1' && self.event_time)
      return ((Time.now - self.event_time) / 60).to_i
    elsif(self.status == '2' && self.event_time && self.maint_end_time)
      return self.maint_end_time ? ((self.maint_end_time - self.event_time) / 60).to_i : -1
    end
  end

end
