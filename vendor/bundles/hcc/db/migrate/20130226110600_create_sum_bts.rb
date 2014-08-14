class CreateSumBts < ActiveRecord::Migration

	def self.up
		create_table :sum_bts, :id => :uuid do |t|
			t.references :domain, :null => false
			t.date :work_date
			t.integer :shift
			t.references :operation
			t.references :machine
			t.references :product
			t.integer :plan_qty, :default => 0
      t.integer :actual_qty, :default => 0
      t.integer :plan_below_qty, :default => 0
      t.integer :plan_achv_qty, :default => 0
      t.integer :plan_act_lower_qty, :default => 0
      t.integer :plan_act_gap_qty, :default => 0
		  t.float :vol_perf, :default => 0.0
      t.float :mix_perf, :default => 0.0
      t.float :seq_perf, :default => 0.0
			t.float :bts_value, :default => 0.0
		end

    add_index :sum_bts, [:domain_id, :work_date, :shift, :operation_id, :machine_id, :product_id], :unique => true, :name => :ix_sum_bts_0
		add_index :sum_bts, [:domain_id, :work_date], :name => :ix_sum_bts_1
		add_index :sum_bts, [:domain_id, :work_date, :operation_id], :name => :ix_sum_bts_2
		add_index :sum_bts, [:domain_id, :work_date, :operation_id, :machine_id], :name => :ix_sum_bts_3
	end

	def self.down
		remove_index :sum_bts, :name => :ix_sum_bts_0
		remove_index :sum_bts, :name => :ix_sum_bts_1
		remove_index :sum_bts, :name => :ix_sum_bts_2
	  remove_index :sum_bts, :name => :ix_sum_bts_3
		drop_table :sum_bts
	end
end