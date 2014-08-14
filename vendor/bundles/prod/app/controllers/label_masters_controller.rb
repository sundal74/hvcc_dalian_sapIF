class LabelMastersController < ProdWcController
  
  skip_before_filter :verify_authenticity_token
  
  def import
    spreadsheet = open_spreadsheet(params[:file])
    # header parsing - header는 반드시 1 라인에 있어야 함
    header = spreadsheet.row(1)
    import_data_list = []
    saved_cnt = 0
    
    # Routing	| Product |	Customer	| Part No. | Part Name | Lot Size
    (2..spreadsheet.last_row).each do |i|
      row = spreadsheet.row(i)
      
      #raise Hatio::Exception::MisConfigured, (I18n.translate 'error.operation_not_exist') if(!row[0] || row[0].empty?)      
      #raise Hatio::Exception::MisConfigured, (I18n.translate 'error.product_not_exist') if(!row[1] || row[1].empty?)
      
      next if(!row[0] || row[0].empty?) 
      next if(!row[1] || row[1].empty?)
      
      routing_cd = "#{@domain.id}-#{row[0].strip}"
      product_cd = "#{@domain.id}-#{row[1].strip}"
      customer_cd = nil
      part_no = row[3].strip if(row[3])
      part_name = row[4]
      lot_size = row[5]
      
      # 존재 하는지 체크 
      routing = Operation.find_by_name(row[0].strip)
      product = Product.find_by_name(row[1].strip)
      
      #raise Hatio::Exception::MisConfigured, (I18n.translate 'error.operation_not_exist') + ' (' + routing_cd + ')' unless(routing)
      #raise Hatio::Exception::MisConfigured, (I18n.translate 'error.product_not_exist') + ' (' + product_cd + ')' unless(product)
      
      next unless(routing)
      next unless(product)
      
      lb = LabelMaster.where("operation_id = ? and product_id = ?", routing_cd, product_cd).first
      
      unless(lb)      
        row_data = {'operation_id' => routing_cd, 'product_id' => product_cd, 'customer_id' => customer_cd, 'part_no' => part_no, 'part_name' => part_name, 'pallet_qty' => lot_size}
        import_data_list.push(row_data)
      end
    end
    
    LabelMaster.transaction do
      import_data_list.each do |import_data|
        lm = @domain.label_masters.new(import_data)
        #lm_cnt = @domain.label_masters.where("operation_id = ? and product_id = ? and customer_id = ?", lm.operation_id, lm.product_id, lm.customer_id).count
        lm.save! #if(lm_cnt == 0)
        saved_cnt += 1
        debug_print saved_cnt
      end unless(import_data_list.empty?)
    end
  end
end
