class WorkerTime < ActiveRecord::Base

  universal_unique_id
  belongs_to :domain
	belongs_to :prod_order
	belongs_to :user
	belongs_to :operation
	belongs_to :machine
	belongs_to :product
	attr_accessible :work_date,:shift,:prod_order_id,:user_id,:operation_id,:machine_id,:product_id,:start_time,:end_time,:work_term,:loss_term
  
  before_save do
    if(self.prod_order)
      self.domain = self.prod_order.domain
      self.work_date = self.prod_order.order_date unless self.work_date
      self.shift = self.prod_order.shift unless self.shift
      self.operation_id = self.prod_order.operation_id unless self.operation_id
      self.machine_id = self.prod_order.machine_id unless self.machine_id
      self.product_id = self.prod_order.product_id unless self.product_id
    end
    
    if(self.start_time && self.end_time)
      self.work_term = self.diff_min(self.start_time, self.end_time)
      # begin
      #   self.loss_term = self.calc_loss_term
      # rescue Exception => e
      #   debug_print e
      # end
    end
  end
  
  #
  # 작업 시작 시간과 작업 완료 시간 사이의 loss_term을 구한다.
  #
  def calc_loss_term
    ststr = self.start_time.localtime.to_date.strftime("%Y-%m-%d")
    etstr = self.end_time.localtime.to_date.strftime("%Y-%m-%d")
    
    # start_time과 end_time 날짜가 같은 경우 
    if(ststr == etstr)
      return self.get_loss_term(self.start_time.localtime.to_date, self.start_time.localtime, self.end_time.localtime)
    # start_time과 end_time 날짜가 다른 경우 
    else
      new_et_str = self.end_time.localtime.strftime("%Y-%m-%d")
      new_et = Time.strptime("#{new_et_str} 0000", "%Y-%m-%d %H%M")
      loss_term = self.get_loss_term(self.start_time.localtime.to_date, self.start_time.localtime, new_et.localtime)
      loss_term += self.get_loss_term(self.end_time.localtime.to_date, new_et.localtime, self.end_time.localtime)
      return loss_term
    end    
  end
  
  #
  # work_start_time, work_end_time 으로 부터 LossTemplate 정보로 부터 loss_term을 계산 
  #
  def get_loss_term(loss_date, starttime, endtime)
    # start_time, end_time 사이에 공통 무작업 템플릿에 존재하는 무작업시간을 loss_term에 시간 추가 ...
    today, lossterm = loss_date, 0
    wday = today.wday
    today_str, starttime_str, endtime_str = today.strftime('%Y-%m-%d'), starttime.strftime('%Y-%m-%d %H%M'), endtime.strftime('%Y-%m-%d %H%M')
    
    sql = "SELECT 
    	start_time, end_time
    FROM 
    	LOSS_TEMPLATES 
    WHERE 
    	WEEK_DAY = #{wday + 1} AND 
    	(
    		( 
    			TO_DATE(('#{today_str}' || ' ' || start_time), 'YYYY-MM-DD HH24MI') >= TO_DATE('#{starttime_str}', 'YYYY-MM-DD HH24MI') AND
    			TO_DATE(('#{today_str}' || ' ' || end_time), 'YYYY-MM-DD HH24MI') <= TO_DATE('#{endtime_str}', 'YYYY-MM-DD HH24MI') 
    		)

    		OR

    		(
    			TO_DATE(('#{today_str}' || ' ' || start_time), 'YYYY-MM-DD HH24MI') <= TO_DATE('#{starttime_str}', 'YYYY-MM-DD HH24MI') AND 
    			TO_DATE(('#{today_str}' || ' ' || end_time), 'YYYY-MM-DD HH24MI') >= TO_DATE('#{endtime_str}', 'YYYY-MM-DD HH24MI')
    		)

    		OR

    		(
    			TO_DATE('#{starttime_str}', 'YYYY-MM-DD HH24MI')
    			between TO_DATE(('#{today_str}' || ' ' || start_time), 'YYYY-MM-DD HH24MI') AND
    			TO_DATE(('#{today_str}' || ' ' || end_time), 'YYYY-MM-DD HH24MI')
    		)

    		OR

    		(
    			TO_DATE('#{endtime_str}', 'YYYY-MM-DD HH24MI')
    			between TO_DATE(('#{today_str}' || ' ' || start_time), 'YYYY-MM-DD HH24MI') AND 
    			TO_DATE(('#{today_str}' || ' ' || end_time), 'YYYY-MM-DD HH24MI')
    		)
    	)"
    
    results = WorkerTime.connection.select_all(sql)
    results.each do |result|
      st_str, et_str = result['start_time'], result['end_time']
      next if(!st_str || !et_str)
      
      lst = Time.strptime("#{today_str} #{st_str}", "%Y-%m-%d %H%M")
      let = Time.strptime("#{today_str} #{et_str}", "%Y-%m-%d %H%M")
      
      # Case 1 : start_time, end_time이 무작업 시간을 포함하는 경우 : loss_term = loss_end_time - loss_start_time
      if(starttime <= lst && endtime >= let)
        lossterm += self.diff_min(lst, let)
      # Case 2 : start_time, end_time이 무작업 시간 사이에 있는 경우 : loss_term = end_time - start_time
      elsif(starttime >= lst && endtime <= let)
        lossterm += self.diff_min(starttime, endtime)
      # Case 3 : start_time이 무작업 시작 시간과 무작업 완료 시간 사이에 있는 경우 : loss_term = loss_end_time - start_time
      elsif(starttime >= lst && starttime <= let)
        lossterm += self.diff_min(starttime, let)
      # Case 4 : end_time이 무작업 시작 시간과 무작업 완료 시간 사이에 있는 경우 : loss_term = end_time - loss_start_time
      elsif(endtime >= lst && endtime <= let)
        lossterm += self.diff_min(lst, endtime)
      end
    end
    
    return lossterm
  end
  
  #
  # totime과 fromtime 시간 차를 분 단위로 계산 
  #
  def diff_min(fromtime, totime)
    return 0 if(!fromtime || !totime)
    return ((totime - fromtime).to_f / 60.to_f).to_i
  end
  
end
