class Domain < ActiveRecord::Base
  
  attr_accessible :name, :description, :timezone, :system_flag, :creator_id, :updater_id
  validates_presence_of :name
  validates_uniqueness_of :name, :case_sensitive => false
  
  # HAS_MANY BEGIN BLOCK DON'T REMOVE
  
  stampable
  meaningful_id [:name]
  
  def self.system_domain
    Domain.find_by_system_flag(true) || Domain.first
  end
  
  def clone_roles(from_domain, to_domain)
    from_domain.roles.each do |from_role|
      to_attributes = from_role.attributes
      to_attributes.delete('domain_id')
      to_role = to_domain.roles.create(to_attributes)
      
      #clone_permissions(from_role, to_role)
      #clone_role_users(from_role, to_role)
    end
  end  
  
  def clone_system_domain
    system = Domain.system_domain    
    clone_roles(system, self)
  end
  
  #
  # Pluggable model dinamic loading
  #
  Hatio::PluggableSpot::DOMAIN_MODEL_PLUGGABLES.each do |pluggable_code|
    self.class_eval &pluggable_code
  end
  
end
