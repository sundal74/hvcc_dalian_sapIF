class CreatePmsOutr < ActiveRecord::Migration
  def	self.up
    create_table :inf_pms_outr, :id => false do |t|
      t.string :prd_date, :limit => 8
      t.string :shift, :limit => 1
      t.string :routing, :limit => 5
      t.string :st_no, :limit => 3
      t.string :int_no, :limit => 15
      t.string :p_code, :limit => 3
      t.integer :actual
      t.string :prog_id, :limit => 30
      t.string :actdttm, :limit => 17
      t.string :upload_yn, :limit => 1
    end
    
		add_index :inf_pms_outr, [:prd_date], :name => :ix_pms_outr_0
		add_index :inf_pms_outr, [:prd_date, :routing], :name => :ix_pms_outr_1
		add_index :inf_pms_outr, [:int_no], :name => :ix_pms_outr_2
  end

  def self.down
    remove_index :inf_pms_outr, :name => :ix_pms_outr_0
    remove_index :inf_pms_outr, :name => :ix_pms_outr_1
    remove_index :inf_pms_outr, :name => :ix_pms_outr_2
    drop_table :inf_pms_outr
  end
end
