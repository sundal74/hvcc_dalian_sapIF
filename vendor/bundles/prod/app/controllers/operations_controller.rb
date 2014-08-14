class OperationsController < DomainResourcesController
  
  skip_before_filter :verify_authenticity_token
  
  def index
    if(params['operator_id-like'] && !params['operator_id-like'].blank?)
      page, limit, offset = find_pagination_info
      conditions = ["operations.id in (select operation_id from operations_users where user_id like ?)", "%#{params['operator_id-like']}%"]
      @total_count = collection.where(conditions).count
      @collection = collection.includes(:updater, :creator, :workcenter).where(conditions).order("operations.workcenter_id asc, operations.name asc")
    else
      conditions, include_arr, order_str, limit, offset = search_filter Operation
      @total_count = collection.where(conditions).count
      order_str = "workcenter_id asc, name asc" if(!order_str || order_str.blank?)
      @collection = collection.includes(include_arr).where(conditions).order(order_str).limit(limit).offset(offset)
    end
    
    respond_to do |format|
      format.html
      format.xml { render :xml => @collection }
      format.json { render 'index' }
    end
  end
  
  #
  # operation에 매핑된 operator list 조회 
  # GET /domains/domain_id/operations/list_operator?operation_id = 
  #
  def list_operator
    check_required_param(params, 'operation_id')

    sql = 
    "select 
      u.id user_id, u.name user_name, ou.manager_flag, c.description prod_dept
    from 
      operations o
      inner join operations_users ou on o.id = ou.operation_id
      inner join users u on ou.user_id = u.id
      left outer join (
        select name, description from common_codes where parent_id = (
          select id from common_codes where name = 'PROD_DEPT' and parent_id is null
        )
      ) c
      on u.dept = c.name
    where
      o.id = '#{params[:operation_id]}'
    order by
      ou.manager_flag desc, u.id"
      
    workers = OperationsUsers.connection.select_all(sql)
    @results = []
    workers.each do |worker|
      next if(!worker || !worker['user_id'])
      @results.push({
        :user => {:id => worker['user_id'], :name => worker['user_name']},
        :prod_dept => worker['prod_dept'],
        :manager_flag => worker['manager_flag']
      })
    end

    @results
    
    respond_to do |format|
      format.xml { render :xml => @results }
      format.json { render :json => @results }
    end
  end
  
  #
  # POST /domains/domain_id/operations/move_operator?operation_id = 
  #
  def move_operator
    check_required_params(params, ['from_operation_id', 'to_operation_id', 'user_id'])
    
    from_op_id = params[:from_operation_id]
    to_op_id = params[:to_operation_id]
    operator_id = params[:user_id]
    manager_flag = false
    
    count = OperationsUsers.where("operation_id = ? and user_id = ?", to_op_id, operator_id).count
    if(count == 0)
      worker = OperationsUsers.new({:operation_id => to_op_id, :user_id => operator_id, :manager_flag => manager_flag})
      worker.save!
      OperationsUsers.delete_all(["operation_id = ? and user_id = ?", from_op_id, operator_id])
      @results = {"success" => true, "message" => "Success"}
    else
      @results = {"success" => false, "message" => "Operator [#{operator_id}] already exist at routing [#{Operation.find(to_op_id).name}]"}
    end
    
    respond_to do |format|
      format.xml { render :xml => @results }
      format.json { render :json => @results }
    end
  end
  
  #
  # POST /domains/domain_id/operations/save_operators?operation_id = 
  #
  def save_operators
    check_required_params(params, ['modified_users', 'removed_users', 'operation_id'])

    mod_users = ActiveSupport::JSON.decode(params[:modified_users])
    rem_users = ActiveSupport::JSON.decode(params[:removed_users])
    op_id = params[:operation_id]

    mod_users.each do |mod_user|
      mod_op_id = (mod_user['operation_id'] && !mod_user['operation_id'].blank?) ? mod_user['operation_id'] : op_id
      mod_user_id = mod_user['user_id']
      mod_manager_flag = mod_user['manager_flag']
      mf = mod_manager_flag ? 1 : 0
      worker = OperationsUsers.where("operation_id = ? and user_id = ?", mod_op_id, mod_user_id).first
      if(worker)
        OperationsUsers.connection.execute("update operations_users set manager_flag = #{mf} where operation_id = '#{mod_op_id}' and user_id = '#{mod_user_id}'")
      else
        worker = OperationsUsers.new({:operation_id => mod_op_id, :user_id => mod_user_id, :manager_flag => mf})
        worker.save!
      end
    end

    rem_users.each do |rem_user|
      rem_op_id = (rem_user['operation_id'] && !rem_user['operation_id'].blank?) ? rem_user['operation_id'] : op_id
      OperationsUsers.delete_all(["operation_id = ? and user_id = ?", rem_op_id, rem_user['user_id']])
    end

    @results = {"success" => true, "message" => "Success"}
    respond_to do |format|
      format.xml { render :xml => @results }
      format.json { render :json => @results }
    end
  end
  
  #
  # operations workers import
  #
  def op_workers_import
    spreadsheet = open_spreadsheet(params[:file])
    # header parsing - header는 반드시 1 라인에 있어야 함
    header = spreadsheet.row(1)
    import_data_list = []
    
    # Routing | Operator Id | Operator Name
    (2..spreadsheet.last_row).each do |i|
      row = spreadsheet.row(i)
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.empty_not_allowed') + ' - Routing' if(!row[0] || row[0].empty?)
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.empty_not_allowed') + ' - Operator Id' if(!row[1] || row[1].empty?)
      
      opId = "#{@domain.id}-#{row[0].strip}"
      operatorId = row[1].strip.downcase
      
      # 존재 하는지 체크 
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.routing_not_exist') + ' - Routing (' + row[0] + ')' unless(Operation.find_by_id(opId))
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.user_not_exist') + ' - Operator Id (' + row[1] + ')' unless(User.find_by_id(operatorId))
      
      row_data = {'operation_id' => opId, 'user_id' => operatorId}
      import_data_list.push(row_data)
    end
    
    OperationsUsers.transaction do
      import_data_list.each do |import_data|
        op_user = OperationsUsers.new(import_data)
        op_user_cnt = OperationsUsers.where("operation_id = ? and user_id = ?", op_user.operation_id, op_user.user_id).count
        begin
          op_user.save! if(op_user_cnt == 0)
        rescue ::Exception => e
          debug_print "Duplicated : #{op_user.operation_id}, #{op_user.user_id}"
        end
      end unless(import_data_list.empty?)
    end    
  end
  
end
