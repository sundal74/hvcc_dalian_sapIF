class CreatePmsMasterError < ActiveRecord::Migration
  def	self.up
    create_table :inf_pms_master_error, :id => :uuid do |t|
      t.references :domain, :null => false
      t.string :routing, :limit => 5
      t.string :st_no, :limit => 3
      t.string :err_code, :limit => 4
      t.string :err_name, :limit => 80
      t.string :err_type, :limit => 20
      t.string :actdttm, :limit => 17
      t.string :prog_id, :limit => 30
      t.string :download_yn, :limit => 1
    end
    
		add_index :inf_pms_master_error, [:domain_id, :routing, :st_no, :err_code], :unique => true, :name => :ix_pms_mst_err_0
  end

  def self.down
    remove_index :inf_pms_master_error, :name => :ix_pms_mst_err_0
    drop_table :inf_pms_master_error
  end
end
