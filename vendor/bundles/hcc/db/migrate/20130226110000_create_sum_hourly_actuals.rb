class CreateSumHourlyActuals < ActiveRecord::Migration

	def self.up
		create_table :sum_hourly_actuals, :id => :uuid do |t|
			t.references :domain, :null => false
			t.date :work_date
			t.integer :shift
			t.references :prod_order
			t.references :operation
			t.references :machine
			t.references :product
			t.integer :actual_hour
			t.integer :actual_min
			t.datetime :last_actual_time
			t.integer :order_qty, :default => 0
			t.integer :actual_qty, :default => 0
			t.integer :defect_qty, :default => 0
		end

		add_index :sum_hourly_actuals, [:domain_id, :work_date, :shift, :prod_order_id, :operation_id, :machine_id, :product_id, :actual_hour], :name => :ix_sum_hour_actual_0
		add_index :sum_hourly_actuals, [:domain_id, :work_date, :actual_hour], :name => :ix_sum_hour_actual_1
		add_index :sum_hourly_actuals, [:domain_id, :work_date, :operation_id, :actual_hour], :name => :ix_sum_hour_actual_2
		add_index :sum_hourly_actuals, [:domain_id, :work_date, :operation_id, :machine_id, :actual_hour], :name => :ix_sum_hour_actual_3
	end

	def self.down
		remove_index :sum_hourly_actuals, :name => :ix_sum_hour_actual_0
    remove_index :sum_hourly_actuals, :name => :ix_sum_hour_actual_1
    remove_index :sum_hourly_actuals, :name => :ix_sum_hour_actual_2
    remove_index :sum_hourly_actuals, :name => :ix_sum_hour_actual_3
		drop_table :sum_hourly_actuals
	end
end