class RawMaterialsController < DomainResourcesController
  
  skip_before_filter :verify_authenticity_token
    
end
