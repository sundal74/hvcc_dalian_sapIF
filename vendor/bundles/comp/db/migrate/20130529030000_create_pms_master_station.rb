class CreatePmsMasterStation < ActiveRecord::Migration
  def	self.up
    create_table :inf_pms_master_station, :id => :uuid do |t|
      t.references :domain, :null => false
      t.string :routing, :limit => 5
      t.string :equipment, :limit => 64
      t.string :st_no, :limit => 3
      t.string :name, :limit => 80
      t.float :tsfr_alarm_limit, :default => 0.0
      t.boolean :monitor_flg, :default => false
      t.string :prog_id, :limit => 30
      t.string :actdttm, :limit => 17
      t.string :download_yn, :limit => 1
    end
    
		add_index :inf_pms_master_station, [:domain_id, :routing, :st_no], :unique => true, :name => :ix_pms_mst_stn_0
  end

  def self.down
    remove_index :inf_pms_master_station, :name => :ix_pms_mst_stn_0
    drop_table :inf_pms_master_station
  end
end
