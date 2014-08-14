class CreatePmsMasterItem < ActiveRecord::Migration
  def	self.up
    create_table :inf_pms_master_item, :id => :uuid do |t|
      t.references :domain, :null => false
      t.string :routing, :limit => 5
      t.string :st_no, :limit => 3
      t.integer :st_seq_no
      t.string :item_no, :limit => 20
      t.string :item_name, :limit => 80
      t.integer :item_order
      t.integer :len
      t.integer :point_under_len
      t.float :x_usl, :default => 0.0
      t.float :x_lsl, :default => 0.0
      t.float :r_usl, :default => 0.0
      t.float :r_lsl, :default => 0.0
      t.boolean :monitor_flg, :limit => 1
      t.string :sqc_flg, :limit => 1
      t.string :tsfr_flg, :limit => 1
      t.string :unit, :limit => 15
      t.string :actdttm, :limit => 17
      t.string :prog_id, :limit => 30
      t.string :download_yn, :limit => 1
    end
    
		add_index :inf_pms_master_item, [:domain_id, :routing, :st_no, :st_seq_no, :item_no], :unique => true, :name => :ix_pms_mst_itm_0
  end

  def self.down
    remove_index :inf_pms_master_item, :name => :ix_pms_mst_itm_0
    drop_table :inf_pms_master_item
  end
end
