class ProdPlansController < DomainResourcesController
  
  skip_before_filter :verify_authenticity_token
  
  include ProdPlansHelper
  
  def index
    @collection = search_plans
    
    respond_to do |format|
      format.xml { render :xml => @collection } 
      format.json { render :json => @collection }
      format.xls
    end
  end
  
  def import
    all_headers, plan_data = import_plan(@domain, params[:file])
    @collection = {:success => true, :items => plan_data, :headers => all_headers}
        
    respond_to do |format|
      format.xml { render :xml => @collection } 
      format.json { render :json => @collection }
      format.xls
    end
  end
  
  def import_validate
  end
  
  def update_multiple
    update_plans
    
    respond_to do |format|
      format.xml { render :xml => {:success => true, :message => 'Success'} } 
      format.json { render :json => {:success => true, :message => 'Success'} }
      format.xls
    end
  end
  
  #
  # post domains/:domain_id/prod_plans/generate_order
  #
  def generate_order
    generate_order_by_plans(request.remote_ip)
    result_data = {:success => true, :message => "Success"}
    
    respond_to do |format|
      format.xml { render :xml => result_data } 
      format.json { render :json => result_data }
      format.xls
    end
  end
  
  private 
  
  #
  # spreadsheet
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
