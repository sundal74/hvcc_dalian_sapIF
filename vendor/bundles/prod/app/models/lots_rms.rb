class LotsRms < ActiveRecord::Base
    set_table_name :lots_rms
    
    attr_accessible :lot_id,:rm_lot_id,:use_qty
end
