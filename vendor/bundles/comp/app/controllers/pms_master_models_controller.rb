class PmsMasterModelsController < PmsWcController
  
  skip_before_filter :verify_authenticity_token
  
end
