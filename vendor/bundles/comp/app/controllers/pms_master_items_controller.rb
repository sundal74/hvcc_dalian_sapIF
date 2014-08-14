class PmsMasterItemsController < PmsWcController
  
  skip_before_filter :verify_authenticity_token
  
  #
  # GET /domains/:domain_id/pms_master_items/spc_values
  #
  def spc_values
    item_no = params['item_no-eq']
    p_code = params['p_code-eq']
    item_master = @domain.pms_master_items.where("item_no = ?", item_no).first
    
    to_date = parse_date(params['work_date-eq']) unless params['work_date-eq'].blank?
    to_date = Date.today unless to_date
    from_date = to_date - 30 unless from_date

    spc_values = item_master.get_values(item_no, p_code, from_date.strftime('%Y%m%d'), to_date.strftime('%Y%m%d'))
    xbar_values, rbar_values = [], []
    @results = {:xbar => xbar_values, :rbar => rbar_values, :raws => spc_values}
    
    spc_values.each do |spc_value|
      x = "#{spc_value.prd_date}-#{spc_value.seq}"
      x_cl = ((item_master.x_usl + item_master.x_lsl) / 2.0).round(3)
      r_cl = ((item_master.r_usl + item_master.r_lsl) / 2.0).round(3)
      #spc_value.x_val = spc_value.calc_avg if(spc_value.x_val == 0)
      #spc_value.r_val = spc_value.calc_dev if(spc_value.r_val == 0)
      xbar_values.push({:x => x, :y => spc_value.x_val.round(3), :lsl => item_master.x_lsl.round(3), :usl => item_master.x_usl.round(3), :cl => x_cl })
      rbar_values.push({:x => x, :y => spc_value.r_val.round(3), :lsl => item_master.r_lsl.round(3), :usl => item_master.r_usl.round(3), :cl => r_cl })
    end

    if('xls' == params[:format])
      entity = Entity.find_by_name('PmsMasterItem')
      @import_columns = EntityColumn.where("entity_id = ? and list_rank > 0 and name not in ('creator_id', 'updater_id', 'created_at', 'updated_at')", entity.id).order("list_rank asc")
      @results = spc_values
    end
        
    respond_to do |format|
      format.html
      format.xml { render :xml => @results }
      format.json { render :json => @results }
      format.xls
    end
  end
  
end
