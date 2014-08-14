class DefectCodesController < DomainResourcesController
  
  skip_before_filter :verify_authenticity_token
  
  def index
    conditions, include_arr, order_str, limit, offset = search_filter resource_class
    order_str = 'name asc' if(!order_str || order_str.empty?)
    @total_count = collection.where(conditions).count
    @collection = collection.includes(include_arr).where(conditions).order(order_str).limit(limit).offset(offset)
  end
  
  #
  # operation에 매핑된 defect_code list 조회 
  # GET /domains/domain_id/defects_codes/list_by_operation?operation_id = 
  #
  def list_by_operation
    page, limit, offset = find_pagination_info
    @total_count = OperationsDefects.where("operation_id = ?", params[:operation_id]).count
    @collection = OperationsDefects.includes(:defect_code).where("operation_id = ?", params[:operation_id]).order("defect_code_id asc").limit(limit).offset(offset)
  end
  
  #
  # operation에 매핑된 defect_code list 조회 
  # GET /domains/domain_id/defects_codes/list_by_operation?operation_id = 
  #
  def operation_defect_codes
    @collection = OperationsDefects.includes(:defect_code).where("operation_id = ?", params[:operation_id]).order("defect_code_id asc")
  end
  
  #
  # operation에 defect_code 추가 혹은 삭제 
  # POST /domains/domain_id/defects_codes/add_by_operation?operation_id = 
  #
  def add_by_operation
    modified_defects = ActiveSupport::JSON.decode(params[:modified_defects])
    removed_defects = ActiveSupport::JSON.decode(params[:removed_defects])
    operation_id = params[:operation_id]

    OperationsDefects.transaction do
      modified_defects.each do |modified_defect|
        count = OperationsDefects.where("operation_id = ? and defect_code_id = ?", operation_id, modified_defect['defect_code_id']).count
        if(count == 0)
          op_defect = OperationsDefects.new({:operation_id => operation_id, :defect_code_id => modified_defect['defect_code_id']})
          op_defect.save!
        end
      end

      removed_defects.each do |removed_defect|
        removed_defect = OperationsDefects.delete_all(["operation_id = ? and defect_code_id = ?", operation_id, removed_defect['defect_code_id']])
      end
    end

    @result = {"success" => true, "message" => "Success"}
    respond_to do |format|
      format.xml { render :xml => @result } 
      format.json { render :json => @result }
    end
  end
  
  #
  # operations defect code import
  #
  def op_defect_import
    spreadsheet = open_spreadsheet(params[:file])
    # header parsing - header는 반드시 1 라인에 있어야 함
    header = spreadsheet.row(1)
    import_data_list = []
    
    # Routing | Defect Code
    (2..spreadsheet.last_row).each do |i|
      row = spreadsheet.row(i)
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.empty_not_allowed') + ' - Routing' if(!row[0] || row[0].empty?)
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.empty_not_allowed') + ' - Scrap Code' if(!row[1] || row[1].empty?)
      
      opId = "#{@domain.id}-#{row[0].strip}"
      defectCodeId = "#{@domain.id}-#{row[1].strip}"
      
      # 존재 하는지 체크 
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.operation_not_exist') + ' - Routing (' + row[0] + ')' unless(Operation.find_by_id(opId))
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.defect_code_not_exist') + ' - Scrap Code (' + row[1] + ')' unless(DefectCode.find_by_id(defectCodeId))
      
      row_data = {'operation_id' => opId, 'defect_code_id' => defectCodeId}
      import_data_list.push(row_data)
    end
    
    OperationsDefects.transaction do
      import_data_list.each do |import_data|
        op_defect = OperationsDefects.new(import_data)
        op_defect_cnt = OperationsDefects.where("operation_id = ? and defect_code_id = ?", op_defect.operation_id, op_defect.defect_code_id).count
        begin
          op_defect.save! if(op_defect_cnt == 0)
        rescue ::Exception => e
          debug_print "Duplicated : #{op_defect.operation_id}, #{op_defect.defect_code_id}"
        end
      end unless(import_data_list.empty?)
    end
    
    @result = {"success" => true, "message" => "Success"}
    respond_to do |format|
      format.xml { render :xml => @result } 
      format.json { render :json => @result }
    end
  end
  
end
