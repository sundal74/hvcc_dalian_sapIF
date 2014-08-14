class SpcItemsController < DomainResourcesController
  
  skip_before_filter :verify_authenticity_token
  
  #
  # GET /domains/:domain_id/spc_items/:spc_item_id/spc_values
  #
  def spc_values
    spc_item = SpcItem.find(params[:id])
    from_date = parse_date(params['work_date-gte']) unless params['work_date-gte'].blank?
    to_date = parse_date(params['work_date-lte']) unless params['work_date-lte'].blank?
    to_date = Date.today unless to_date
    from_date = to_date - 14 unless from_date
    spc_values = spc_item.get_values(from_date, to_date)
    xbar_values, rbar_values = [], []
    @results = {:xbar => xbar_values, :rbar => rbar_values, :raws => spc_values}
    
    spc_values.each do |spc_value|
      x = "#{spc_value.work_date_str}-#{spc_value.seq}"
      x_cl = ((spc_value.x_usl + spc_value.x_lsl) / 2.0).round(3)
      r_cl = ((spc_value.r_usl + spc_value.r_lsl) / 2.0).round(3)
      xbar_values.push({:x => x, :y => spc_value.x_val.round(3), :lsl => spc_value.x_lsl.round(3), :usl => spc_value.x_usl.round(3), :cl => x_cl })
      rbar_values.push({:x => x, :y => spc_value.r_val.round(3), :lsl => spc_value.r_lsl.round(3), :usl => spc_value.r_usl.round(3), :cl => r_cl })
    end
    
    if('xls' == params[:format])
      entity = Entity.find_by_name('SpcValue')
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
  
  #
  # POST /domains/:domain_id/spc_items/:spc_item_id/import_spc_values
  #
  def import_spc_values
    spc_item, result = SpcItem.find(params[:id]), {}
    begin
      import_data_list = process_spc_file(params[:id], params[:file])
      SpcValue.transaction do
        if(import_data_list && !import_data_list.empty?)
          import_data_list.each do |import_data|
            # SpcValue.delete_all(["spc_item_id = ? and work_date = ? and seq = ?", import_data[:spc_item_id], import_data[:work_date], import_data[:seq]])
            SpcValue.delete_all(["spc_item_id = ? and work_date = ? and seq = ?", params[:id], import_data[:work_date], import_data[:seq]])
          end
          SpcValue.create(import_data_list)
        end
      end
      results = {:success => true, :msg => 'Success'}
    rescue Exception => e
      results = {:success => false, :msg => e.to_s}
    end
    
    respond_to do |format|
      format.xml { render :xml => results }
      format.json { render :json => results }
    end
  end
  
  #
  # spc file 처리 ....
  #
  def process_spc_file(spc_item_id, file)
    spreadsheet = open_spreadsheet(file)
    # Line 3 Header : [Work Date, Measurement Item, Operation, Operation Desc, Sequence, Value1, Value2, Value3, Value4, Value5]    
    header, operations, import_data_list, exist_list = spreadsheet.row(2), {}, [], []
    
    # 3라인 부터 파싱한다.
    (2..spreadsheet.last_row).each do |i|
      row = spreadsheet.row(i)
      if(i > 2)
        # Real Data [41351.0, CYLINDER_HEIGHT, 6CAKA, Compressor Machine Line, 1.0, 59.56, 59.63, 59.6, 59.62, 59.58]
        spc_value = {}
        work_date, spc_item_name, op_name, spc_seq = (DateTime.new(1899,12,30) + row[0].to_i).to_date, row[1], row[2], row[4]
        
        if(operations.key?(op_name))
          operation = operations[op_name]
        else
          operation = @domain.operations.find_by_name(op_name)
        end
        
        raise Hatio::Exception::ResourceNotFound, (I18n.translate 'error.operation_not_registered') unless operation
        operations[op_name] = operation unless(operations.key?(op_name))
        
        # spc_item_code = "#{spc_item_name}-#{op_name}"
        # spc_item = @domain.spc_items.find_by_code(spc_item_code)
        spc_item = SpcItem.find(spc_item_id)
        # raise Hatio::Exception::ResourceNotFound, (I18n.translate 'error.measurement_item_not_registered') unless spc_item
        # spcValue = SpcValue.select('id').where("spc_item_id = ? and work_date = ? and seq = ?", spc_item.id, work_date, spc_seq)
        # raise Hatio::Exception::ServerError, (I18n.translate 'error.measurement_value_already_exist') if check_cnt > 0
        
        spc_value = {:spc_item_id => spc_item_id, :work_date => work_date, :seq => spc_seq, :x_usl => spc_item.x_usl, :x_lsl => spc_item.x_lsl, :r_usl => spc_item.r_usl, :r_lsl => spc_item.r_lsl }
        5.upto(9) { |idx| spc_value["val#{idx - 4}"] = row[idx] }
        import_data_list.push(spc_value)
      end
    end
  
    return import_data_list
  end
  
  #
  # spreadsheet file open
  #
  def open_spreadsheet(file)
    case File.extname(file.original_filename)
    when ".csv" then Csv.new(file.path, nil, :ignore)
    when ".xls" then Excel.new(file.path, nil, :ignore)
    when ".xlsx" then Excelx.new(file.path, nil, :ignore)
    else raise "Unknown file type: #{file.original_filename}"
    end
  end
  
end