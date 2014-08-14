class LossTemplatesController < DomainResourcesController
  
  skip_before_filter :verify_authenticity_token
  
  def import
    spreadsheet = open_spreadsheet(params[:file])
    # header parsing - header는 반드시 1 라인에 있어야 함
    header = spreadsheet.row(1)
    import_data_list = []
    weekday_arr = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    
    (2..spreadsheet.last_row).each do |i|
      row = spreadsheet.row(i)
      
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.empty_not_allowed') + ' - Week Day' if(!row[0] || row[0].empty?)
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.empty_not_allowed') + ' - Start Time' if(!row[1])
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.empty_not_allowed') + ' - End Time' if(!row[2])
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.empty_not_allowed') + ' - Loss Term' unless(row[3])
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.empty_not_allowed') + ' - Loss Code' if(!row[4] || row[4].empty?)
      
      weekday = row[0].strip
      begin
        starttime = row[1].to_i.to_s
        if(starttime.length < 4)
          add_zero_cnt = 4 - starttime.length
          1.upto(add_zero_cnt) { |idx| starttime = "0#{starttime}" }
        end
      rescue ::Exception => e
        raise Hatio::Exception::MisConfigured, (I18n.translate 'error.invalid_data') + ' - Start Time (' + row[1] + ')' unless(weekday_arr.include?(weekday))
      end
      
      begin
        endtime = row[2].to_i.to_s
        if(endtime.length < 4)
          add_zero_cnt = 4 - endtime.length
          1.upto(add_zero_cnt) { |idx| endtime = "0#{endtime}" }
        end
      rescue ::Exception => e
        raise Hatio::Exception::MisConfigured, (I18n.translate 'error.invalid_data') + ' - End Time (' + row[2] + ')' unless(weekday_arr.include?(weekday))
      end
      
      lossterm = row[3]
      losscode = "#{@domain.id}-#{row[4].strip}"
      
      # 존재 하는지 체크 
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.invalid_weekday') + ' - (' + row[0] + ')' unless(weekday_arr.include?(weekday))
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.loss_code_not_exist') + ' - Loss Code (' + row[4] + ')' unless(LossCode.find_by_id(losscode))
      # TODO check validation : start_time, end_time format, lossterm format
      
      row_data = {'week_day' => weekday_arr.index(weekday) + 1, 'start_time' => starttime, 'end_time' => endtime, 'loss_term' => lossterm, 'loss_code_id' => losscode}
      import_data_list.push(row_data)
    end
    
    LossTemplate.transaction do
      import_data_list.each do |import_data|
        lt = @domain.loss_templates.new(import_data)
        lt_cnt = @domain.loss_templates.where("week_day = ? and start_time = ? and end_time = ?", lt.week_day, lt.start_time, lt.end_time).count
        # TODO Validation check 모든 LossTemplate 시간은 겹쳐서는 안된다.
        raise Hatio::Exception::MisConfigured, (I18n.translate 'error.loss_template_already_exist') + " : WeekDay - #{lt.week_day}, StartTime : #{lt.start_time}, EndTime : #{lt.end_time}" if lt_cnt >= 1
        lt.save!
      end unless(import_data_list.empty?)
    end
  end
  
end
