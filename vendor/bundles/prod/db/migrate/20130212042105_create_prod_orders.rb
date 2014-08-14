class CreateProdOrders < ActiveRecord::Migration

	def self.up
		create_table :prod_orders, :id => :uuid do |t|
			t.references :domain, :null => false
			t.string :name, :limit => 64
			t.date :order_date
			t.integer :shift
			t.references :workcenter
			t.references :operation
			t.references :machine
			t.references :product
			t.references :customer
			t.string :status, :limit => 20
			t.integer :order_seq
			t.boolean :main_op_flag
			t.boolean :main_machine_flag
			t.float :uph, :default => 0.0
			t.float :cycletime, :default => 0.0
			t.integer :order_qty, :default => 0
			t.integer :pallet_qty, :default => 0
			t.integer :actual_qty, :default => 0
			t.integer :defect_qty, :default => 0
			t.integer :rework_qty, :default => 0
			t.datetime :actual_start_time
			t.datetime :actual_end_time
			t.integer :worker_count
			t.integer :worktime
			t.boolean :upload_flag, :default => false
			t.userstamps
			t.timestamps
		end

    add_index :prod_orders, [:domain_id, :order_date], :name => :ix_prd_order_0
		add_index :prod_orders, [:domain_id, :order_date, :shift], :name => :ix_prd_order_1
		add_index :prod_orders, [:domain_id, :order_date, :shift, :operation_id], :name => :ix_prd_order_2
		add_index :prod_orders, [:domain_id, :order_date, :shift, :operation_id, :machine_id], :name => :ix_prd_order_3
	end

	def self.down
		remove_index :prod_orders, :name => :ix_prd_order_0
		remove_index :prod_orders, :name => :ix_prd_order_1
		remove_index :prod_orders, :name => :ix_prd_order_2
		remove_index :prod_orders, :name => :ix_prd_order_3
		drop_table :prod_orders
	end
end