if RUBY_PLATFORM =~ /java/
  require 'java'
  java_import 'java.lang.System'
end

class ShiftsController < ApplicationController
  
  before_filter :authenticate_user!
  skip_before_filter :verify_authenticity_token
  respond_to :html, :xml, :json, :xls
  
  # GET /shifts/1
  def show
    @shift = Shift.find_by_domain_id(params[:id])
    unless @shift
      data = {:domain_id => @domain.id, :total_shift => 2, :workdays_per_week => 7, :workhours_per_day => 24, :shift1_start => '08:00', :shift1_end => '21:00', :shift2_start => '21:00', :shift2_end => '08:00' }
      @shift = Shift.new(data)
      @shift.save
    end
  end

  # PUT /shifts/1
  def update
    @shift = Shift.find(params[:id])
    @shift.update_attributes(params[:shift], :without_protection => true)
  end
  
  # DELETE /shifts/1
  def destroy
    @shift = Shift.find(params[:id])
    @shift.destroy
  end
  
  # POST /shifts
  def create
    @shift = Shift.new(params[:shift])
    @shift.save
  end
  
  def gc
    if RUBY_PLATFORM =~ /java/
      System.gc()
      debug_print "Full GC Executed!"
    end
    
    respond_to do |format|
      format.json { render :json => {:success => true, :msg => :success} }
      format.xml { render :xml => {:success => true, :msg => :success} }
    end
  end  
end
