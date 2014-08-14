class ProdParamsController < ProdWcController
  
  skip_before_filter :verify_authenticity_token
  
  def import
    spreadsheet = open_spreadsheet(params[:file])
    # header parsing - header는 반드시 1 라인에 있어야 함
    header = spreadsheet.row(1)
    import_data_list = []
    
    (2..spreadsheet.last_row).each do |i|
      row = spreadsheet.row(i)
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.empty_not_allowed') + ' - Routing' if(!row[0] || row[0].empty?)
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.empty_not_allowed') + ' - Machine' if(!row[1])
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.empty_not_allowed') + ' - Product' if(!row[2] || row[2].empty?)
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.empty_not_allowed') + ' - Target UPH' unless(row[4])
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.empty_not_allowed') + ' - Cycletime' unless(row[5])
      
      mc_id = row[1]
      if(mc_id.class.name == 'Float')
        mc_id = mc_id.to_i.to_s 
      elsif(mc_id.class.name == 'Fixnum')
        mc_id = mc_id.to_s 
      end
      mc_id = "#{@domain.id}-#{mc_id}"
      op_id = "#{@domain.id}-#{row[0]}"
      prod_id = "#{@domain.id}-#{row[2]}"
      loc = row[3]
      uph = row[4]
      ct = row[5]
      
      # pd = Product.find_by_id(prod_id)
      # unless(pd)
      #   pd = @domain.products.new
      #   pd.name = row[2]
      #   pd.prod_type = 'FERT'
      #   pd.default_qty = 0
      #   pd.save
      # end
      
      # 존재 하는지 체크 
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.operation_not_exist') + ' - Routing (' + row[0] + ')' unless(Operation.find_by_id(op_id))
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.machine_not_exist') + ' - Equipment (' + mc_id + ')' unless(Machine.find_by_id(mc_id))
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.product_not_exist') + ' - Product (' + row[2] + ')' unless(Product.find_by_id(prod_id))
      
      row_data = {'operation_id' => op_id, 'machine_id' => mc_id, 'product_id' => prod_id, 'location' => loc, 'target_uph' => uph, 'cycletime' => ct}
      import_data_list.push(row_data)
    end
    
    ProdParam.transaction do
      import_data_list.each do |import_data|
        prod_param = @domain.prod_params.where("operation_id = ? and machine_id = ? and product_id = ?", import_data['operation_id'], import_data['machine_id'], import_data['product_id']).first
        prod_param = @domain.prod_params.new(import_data) unless(prod_param)
        #raise Hatio::Exception::MisConfigured, (I18n.translate 'error.prod_param_already_exist') + " : Routing - #{prod_param.operation.name}, Equipment : #{prod_param.machine.name}, Product : #{prod_param.product.name}" if prod_param_cnt >= 1
        prod_param.save!
      end unless(import_data_list.empty?)
    end
  end
  
end
