class PmsWcController < DomainResourcesController
  
  # 필드에 operation_id 필드가 있고 workcenter는 없는데 검색 조건에 workcenter가 있는 엔티티가 검색을 위해서 확장한다. 그렇지 않은 경우는 그대로 DomainResourcesController를 사용한다.
  skip_before_filter :verify_authenticity_token
  
  def index
    wc_op_cond = wc_op_filter(params)
    conditions, include_arr, order_str, limit, offset = search_filter resource_class
    
    if(wc_op_cond)
      conditions[0] << wc_op_cond[0]
      conditions.push(wc_op_cond[1])
    end
    
    @total_count = collection.where(conditions).count
    @collection = collection.includes(include_arr).where(conditions).order(order_str).limit(limit).offset(offset)
  end
  
  private
  
  # 
  # workcenter / operation 이 검색 정보로 넘어 왔을 경우 선처리 필터 
  # 1. w/c 와 operation이 동시에 넘어오거나 operation만 넘어오면 skip
  # 2. w/c만 넘어오면 wc로 operation들을 검색을 해서 넘겨줌 
  #
  def wc_op_filter(params)
    p = params[:_q].blank? ? params : params[:_q]
    
    if(p['operation.name-eq'].blank?)
      if(!p['workcenter.name-eq'].blank?)
        return [" and routing in (select name from operations where deleted_at IS NULL and workcenter_id = (select id from workcenters where name = ?))", p.delete('workcenter.name-eq')]
      end
    elsif(!p['operation.name-eq'].blank?)
      p.delete('workcenter.name-eq')
      if(!p['operation.name-eq'].blank?)
        return [" and routing = (select name from operations where deleted_at IS NULL and name = ?)", p.delete('operation.name-eq')]
      end
    end
  end
  
end