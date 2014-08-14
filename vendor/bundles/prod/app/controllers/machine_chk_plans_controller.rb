class MachineChkPlansController < DomainResourcesController
  
  skip_before_filter :verify_authenticity_token
  
  def index
    if(params[:mode] && params[:mode] == 'calendar')
      # 오늘 기준 달력 초/ 달력 말
      today = Date.today
      # parse_date를 호출하지 않는다. 캘린더에서 YYYY0-MM-DD로 보내준다.
      start_date = params[:startDate] ? params[:startDate] : today.beginning_of_month.beginning_of_week - 1
      end_date = params[:endDate] ? params[:endDate] : today.end_of_month.end_of_week - 1
      params[:_q] ||= {}
      params[:_q]['plan_date-gte'] = start_date.to_s
      params[:_q]['plan_date-lte'] = end_date.to_s
    end
    
    conditions, include_arr, order_str, limit, offset = search_filter resource_class
    @total_count = collection.where(conditions).count
    @collection = collection.includes(include_arr).where(conditions).order(order_str).limit(limit).offset(offset)
  end
  
end
