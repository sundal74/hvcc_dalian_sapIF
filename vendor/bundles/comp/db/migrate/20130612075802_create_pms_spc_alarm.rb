class CreatePmsSpcAlarm < ActiveRecord::Migration

	def self.up
		create_table :inf_pms_spc_alarm, :id => :uuid do |t|
			t.references :domain, :limit => 64
			t.string :prd_date, :limit => 8
			t.integer :seq
			t.string :routing, :limit => 5
			t.string :st_no, :limit => 3
			t.string :p_code, :limit => 3
			t.string :item_no, :limit => 20
			t.string :alarm_type, :limit => 10
			t.float :val1, :default => 0.0
			t.float :val2, :default => 0.0
			t.float :val3, :default => 0.0
			t.float :val4, :default => 0.0
			t.float :val5, :default => 0.0
			t.string :actdttm, :limit => 30
		end
		
		add_index :inf_pms_spc_alarm, [:prd_date], :name => :ix_pms_spc_alm_0
		add_index :inf_pms_spc_alarm, [:prd_date, :routing], :name => :ix_pms_spc_alm_1
		add_index :inf_pms_spc_alarm, [:prd_date, :routing, :st_no], :name => :ix_pms_spc_alm_2
		add_index :inf_pms_spc_alarm, [:prd_date, :routing, :st_no, :item_no], :name => :ix_pms_spc_alm_3
	end

	def self.down
    remove_index :inf_pms_spc_alarm, :name => :ix_pms_spc_alm_0
    remove_index :inf_pms_spc_alarm, :name => :ix_pms_spc_alm_1
    remove_index :inf_pms_spc_alarm, :name => :ix_pms_spc_alm_2
    remove_index :inf_pms_spc_alarm, :name => :ix_pms_spc_alm_3
		drop_table :inf_pms_spc_alarm
	end
end