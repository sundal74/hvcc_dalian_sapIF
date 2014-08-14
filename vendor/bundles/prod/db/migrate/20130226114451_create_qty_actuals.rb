class CreateQtyActuals < ActiveRecord::Migration

	def self.up
		create_table :qty_actuals, :id => :uuid do |t|
			t.references :domain, :null => false
			t.date :work_date
			t.integer :shift
			t.references :operation
			t.references :machine
			t.references :product
			t.references :customer
			t.references :prod_order
			t.integer :actual_qty, :default => 0
			t.integer :defect_qty, :default => 0
			t.integer :rework_qty, :default => 0
			t.string :description, :limit => 4000
			t.userstamps
			t.timestamps
		end

    add_index :qty_actuals, [:domain_id, :work_date], :name => :ix_qty_actual_0
    add_index :qty_actuals, [:domain_id, :work_date, :shift], :name => :ix_qty_actual_1
    add_index :qty_actuals, [:domain_id, :work_date, :shift, :operation_id], :name => :ix_qty_actual_2
		add_index :qty_actuals, [:domain_id, :work_date, :shift, :operation_id, :machine_id], :name => :ix_qty_actual_3
		add_index :qty_actuals, [:prod_order_id], :name => :ix_qty_actual_4
	end

	def self.down
		remove_index :qty_actuals, :name => :ix_qty_actual_0
		remove_index :qty_actuals, :name => :ix_qty_actual_1
		remove_index :qty_actuals, :name => :ix_qty_actual_2
		remove_index :qty_actuals, :name => :ix_qty_actual_3
		remove_index :qty_actuals, :name => :ix_qty_actual_4
		drop_table :qty_actuals
	end
end