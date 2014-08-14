class DiyServicesController < DomainResourcesController
  skip_before_filter :verify_authenticity_token  
  
  public
  
    # POST domains/:domain_id/diy_services/update_multiple.json
    def update_multiple
      delete_list, update_list, create_list = self.refine_multiple_data(params[:multiple_data])
      # 1. delete
      self.destroy_multiple_data(DiyService, delete_list)
      # 2. update
      self.update_multiple_data(DiyService, update_list, 'id', ['service_in_params', 'service_out_params'], {})
      # 3. create
      self.create_multiple_data(DiyService, create_list, true, 'id', ['service_in_params', 'service_out_params'], {})
    end
    
    # POST domains/:domain_id/diy_services/:diy_service_id/update_multiple_parameters
    def update_multiple_parameters
      @diyService = DiyService.find(params[:id])
      parameterType = params[:type]
      parameterResource = (parameterType == 'in') ? ServiceInParam : ServiceOutParam
      self.update_parameters(@diyService, parameterResource)
      @service_params = (parameterType == 'in') ? @diyService.service_in_params : @diyService.service_out_params
    end
    
    def update_parameters(diyService, parameterResource)
      delete_list, update_list, create_list = self.refine_multiple_data(params[:multiple_data])
      # 1. delete
      self.destroy_multiple_data(parameterResource, delete_list)
      # 2. update
      self.update_multiple_data(parameterResource, update_list, 'id', [], {})
      # 3. create
      self.create_multiple_data(parameterResource, create_list, true, 'id', [], {})
    end
    
    # GET /domains/domain_id/diy_services/1/query
    # GET /domains/domain_id/diy_services/1/query.json
    def query    
      execute
      
      respond_to do |format|
        format.html { render :layout => true, :status => @error_status_code ? @error_status_code : "200" }
        format.xml { render :xml => @result_list } 
        format.json { render :json => @result_list }
        format.xls
      end
    end
    
    # POST /domains/domain_id/diy_services/1/shoot
    # POST /domains/domain_id/diy_services/1/shoot.json
    def shoot    
      execute
      
      respond_to do |format|
        format.html { render :layout => true, :status => @error_status_code ? @error_status_code : "200" }
        format.xml { render :xml => @result_list } 
        format.json { render :json => @result_list }
        format.xls
      end
    end

    private

    def execute
      
      @diy_service = @domain.diy_services.find_by_name(params[:id])
      if !@diy_service
        raise Hatio::Exception::ResourceNotFound, "No matching DiyService record named '#{params[:id]}'"
      end
      
      raise Hatio::Exception::ServerError, "Service '#{params[:id]} not activated!" if(!@diy_service.active_flag && params[:test].blank?)

      @error_message, @error_status_code, @result_count = nil, nil, 0
      params[:input] ||= params
      params[:input][:domain_id] = params[:domain_id] if params[:input][:domain_id].blank?
      
      # if @diy_service.show_params_flag
      #   @script, @result_list = @diy_service.execute_service(params[:input])
      #   @script = @diy_service.service_logic unless @script
      #   @parameters_info = params
      # else
        @result_list = @diy_service.execute_service(params[:input])
      # end
      
      # raise Hatio::Exception::ServerError, 'Result type must be array' unless(@result_list.instance_of? Array)
      # 
      # @result_list.each do |result|
      #   raise Hatio::Exception::ServerError, 'member_of_result_type_must_be_hash' unless(result.instance_of? Hash)
      # end if(@result_list && !@result_list.empty?)
    end
end
