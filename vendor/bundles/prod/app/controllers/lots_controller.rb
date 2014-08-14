class LotsController < ProdWcController
  
  skip_before_filter :verify_authenticity_token
  
  #
  # Lot - 자재 트래킹 
  # GET /domains/:domain_id/lots/:id/lot_track
  #
  def lot_track
    lot = Lot.find(params[:id])
    @rm_lots = lot.rm_lots
    
    respond_to do |format|
      format.xml { render :xml => @rm_lots } 
      format.json { render :json => @rm_lots }
    end
  end
  
  #
  # Lot - SerialLot 트래킹 
  # GET /domains/:domain_id/lots/:id/serial_track
  #
  def serial_track
    lot = Lot.find(params[:id])
    @serial_lots = lot.serial_lots
    
    respond_to do |format|
      format.xml { render :xml => @serial_lots } 
      format.json { render :json => @serial_lots }
    end
  end
  
end
