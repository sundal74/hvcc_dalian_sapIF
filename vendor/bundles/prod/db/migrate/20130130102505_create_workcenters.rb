class CreateWorkcenters < ActiveRecord::Migration

	def  self.up
		create_table :workcenters, :id => :meaningful do |t|
			t.references :domain, :null => false
			t.string :name, :null => false, :limit => 64
			t.string :description, :limit => 255
			t.string :shift, :limit => 1
			t.string :dept_type, :limit => 20
			t.string :prod_dept, :limit => 64
			t.datetime :deleted_at
			t.userstamps
			t.timestamps
		end

		add_index :workcenters, [:domain_id, :name], :unique => true, :name => :ix_wc_0
	end

	def  self.down
		remove_index :workcenters, :name => :ix_wc_0
		drop_table :workcenters
	end
end