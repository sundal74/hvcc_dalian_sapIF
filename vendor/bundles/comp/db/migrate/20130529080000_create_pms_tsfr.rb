class CreatePmsTsfr < ActiveRecord::Migration
  def	self.up
    create_table :inf_pms_tsfr, :id => false do |t|
      t.string :prd_date, :limit => 8
      t.string :shift, :limit => 1
      t.string :routing, :limit => 5
      t.string :st_no, :limit => 3
      t.string :p_code, :limit => 3
      t.integer :total
      t.integer :first
      t.integer :reject
      t.string :prog_id, :limit => 30
      t.string :actdttm, :limit => 17
      t.string :upload_yn, :limit => 1
    end
    
		add_index :inf_pms_tsfr, [:prd_date, :shift, :routing, :st_no, :p_code], :unique => true, :name => :ix_pms_tsfr_0
		add_index :inf_pms_tsfr, [:prd_date], :name => :ix_pms_tsfr_1
		add_index :inf_pms_tsfr, [:routing], :name => :ix_pms_tsfr_2
		add_index :inf_pms_tsfr, [:st_no], :name => :ix_pms_tsfr_3
		add_index :inf_pms_tsfr, [:p_code], :name => :ix_pms_tsfr_4
  end

  def self.down
    remove_index :inf_pms_tsfr, :name => :ix_pms_tsfr_0
    remove_index :inf_pms_tsfr, :name => :ix_pms_tsfr_1
    remove_index :inf_pms_tsfr, :name => :ix_pms_tsfr_2
    remove_index :inf_pms_tsfr, :name => :ix_pms_tsfr_3
    remove_index :inf_pms_tsfr, :name => :ix_pms_tsfr_4
    drop_table :inf_pms_tsfr
  end
end
