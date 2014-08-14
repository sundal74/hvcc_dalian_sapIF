  class ProdClosingsController < DomainResourcesController
  
  skip_before_filter :verify_authenticity_token
  
  #
  # POST /domains/:domain_id/prod_closings(.:format)
  #
  def index
    work_date = params['_q']['work_date-eq'] if(!params['_q']['work_date-eq'].blank?)
    wc_name = params['_q']['workcenter.name-eq'] if(!params['_q']['workcenter.name-eq'].blank?)
    work_date = (@domain.shift.current_work_date - 1).strftime('%Y-%m-%d') unless(work_date)
    current_user_id = User.current_user.id
    condStr = (wc_name && wc_name.size > 1) ? " and w.name = '#{wc_name}'" : ""
    
    sql = 
    "select
      pc.id id, '#{work_date}' work_date,
      w.name workcenter, o.id operation_id, o.name operation, 
      o.description operation_desc, ou.manager_id closer_id, ou.manager_name closer_name, 
      pc.closed_flag, pc.closed_at, decode(manager_id, '#{current_user_id}', 'Y', 'N') closable
    from
      operations o
      inner join workcenters w on o.workcenter_id = w.id
      inner join (
        select 
          distinct(operation_id) 
        from 
          prod_orders 
        where 
          order_date = DATE'#{work_date}'
      ) po on po.operation_id = o.id
      left outer join (
        select 
          w.operation_id, w.user_id manager_id, u.name manager_name 
        from 
          operations_users w inner join users u on w.user_id = u.id 
        where 
          manager_flag = 1
      ) ou on o.id = ou.operation_id
      left outer join (
        select 
          id, operation_id, closed_flag, closed_at
        from 
          prod_closings
        where 
          work_date = '#{work_date}'
      ) pc on o.id = pc.operation_id
    where
      o.id is not null #{condStr}
    order by
      w.name, o.name"
    
    @collection = ProdClosing.connection.select_all(sql)
    @total_count = @collection ? @collection.size : 0
  end
  
  #
  # GET /domains/:domain_id/prod_closings/exist(.:format)
  #
  def exist
    work_date = params[:work_date]
    op_id = params[:operation_id]
    count = @domain.prod_closings.where("work_date = ? and operation_id = ?", work_date, op_id).count
    result = { :success => true, :exist => (count > 0) ? true : false }
    respond_to do |format|
      format.xml { render :xml => result } 
      format.json { render :json => result }
    end
  end
  
end
