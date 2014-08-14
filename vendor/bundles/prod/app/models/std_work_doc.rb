class StdWorkDoc < ActiveRecord::Base

	stampable
	universal_unique_id
	belongs_to :domain
	belongs_to :operation
	belongs_to :machine
	belongs_to :product
	belongs_to :file_group
  
	attr_accessible :name,:description,:operation_id,:machine_id,:product_id,:doc_type,:file_group_id

  before_save do
    unless self.file_group
      file_group_name = 'StdWorkDoc::' + self.name
      self.file_group = self.domain.file_groups.find_by_name(file_group_name) || self.domain.file_groups.create(:name => file_group_name)
    end
  end
end
