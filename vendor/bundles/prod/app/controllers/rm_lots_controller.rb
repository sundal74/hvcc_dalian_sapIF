class RmLotsController < DomainResourcesController
  
  skip_before_filter :verify_authenticity_token
  
  #
  # RmLot
  # GET /domains/:domain_id/rm_lots/:id/rm_lot_track(.:format)
  #
  def rm_lot_track
    rm_lot = RmLot.find(params[:id])
    @rm_lots = rm_lot.rm_bar_mat(params)
    
    respond_to do |format|
      format.xml { render :xml => @rm_lots } 
      format.json { render :json => @rm_lots }
    end
  end
  
end
