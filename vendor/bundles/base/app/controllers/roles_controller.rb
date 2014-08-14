class RolesController < DomainResourcesController
  
  # TODO 아래 제거 할 수 있는 방법 필요 ...
  skip_before_filter :verify_authenticity_token
  
  def update_permissions
    @role = @domain.roles.find(params[:id])
    permissions = JSON.parse(params[:role])
    @role.permissions=(permissions['permissions'])
    @role.save!
    respond_to do |format|
      format.html
      format.xml  { render :xml => {:success => true, :msg => 'Success'} }
      format.json { render :json => {:success => true, :msg => 'Success'} }
    end
  end
  
  #
  # POST domains/:domain_id/roles/:role_id/update_users.json
  #
  def update_users
    @role = @domain.roles.find(params[:id])
    roles = JSON.parse(params[:role])
    @role.roles_users=(roles)
    @role.save!
    respond_to do |format|
      format.html
      format.xml  { render :xml => {:success => true, :msg => 'Success'} }
      format.json { render :json => {:success => true, :msg => 'Success'} }
    end
  end
  
  #
  # GET domains/:domain_id/roles/:role_id/role_users.json
  #
  def role_users
    @role = @domain.roles.find(params[:id])
    roleUsers = @role.users
    @collection = roleUsers.collect { |ru| {:id => ru.id, :login => ru.login, :name => ru.name, :email => ru.email, :dept => ru.dept} }
  end
  
  #
  # GET domains/:domain_id/roles/:role_id/permitted_resources.json
  #
  def permitted_resources
    @role = @domain.roles.find(params[:id])
    resource_type = params[:resource_type]
    
    # SELECT 
    #   menus.*, permissions.resource_type resource_type, permissions.resource_id resource_id, permissions.action_name action_name, permissions.method_name method_name 
    # FROM 
    #   "menus" LEFT OUTER JOIN permissions ON menus.id = permissions.resource_id and permissions.role_id='System-QA' and permissions.resource_type='Menu' 
    #   WHERE (menus.domain_id='System')
    
    resource = resource_type.constantize
    select_fields = "#{resource.table_name}.*, permissions.resource_type resource_type, "
    select_fields << "permissions.resource_id resource_id, permissions.action_name action_name, permissions.method_name method_name"
    joins_str = "LEFT OUTER JOIN permissions ON #{resource.table_name}.id = permissions.resource_id and "
    joins_str << "permissions.role_id='#{@role.id}' and permissions.resource_type='#{resource_type}'"
    order_str = (resource_type == 'Menu') ? "#{resource.table_name}.rank asc" : "#{resource.table_name}.name asc"
    @permissions = resource.select(select_fields).joins(joins_str).where("#{resource.table_name}.domain_id='#{@domain.id}'").order(order_str)
    @total_count = @permissions.size
  end
  
end