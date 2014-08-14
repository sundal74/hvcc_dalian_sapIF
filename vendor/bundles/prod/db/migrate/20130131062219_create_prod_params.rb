class CreateProdParams < ActiveRecord::Migration

	def self.up
		create_table :prod_params, :id => :meaningful do |t|
			t.references :domain, :null => false
			t.references :operation
			t.references :machine
			t.references :product
			t.string :location, :limit => 10			
			t.float :target_uph, :default => 0.0
			t.float :cycletime, :default => 0.0
      t.datetime :deleted_at
			t.userstamps
			t.timestamps
		end

		add_index :prod_params, [:domain_id, :operation_id, :machine_id, :product_id], :unique => true, :name => :ix_prd_param_0
		add_index :prod_params, [:domain_id, :operation_id, :machine_id], :name => :ix_prd_param_1
		add_index :prod_params, [:domain_id, :operation_id], :name => :ix_prd_param_2
		add_index :prod_params, [:domain_id, :product_id], :name => :ix_prd_param_3
	end

	def self.down
		remove_index :prod_params, :name => :ix_prd_param_0
		remove_index :prod_params, :name => :ix_prd_param_1
		remove_index :prod_params, :name => :ix_prd_param_2
		remove_index :prod_params, :name => :ix_prd_param_3
		
		drop_table :prod_params
	end
end