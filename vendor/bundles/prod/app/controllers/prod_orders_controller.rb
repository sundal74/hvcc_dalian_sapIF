class ProdOrdersController < DomainResourcesController
  
  skip_before_filter :verify_authenticity_token
  
  # include ProdOrdersHelper    
end
