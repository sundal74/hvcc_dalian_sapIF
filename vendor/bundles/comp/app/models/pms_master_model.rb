class PmsMasterModel < ActiveRecord::Base

  set_table_name :inf_pms_master_model
  
  trace_removable
	universal_unique_id
	belongs_to :domain
	attr_accessible :routing,:p_code,:model_no,:model_name,:actdttm,:prog_id,:download_yn

  def updated_at
    return nil unless(self.actdttm)
    t = Time.strptime(self.actdttm, '%Y%m%d%H%M%S')
    return t
  end
  
end
