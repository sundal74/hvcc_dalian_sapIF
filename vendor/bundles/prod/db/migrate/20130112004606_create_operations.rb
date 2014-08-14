class CreateOperations < ActiveRecord::Migration

	def self.up
		create_table :operations, :id => :meaningful do |t|
			t.references :domain, :null => false
			t.string :name, :null => false, :limit => 64
			t.string :description, :limit => 255
			t.references :workcenter
			t.string :dept_type, :limit => 20
			t.integer :op_seq
			t.string :op_type, :limit => 20
			t.boolean :main_op_flag, :default => false
			t.boolean :inv_flag
			t.boolean :rm_input_flag
			t.references :track_rm_store
			t.datetime :deleted_at
			t.userstamps
			t.timestamps
		end

		add_index :operations, [:domain_id, :name], :unique => true, :name => :ix_op_0
		add_index :operations, [:domain_id, :workcenter_id], :name => :ix_op_1
	end

	def self.down
		remove_index :operations, :name => :ix_op_0
		remove_index :operations, :name => :ix_op_1
		drop_table :operations
	end
end