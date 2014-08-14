class CreateProducts < ActiveRecord::Migration

	def  self.up
		create_table :products, :id => :meaningful do |t|
			t.references :domain, :null => false
			t.string :name, :null => false, :limit => 64
			t.string :description, :limit => 255
			t.string :prod_type, :limit => 20
			t.string :unit, :limit => 20
			t.integer :default_qty, :default => 0
			t.string :pack_type, :limit => 10
			t.string :short_name, :limit => 20
			t.string :model_no, :limit => 10
			t.string :cust_code, :limit => 20
			t.string :cust_part_no, :limit => 20
			t.string :cust_part_name, :limit => 40
			t.datetime :deleted_at
			t.userstamps
			t.timestamps
		end

		add_index :products, [:domain_id, :name], :unique => true, :name => :ix_prd_0
		add_index :products, [:domain_id, :prod_type], :name => :ix_prd_1
	end

	def  self.down
		remove_index :products, :name => :ix_prd_0
		remove_index :products, :name => :ix_prd_1
		drop_table :products
	end
end