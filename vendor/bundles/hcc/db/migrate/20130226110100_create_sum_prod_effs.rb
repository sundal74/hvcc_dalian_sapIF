class CreateSumProdEffs < ActiveRecord::Migration

	def self.up
		create_table :sum_prod_effs, :id => :uuid do |t|
			t.references :domain, :null => false
			t.date :work_date
			t.references :operation
			t.references :machine
			t.references :product
			t.float :net_ct, :default => 0.0
			t.float :machine_ct, :default => 0.0
			t.integer :actual_qty, :default => 0
			t.integer :input_worktime, :default => 0
			t.integer :net_worktime, :default => 0
			t.float :prod_eff, :default => 0.0
			t.integer :real_worktime, :default => 0
			t.integer :loss_worktime, :default => 0
			t.integer :mh_loss_worktime, :default => 0
			t.integer :order_qty, :default => 0
		end

		add_index :sum_prod_effs, [:domain_id, :work_date, :operation_id, :machine_id, :product_id], :unique => true, :name => :ix_sum_prd_eff_0
		add_index :sum_prod_effs, [:domain_id, :work_date], :name => :ix_sum_prd_eff_1
		add_index :sum_prod_effs, [:domain_id, :work_date, :operation_id], :name => :ix_sum_prd_eff_2
		add_index :sum_prod_effs, [:domain_id, :work_date, :operation_id, :machine_id], :name => :ix_sum_prd_eff_3
	end

	def self.down
		remove_index :sum_prod_effs, :name => :ix_sum_prd_eff_0
		remove_index :sum_prod_effs, :name => :ix_sum_prd_eff_1
		remove_index :sum_prod_effs, :name => :ix_sum_prd_eff_2
		remove_index :sum_prod_effs, :name => :ix_sum_prd_eff_3
		drop_table :sum_prod_effs
	end
end