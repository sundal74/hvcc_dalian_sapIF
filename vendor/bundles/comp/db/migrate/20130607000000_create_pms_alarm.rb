class CreatePmsAlarm < ActiveRecord::Migration
  def	self.up
    create_table :inf_pms_alarm, :id => :uuid do |t|
      t.string :alarm_type, :limit => 2
      t.string :prd_date, :limit => 8
      t.string :shift, :limit => 1
      t.string :routing, :limit => 5
      t.string :st_no, :limit => 3
      t.string :p_code, :limit => 3
      t.integer :total
      t.integer :first
      t.integer :reject
      t.string :err_code, :limit => 4
      t.integer :err_cnt, :default => 0
      t.string :int_no, :limit => 12
      t.string :srl_no, :limit => 4
      t.string :comments, :limit => 100
      t.string :prog_id, :limit => 30
      t.string :actdttm, :limit => 17
      t.string :upload_yn, :limit => 1
    end
    
		add_index :inf_pms_alarm, [:prd_date], :name => :ix_pms_alm_0
		add_index :inf_pms_alarm, [:prd_date, :alarm_type], :name => :ix_pms_alm_1
  end

  def self.down
    remove_index :inf_pms_alarm, :name => :ix_pms_alm_0
    remove_index :inf_pms_alarm, :name => :ix_pms_alm_1
    drop_table :inf_pms_alarm
  end
end
