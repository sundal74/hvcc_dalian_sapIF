class CreateProdPlans < ActiveRecord::Migration

	def self.up
		create_table :prod_plans, :id => :uuid do |t|
			t.references :domain, :null => false
			t.date :plan_date
			t.references :workcenter
			t.references :operation
			t.references :product
			t.references :customer
			t.integer :shift1_plan_qty, :default => 0
			t.integer :shift1_seq, :default => 999
			t.integer :shift2_plan_qty, :default => 0
			t.integer :shift2_seq, :default => 999
			t.integer :shift3_plan_qty, :default => 0
			t.integer :shift3_seq, :default => 999
			t.integer :total_plan_qty, :default => 0
			t.userstamps
			t.timestamps
		end

		add_index :prod_plans, [:domain_id, :plan_date, :workcenter_id, :operation_id, :product_id, :customer_id], :unique => true, :name => :ix_prd_plan_0
	end

	def self.down
		remove_index :prod_plans, :name => :ix_prd_plan_0
		drop_table :prod_plans
	end
end