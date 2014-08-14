class CreateSpcItems < ActiveRecord::Migration

	def self.up
		create_table :spc_items, :id => :uuid do |t|
			t.references :domain, :null => false
			t.string :code, :limit => 128
			t.string :name, :limit => 128
			t.string :description, :limit => 4000
			t.references :operation
			t.float :x_usl
			t.float :x_lsl
			t.float :r_usl
			t.float :r_lsl
			t.userstamps
			t.timestamps
		end

		add_index :spc_items, [:domain_id, :name], :unique => true, :name => :ix_spc_item_0
	end

	def self.down
		remove_index :spc_items, :name => :ix_spc_item_0
		drop_table :spc_items
	end
end