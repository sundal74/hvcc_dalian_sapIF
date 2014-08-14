class CreateRmLots < ActiveRecord::Migration

	def self.up
		create_table :rm_lots, :id => :uuid do |t|
			t.references :domain, :null => false
			t.string :name, :limit => 128
			t.references :operation
			t.string :part_no, :limit => 64
			t.string :lot_no, :limit => 64
			t.string :serial_no, :limit => 16
			t.string :supplier_code, :limit => 64
			t.string :invoice_no, :limit => 64
			t.date :print_date
			t.integer :in_qty, :default => 0
			t.integer :out_qty, :default => 0
			t.integer :inv_qty, :default => 0
			t.datetime :inv_in_time
			t.datetime :inv_out_time
		end

    add_index :rm_lots, [:domain_id, :name], :name => :ix_rm_lot_0
		add_index :rm_lots, [:domain_id, :operation_id], :name => :ix_rm_lot_1
		add_index :rm_lots, [:inv_in_time], :name => :ix_rm_lot_2
		add_index :rm_lots, [:lot_no, :serial_no, :supplier_code, :part_no], :name => :ix_rm_lot_3
	end

	def self.down
		remove_index :rm_lots, :name => :ix_rm_lot_0
		remove_index :rm_lots, :name => :ix_rm_lot_1
		remove_index :rm_lots, :name => :ix_rm_lot_2
		remove_index :rm_lots, :name => :ix_rm_lot_3
		drop_table :rm_lots
	end
end