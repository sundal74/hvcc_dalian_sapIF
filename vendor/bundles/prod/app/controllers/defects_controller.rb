class DefectsController < ProdWcController
  
  skip_before_filter :verify_authenticity_token
  
  #
  # GET /domains/:domain_id/defects/defects_by_order
  # order별 불량 정보 리스트를 리턴한다.
  #
  def defects_by_order
    # 1. order의 품목 코드로 부터 Defect 정보를 조회
    @collection = @domain.defects.where("prod_order_id = ?", params[:prod_order_id]).includes(:product, :defect_code)
  end
  
  #
  # GET /domains/:domain_id/defects/new_scrap_bom
  # order의 품목 코드로 부터 BOM 정보를 조회하여 기본 정보를 리턴한다.
  #
  def new_scrap_bom
    prod_order = ProdOrder.find(params[:prod_order_id])
    product = prod_order.product
    @collection = [ {
      :id => '',
      :domain_id => @domain.id,
      :prod_order_id => params[:prod_order_id],
      :parent_yn => 'Y',
      :child_product_id => product.id,
      :child_product => {:id => product.id, :name => product.name},
      :child_product_desc => product.description,
      :unit => '',
      :bom_qty => '',
      :defect_code_id => '',
      :defect_code => {:id => '', :name => ''},
      :defect_qty => '',
      :defect_desc => ''
    } ]
    
    if(prod_order.product.prod_type == 'FERT')
      boms = product.product_parts
      if(boms && !boms.empty?)
        boms.each do |bom|
          if(bom.child_product && bom.child_product.name)
            @collection.push({
              :id => '',
              :domain_id => @domain.id,
              :prod_order_id => params[:prod_order_id],
              :parent_yn => 'N',
              :child_product_id => bom.child_product_id,
              :child_product => {:id => bom.child_product_id, :name => bom.child_product.name},
              :child_product_desc => bom.child_product.description,
              :unit => bom.unit,
              :bom_qty => bom.qty,
              :defect_code_id => '',
              :defect_code => {:id => '', :name => ''},
              :defect_qty => '',
              :defect_desc => ''
            })
          end
        end
      end
    end
    
    respond_to do |format|
      format.xml { render :xml => {:success => true, :total => @collection.size, :items => @collection } } 
      format.json { render :json => {:success => true, :total => @collection.size, :items => @collection } }
    end
  end
  
end
