class CreateSuppliers < ActiveRecord::Migration

	def  self.up
		create_table :suppliers, :id => :meaningful do |t|
			t.references :domain, :null => false
			t.string :name, :null => false, :limit => 64
			t.string :description, :limit => 255
			t.datetime :deleted_at
			t.userstamps
			t.timestamps
		end

		add_index :suppliers, [:domain_id, :name], :unique => true, :name => :ix_spl_0
	end

	def  self.down
		remove_index :suppliers, :name => :ix_spl_0
		
		drop_table :suppliers
	end
end