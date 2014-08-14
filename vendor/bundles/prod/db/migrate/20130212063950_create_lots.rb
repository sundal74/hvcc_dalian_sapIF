class CreateLots < ActiveRecord::Migration

	def self.up
		create_table :lots, :id => :meaningful do |t|
			t.references :domain, :null => false
			t.string :name, :null => false, :limit => 128
			t.string :description, :limit => 255
			t.string :status, :limit => 20
			t.date :work_date
			t.integer :shift
			t.references :prod_order
			t.references :operation
			t.references :machine
			t.references :product
			t.string :lot_no, :limit => 128
			t.string :serial_no, :limit => 20
			t.string :lot_type, :limit => 10
			t.string :action, :limit => 20
			t.integer :actual_qty, :default => 0
      t.integer :defect_qty, :default => 0
      t.integer :rework_qty, :default => 0
			t.datetime :tran_time
			t.string :inv_status, :limit => 10
			t.integer :inv_qty, :default => 0
      t.datetime :input_time
			t.string :input_op, :limit => 64
			t.integer :track_qty, :default => 0
		end

		add_index :lots, [:domain_id, :name], :unique => true, :name => :ix_lot_0
		add_index :lots, [:prod_order_id], :name => :ix_lot_1
    add_index :lots, [:domain_id, :work_date], :name => :ix_lot_2
    add_index :lots, [:domain_id, :work_date, :shift], :name => :ix_lot_3
    add_index :lots, [:domain_id, :work_date, :shift, :operation_id], :name => :ix_lot_4
    add_index :lots, [:operation_id, :inv_qty, :tran_time], :name => :ix_lot_5
	end

	def self.down
		remove_index :lots, :name => :ix_lot_0
		remove_index :lots, :name => :ix_lot_1
		remove_index :lots, :name => :ix_lot_2
		remove_index :lots, :name => :ix_lot_3
		remove_index :lots, :name => :ix_lot_4
		remove_index :lots, :name => :ix_lot_5
		drop_table :lots
	end
end