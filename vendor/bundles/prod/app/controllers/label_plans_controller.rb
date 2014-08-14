class LabelPlansController < ProdWcController
  
  skip_before_filter :verify_authenticity_token
  
  #
  # POST /domains/:domain_id/label_plans/list_print_info
  #
  def list_print_info
    # {"multiple_data"=>"[\"System-2b6603a8-8739-11e2-9b54-002608fffe0f\"]", "action"=>"list_print_info", "controller"=>"label_plans", "domain_id"=>"System", "format"=>"json"}    
    @collection = []
    label_plan_id_list = JSON.parse(params[:multiple_data])
    label_plan_id_list.each do |label_plan_id|
      label_plan = LabelPlan.find(label_plan_id)
      results = label_plan.create_print_commands(label_plan.lot_qty, label_plan.print_qty)
      results.each_with_index { |result, idx| @collection.push({:id => label_plan.id, :seq => (idx + 1), :print_command => result}) }
    end
    
    respond_to do |format|
      format.xml { render :xml => @collection } 
      format.json { render :json => @collection }
    end
  end
  
  #
  # GET /domains/:domain_id/label_plans/:id/get_print_info
  #
  def get_print_info
    label_plan, @collection = LabelPlan.find(params[:id]), []
    results = label_plan.create_print_commands(label_plan.lot_qty, label_plan.print_qty)
    results.each_with_index { |result, idx| @collection.push({:id => label_plan.id, :seq => (idx + 1), :print_command => result}) }
    
    respond_to do |format|
      format.xml { render :xml => @collection } 
      format.json { render :json => @collection }
    end
  end
  
  #
  # POST /domains/:domain_id/label_plans/:id/reprint
  #
  def reprint
    label_plan, @collection = LabelPlan.find(params[:id]), []
    to_print_qty = params[:to_print_qty].blank? ? 0 : params[:to_print_qty].to_i
    to_lot_qty = params[:to_lot_qty].blank? ? 0 : params[:to_lot_qty].to_i
    results = label_plan.create_print_commands(to_lot_qty, to_print_qty)
    results.each_with_index { |result, idx| @collection.push({:id => label_plan.id, :seq => (idx + 1), :print_command => result}) }
    
    respond_to do |format|
      format.xml { render :xml => @collection }
      format.json { render :json => @collection }
    end
  end
  
  #
  # POST /domains/:domain_id/label_plans/:id/update_print_count
  #
  def update_print_count
    success, msg = true, "Success"
    
    unless(params[:printed_qty].blank?)
      label_plan = LabelPlan.find(params[:id])
      issued_qty = params[:printed_qty].to_i
      label_plan.printed_qty ||= 0
      label_plan.printed_qty += issued_qty
      label_plan.completed_flag = (label_plan.print_qty == label_plan.printed_qty)
      label_plan.save!
    else
      success, msg = false, "Parameter printed_qty value is empty!"
    end
    
    respond_to do |format|
      format.xml { render :xml => {:success => success, :msg => msg} } 
      format.json { render :json => {:success => success, :msg => msg} } 
    end
  end
  
  #
  # 날짜에 해당하는 label 계획을 생성한다.
  # POST /domains/:domain_id/label_plans/create_daily_plan
  #
  def create_daily_plan
    success, msg, work_date = true, "Success", params[:work_date]
    
    respond_to do |format|
      format.xml { render :xml => {:success => success, :msg => msg} } 
      format.json { render :json => {:success => success, :msg => msg} } 
    end
  end
    
end
