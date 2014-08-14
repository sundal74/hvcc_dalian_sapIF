class CreateInventoryHists < ActiveRecord::Migration

	def self.up
		create_table :inventory_hists, :id => :uuid do |t|
		  t.references :domain, :null => false
			t.references :inventory, :null => false
			t.references :store, :null => false
			t.references :machine, :null => false
			t.references :product, :null => false
			t.integer :inv_qty, :default => 0
			t.integer :qty, :default => 0
			t.string :action_code, :limit => 10
			t.references :lot, :limit => 128
			t.string :lot_type, :limit => 10
			t.references :from_store
			t.references :to_store
			t.string :description, :limit => 4000
			t.userstamps
			t.timestamps
		end

		add_index :inventory_hists, [:inventory_id], :name => :ix_inv_hist_0
		add_index :inventory_hists, [:store_id], :name => :ix_inv_hist_1
		add_index :inventory_hists, [:product_id], :name => :ix_inv_hist_2
		add_index :inventory_hists, [:updated_at], :name => :ix_inv_hist_3
	end

	def self.down
		remove_index :inventory_hists, :name => :ix_inv_hist_0
		remove_index :inventory_hists, :name => :ix_inv_hist_1
		remove_index :inventory_hists, :name => :ix_inv_hist_2
		remove_index :inventory_hists, :name => :ix_inv_hist_3
		drop_table :inventory_hists
	end
end