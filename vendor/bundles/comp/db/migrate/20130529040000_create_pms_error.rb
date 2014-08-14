class CreatePmsError < ActiveRecord::Migration
  def	self.up
    create_table :inf_pms_error, :id => false do |t|
      t.string :prd_date, :limit => 8
      t.string :shift, :limit => 1
      t.string :routing, :limit => 5
      t.string :st_no, :limit => 3
      t.string :err_code, :limit => 4
      t.integer :err_cnt
      t.string :prog_id, :limit => 30
      t.string :actdttm, :limit => 17
      t.string :upload_yn, :limit => 1
    end
    
		add_index :inf_pms_error, [:prd_date, :shift, :routing, :st_no, :err_code], :unique => true, :name => :ix_pms_err_0
		add_index :inf_pms_error, [:prd_date, :routing, :err_code], :name => :ix_pms_err_1
  end

  def self.down
    remove_index :inf_pms_error, :name => :ix_pms_err_0
    remove_index :inf_pms_error, :name => :ix_pms_err_1
    drop_table :inf_pms_error
  end
end
