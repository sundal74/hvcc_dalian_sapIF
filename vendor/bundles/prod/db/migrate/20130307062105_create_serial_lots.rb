class CreateSerialLots < ActiveRecord::Migration

	def self.up
		create_table :serial_lots, :id => :meaningful do |t|
			t.references :domain, :null => false
			t.string :name, :limit => 128
			t.date :work_date
			t.integer :shift
			t.string :serial_no, :limit => 16
			t.references :prod_order
			t.references :operation
			t.references :machine
			t.references :product
			t.references :lot, :limit => 128
			t.datetime :scan_time
			t.boolean :confirm_flag
		end

    add_index :serial_lots, [:domain_id, :name], :unique => true, :name => :ix_srl_lot_0
		add_index :serial_lots, [:product_id], :name => :ix_srl_lot_1
    add_index :serial_lots, [:work_date], :name => :ix_srl_lot_2
		add_index :serial_lots, [:scan_time], :name => :ix_srl_lot_3
		add_index :serial_lots, [:lot_id], :name => :ix_srl_lot_4
	end

	def self.down
		remove_index :serial_lots, :name => :ix_srl_lot_0
		remove_index :serial_lots, :name => :ix_srl_lot_1
		remove_index :serial_lots, :name => :ix_srl_lot_2
		remove_index :serial_lots, :name => :ix_srl_lot_3
		remove_index :serial_lots, :name => :ix_srl_lot_4
		drop_table :serial_lots
	end
end