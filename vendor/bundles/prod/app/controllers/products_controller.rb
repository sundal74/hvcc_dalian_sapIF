class ProductsController < DomainResourcesController
  
  skip_before_filter :verify_authenticity_token
  
  def child_products
    # 자품목, 기준수량, 단위, BOM 유형 
    @product = @domain.products.find_by_id(params[:id])
    @boms = @domain.product_parts.find(:all, :conditions => {:parent_product_id => @product.id})
    @total_count = @boms.size
  end
  
end
