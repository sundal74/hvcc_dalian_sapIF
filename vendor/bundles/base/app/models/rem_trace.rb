class RemTrace < ActiveRecord::Base
  
  stampable
  universal_unique_id
  belongs_to :domain
  attr_accessible :entity_type, :entity_id, :rem_content
      
end