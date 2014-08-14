class CreateLotsRms < ActiveRecord::Migration
  def	self.up
    create_table :lots_rms, :id => false do |t|
      t.references :lot, :null => false, :limit => 128
      t.references :rm_lot, :null => false
      t.integer :use_qty
    end

    add_index :lots_rms, [:lot_id, :rm_lot_id], :name => :ix_lot_rm_0, :unique => true
  end

  def self.down
    remove_index :lots_rms, :name => :ix_lot_rm_0
    drop_table :lots_rms
  end
end