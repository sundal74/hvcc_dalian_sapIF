class CreateSumOee < ActiveRecord::Migration

	def self.up
		create_table :sum_oee, :id => :uuid do |t|
			t.references :domain, :null => false
			t.date :work_date
			t.references :operation
			t.references :machine
      t.float :machine_ct, :default => 0.0
      t.float :machine_runtime, :default => 0.0
      t.float :valid_runtime, :default => 0.0
      t.integer :actual_qty, :default => 0
      t.integer :defect_qty, :default => 0
      t.integer :prod_qty, :default => 0
			t.float :availability, :default => 0.0
			t.float :perf_eff, :default => 0.0
			t.float :quality, :default => 0.0
			t.float :oee_value, :default => 0.0
		end

		add_index :sum_oee, [:domain_id, :work_date, :operation_id, :machine_id], :unique => true, :name => :ix_sum_oee_0
		add_index :sum_oee, [:domain_id, :work_date], :name => :ix_sum_oee_1
		add_index :sum_oee, [:domain_id, :work_date, :operation_id], :name => :ix_sum_oee_2
		
	end

	def self.down
		remove_index :sum_oee, :name => :ix_sum_oee_0
		remove_index :sum_oee, :name => :ix_sum_oee_1
		remove_index :sum_oee, :name => :ix_sum_oee_2
		drop_table :sum_oee
	end
end