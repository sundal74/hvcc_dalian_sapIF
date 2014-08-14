class CreatePmsSpc < ActiveRecord::Migration
  def	self.up
    create_table :inf_pms_spc, :id => :uuid do |t|
      t.string :prd_date, :limit => 8
      t.string :routing, :limit => 5
      t.string :st_no, :limit => 5
      t.string :p_code, :limit => 3
      t.string :item_no, :limit => 50
      t.string :item_name
      t.integer :seq
      t.float :val1
      t.float :val2
      t.float :val3
      t.float :val4
      t.float :val5
      t.float :x_val
      t.float :r_val
      t.string :prog_id, :limit => 30
      t.string :actdttm, :limit => 17
      t.string :upload_yn, :limit => 1
    end
    
		add_index :inf_pms_spc, [:prd_date, :item_no, :p_code], :name => :ix_pms_spc_0
  end

  def self.down
    remove_index :inf_pms_spc, :name => :ix_pms_spc_0
    drop_table :inf_pms_spc
  end
end
