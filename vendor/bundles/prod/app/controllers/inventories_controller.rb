class InventoriesController < DomainResourcesController
  
  skip_before_filter :verify_authenticity_token
  
  #
  # POST /domains/:domain_id/inventories(.:format)
  #
  # def index
  #   conditions, include_arr, order_str, limit, offset = search_filter resource_class
  #   cond_str = "inventories.store_id = o.id and inventories.product_id = p.id"
  #   joins_str = ", prod_params pp inner join operations o on pp.operation_id = o.id inner join machines m on pp.machine_id = m.id inner join products p on pp.product_id = p.id"
  #   
  #   if(!params['_q']['store.name-eq'].blank?)
  #     store_name = params['_q']['store.name-eq']
  #     cond_str << " and o.name = '#{store_name}'"
  #   end
  #     
  #   if(!params['_q']['product.name-eq'].blank?)
  #     prod_name = params['_q']['product.name-eq']
  #     cond_str << " and p.name = '#{prod_name}'"
  #   end
  #     
  #   @total_count = collection.joins(joins_str).where(cond_str).count
  #   @collection = collection.
  #   select("inventories.id, inventories.domain_id, o.id store_id, o.name store_name, o.description store_desc, m.id machine_id, m.name machine_name, m.description machine_desc, p.id product_id, p.name product_name, p.description product_desc, inventories.qty").
  #   joins(joins_str).
  #   where(cond_str).order(order_str).limit(limit).offset(offset)
  # end

  #
  # POST /domains/:domain_id/inventories/:id/transfer(.:format)
  #
  def transfer
    inv = @domain.inventories.find(params[:id])
    inv.inv_transfer(params[:tran_store_id], params[:modify_qty])    
    result_data = {:success => true, :message => "Success"}
    
    respond_to do |format|
      format.xml { render :xml => result_data } 
      format.json { render :json => result_data }
      format.xls
    end
  end
  
  #
  # POST /domains/:domain_id/inventories/:id/update(.:format)
  #
  def update
    inv = @domain.inventories.find(params[:id])
    add_qty = params[:add_qty].to_i
    inv.inv_reconcile(add_qty, params[:reason])
    result_data = {:success => true, :message => "Success"}
    
    respond_to do |format|
      format.xml { render :xml => result_data } 
      format.json { render :json => result_data }
      format.xls
    end
  end
  
end
