class StoresController < DomainResourcesController
  
  skip_before_filter :verify_authenticity_token

  # Store를 공정 창고로 이용할 때 아래 사용 
  def index
    params[:_q] ||= {}
    params[:_q]['inv_flag-eq'] = true
    conditions, include_arr, order_str, limit, offset = search_filter Operation
    @total_count = @domain.operations.where(conditions).count
    @collection = @domain.operations.includes(include_arr).where(conditions).order(order_str).limit(limit).offset(offset)
  end
  
end
