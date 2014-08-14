class CreatePmsMasterModel < ActiveRecord::Migration
  def	self.up
    create_table :inf_pms_master_model, :id => :uuid do |t|
      t.references :domain, :null => false
      t.string :routing, :limit => 5
      t.string :p_code, :limit => 3
      t.string :model_no, :limit => 30
      t.string :model_name, :limit => 80
      t.string :prog_id, :limit => 30
      t.string :actdttm, :limit => 17
      t.string :download_yn, :limit => 1
    end
    
		add_index :inf_pms_master_model, [:domain_id, :routing, :p_code, :model_no], :unique => true, :name => :ix_pms_mst_mdl_0
  end

  def self.down
    remove_index :inf_pms_master_model, :name => :ix_pms_mst_mdl_0
    drop_table :inf_pms_master_model
  end
end
