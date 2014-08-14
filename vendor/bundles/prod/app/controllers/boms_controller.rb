class BomsController < DomainResourcesController
  
  skip_before_filter :verify_authenticity_token
  
  def index

    parent_product_id = params[:_q]['parent_product_id-eq'] unless params[:_q]['parent_product_id-eq'].blank?
    
    if(parent_product_id)
      sql = <<-EOS
      select 
        a.id id, a.product_id product_id, a.product_name product_name, a.product_desc product_desc, ap.name child_product_name, ap.description child_product_desc, a.bom_type bom_type, a.unit unit, a.qty qty
      from
        (
          SELECT 
            pp.id, p.id product_id, p.name product_name, p.description product_desc, pp.child_product_id, pp.qty, pp.unit, pp.bom_type 
          FROM 
            products p left outer join product_parts pp on p.id = pp.parent_product_id 
          where 
            p.prod_type = 'FERT' and p.id = '#{parent_product_id}'
        ) a left outer join products ap on a.child_product_id = ap.id
      order by product_id, child_product_id
      EOS
    else
      sql = <<-EOS
      select 
        a.id id, a.product_id product_id, a.product_name product_name, a.product_desc product_desc, ap.name child_product_name, ap.description child_product_desc, a.bom_type bom_type, a.unit unit, a.qty qty
      from
        (
          SELECT 
            pp.id, p.id product_id, p.name product_name, p.description product_desc, pp.child_product_id, pp.qty, pp.unit, pp.bom_type 
          FROM 
            products p left outer join product_parts pp on p.id = pp.parent_product_id 
          where 
            p.prod_type = 'FERT'
        ) a left outer join products ap on a.child_product_id = ap.id
      order by product_id, child_product_id
      EOS
    end
    
    @collection = ProductPart.connection.select_all(sql)      
    @total_count = @collection.size
    
    respond_to do |format|
      format.xml { render :xml => @collection } 
      format.json { render :json => @collection }
      format.xls
    end
  end
  
  #
  # TODO Check
  #
  def show
    product_id = params[:product_id]
    sql = <<-EOS
    select 
      a.id id, a.product_id product_id, a.product_name product_name, a.product_desc product_desc, ap.name child_product_name, ap.description child_product_desc, a.bom_type bom_type, a.unit unit, a.qty qty
    from
      (
        SELECT 
          pp.id, p.id product_id, p.name product_name, p.description product_desc, pp.child_product_id, pp.qty, pp.unit, pp.bom_type 
        FROM 
          products p left outer join product_parts pp on p.id = pp.parent_product_id 
        where 
          p.prod_type = 'FERT' and
          pp.parent_product_id = '#{product_id}'
      ) a left outer join products ap on a.child_product_id = ap.id
    order by product_id, child_product_id
    EOS
    
    @boms = ProductPart.connection.select_all(sql)      
    @total_count = @boms.size
    
    respond_to do |format|
      format.xml { render :xml => @boms } 
      format.json { render :json => @boms }
      format.xls
    end
  end
  
  def create
		# id, product_id ==> parent_product_id, child_product_id, bom_type, unit, qty
    data = params[:bom]
    data[:parent_product_id] = data.delete(:product_id)
    data = filter_useless(data, [:product_name, :product_desc, :child_product_name, :child_product_desc])
    @product_part = domain.product_parts.new(data)
    
    respond_to do |format|
      if @product_part.save
        format.json { render :json => @product_part }
        format.xml  { render :xml => @product_part }
      else
        format.json { render json: @product_part.errors, status: :unprocessable_entity }
        format.xml  { render :xml => @product_part }
      end
    end
  end
  
  def update
    # id, product_id ==> parent_product_id, child_product_id, bom_type, unit, qty
    @product_part = ProductPart.find(params[:id])
    data = params[:bom]
    data[:parent_product_id] = data.delete(:product_id)
    data = filter_useless(data, [:id, :product_name, :product_desc, :child_product_name, :child_product_desc])
    
    respond_to do |format|
      if @product_part.update_attributes(data)
        format.json { render :json => @product_part }
        format.xml  { render :xml => @product_part }
      else
        format.json { render json: @product_part.errors, status: :unprocessable_entity }
        format.xml  { render :xml => @product_part }
      end
    end
  end
  
  def destroy
    @product_part = ProductPart.find(params[:id])
    @product_part.destroy
    
    respond_to do |format|
      format.xml  { render :xml => @product_part }
      format.json { render :json => @product_part }
    end
  end
  
  def update_multiple
    delete_list, update_list, create_list = self.refine_multiple_data(params[:multiple_data])
    # 1. delete
    self.destroy_multiple_data(ProductPart, delete_list)
    # 2. update
    update_list = filter_arr_useless(update_list, [:product_name, :product_desc, :child_product_name, :child_product_desc])
    self.update_multiple_data(ProductPart, update_list, 'id', [], {})
    # 3. create
    create_list = filter_arr_useless(create_list, [:id, :product_name, :product_desc, :child_product_name, :child_product_desc])
    self.create_multiple_data(ProductPart, create_list, true, 'id', [], {})
  end
  
  def import
    spreadsheet = open_spreadsheet(params[:file])
    # header parsing - header는 반드시 1 라인에 있어야 함
    header = spreadsheet.row(1)
    import_data_list = []
    
    # Product | Child Product | Unit | Qty
    (2..spreadsheet.last_row).each do |i|
      row = spreadsheet.row(i)
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.empty_not_allowed') + ' - Product ' if(!row[0] || row[0].empty?)
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.empty_not_allowed') + ' - Child Product' if(!row[1] || row[1].empty?)
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.empty_not_allowed') + ' - Unit' if(!row[2] || row[2].empty?)
      raise Hatio::Exception::MisConfigured, (I18n.translate 'error.empty_not_allowed') + ' - Qty' unless(row[3])
      
      if((!row[0] || row[0].empty?) || (!row[1] || row[1].empty?))
        debug_print "skip : #{i} line - #{row[0]}, #{row[1]}"
        next
      end
      
      parent_prod = "#{@domain.id}-#{row[0].strip}"
      child_prod = "#{@domain.id}-#{row[1].strip}"
      unit = row[2].strip if row[2]
      lot_size = row[3]
      unit = 'EA' unless unit
      
      # 존재 하는지 체크 
      #raise Hatio::Exception::MisConfigured, (I18n.translate 'error.product_not_exist') + ' - (' + row[0] + ')' unless(Product.find_by_id(parent_prod))
      #raise Hatio::Exception::MisConfigured, (I18n.translate 'error.child_product_not_exist') + ' - (' + child_prod + ')' unless(Product.find_by_id(child_prod))
      
      unless(Product.find_by_id(parent_prod))
        debug_print "skip : #{i} line - product : [#{parent_prod}]"
        next
      end
      
      unless(Product.find_by_id(child_prod))
        debug_print "skip : #{i} line - child product : [#{child_prod}]"
        next
      end
        
      row_data = {'parent_product_id' => parent_prod, 'child_product_id' => child_prod, 'unit' => unit, 'qty' => lot_size}
      import_data_list.push(row_data)
    end
    
    ProductPart.transaction do
      import_data_list.each do |import_data|
        prod_part = @domain.product_parts.new(import_data)
        prod_part_cnt = @domain.product_parts.where("parent_product_id = ? and child_product_id = ?", prod_part.parent_product_id, prod_part.child_product_id).count
        prod_part.save! if(prod_part_cnt == 0)
      end unless(import_data_list.empty?)
    end
  end
  
  private 
  
  def filter_useless(data, useless_field_arr)
    useless_field_arr.each do |useless_field|
      data.delete(useless_field)
    end
    data
  end
  
  def filter_arr_useless(data_arr, useless_field_arr)
    data_arr.each do |data|
      useless_field_arr.each do |useless_field|
        data.delete(useless_field.to_s)
      end
    end
    data_arr
  end
    
end
