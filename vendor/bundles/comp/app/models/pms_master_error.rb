class PmsMasterError < ActiveRecord::Base

  set_table_name :inf_pms_master_error
  
  trace_removable
	universal_unique_id
	belongs_to :domain
	attr_accessible :routing,:st_no,:err_code,:err_name,:err_type,:actdttm,:prog_id,:download_yn

  def updated_at
    return nil unless(self.actdttm)
    t = Time.strptime(self.actdttm, '%Y%m%d%H%M%S')
    return t
  end
  
end
