class CreateMachines < ActiveRecord::Migration

	def self.up
		create_table :machines, :id => :meaningful do |t|
			t.references :domain, :null => false
			t.string :name, :null => false, :limit => 64
			t.string :description, :limit => 255
			t.references :operation
			t.string :status, :limit => 20
			t.float :cycletime, :default => 0.0
			t.float :uph, :default => 0.0
			t.boolean :main_op_flag, :default => false
			t.boolean :main_mc_flag, :default => false
			t.float :plan_dist_rate, :default => 0.0
			t.boolean :check_flag
			t.integer :check_cycle
			t.datetime :deleted_at
			t.userstamps
			t.timestamps
		end

		add_index :machines, [:domain_id, :name], :unique => true, :name => :ix_mc_0
		add_index :machines, [:domain_id, :operation_id], :name => :ix_mc_1
	end

	def self.down
		remove_index :machines, :name => :ix_mc_0
		remove_index :machines, :name => :ix_mc_1
		drop_table :machines
	end
end