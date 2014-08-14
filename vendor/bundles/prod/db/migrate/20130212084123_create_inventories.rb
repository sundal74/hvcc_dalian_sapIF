class CreateInventories < ActiveRecord::Migration

	def self.up
		create_table :inventories, :id => :uuid do |t|
			t.references :domain, :null => false
			t.references :store, :null => false
			t.references :product, :null => false
			t.integer :qty, :default => 0
		end

		add_index :inventories, [:domain_id, :store_id, :product_id], :unique => true, :name => :ix_inv_0
	end

	def self.down
		remove_index :inventories, :name => :ix_inv_0
		drop_table :inventories
	end
end