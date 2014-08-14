class CreateLabelPlans < ActiveRecord::Migration

	def self.up
		create_table :label_plans, :id => :uuid do |t|
			t.references :domain, :null => false
			t.date :order_date
			t.integer :shift
			t.references :operation
			t.references :product
			t.references :customer
			t.integer :order_qty, :default => 0
			t.integer :lot_qty, :default => 0
			t.integer :print_qty, :default => 0
			t.integer :printed_qty, :default => 0
			t.boolean :completed_flag
			t.boolean :reprinted_flag
			t.userstamps
			t.timestamps
		end

		add_index :label_plans, [:domain_id, :order_date], :name => :ix_label_plan_0
		add_index :label_plans, [:domain_id, :order_date, :shift], :name => :ix_label_plan_1
		add_index :label_plans, [:domain_id, :order_date, :shift, :operation_id], :name => :ix_label_plan_2
	end

	def self.down
		remove_index :label_plans, :name => :ix_label_plan_0
		remove_index :label_plans, :name => :ix_label_plan_1
		remove_index :label_plans, :name => :ix_label_plan_2
		drop_table :label_plans
	end
end