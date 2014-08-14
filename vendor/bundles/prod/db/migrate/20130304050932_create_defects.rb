class CreateDefects < ActiveRecord::Migration

	def self.up
		create_table :defects, :id => :uuid do |t|
			t.references :domain, :null => false
			t.string :dept_type, :limit => 20
			t.date :work_date
			t.integer :shift
			t.references :prod_order
			t.references :operation
			t.references :machine
			t.references :product
			t.references :child_product
			t.references :defect_code
			t.integer :defect_qty, :default => 0
			t.string :description, :limit => 4000
      t.boolean :upload_flag, :default => false
			t.userstamps
			t.timestamps
		end

		add_index :defects, [:domain_id, :work_date], :name => :ix_defect_0
		add_index :defects, [:domain_id, :work_date, :shift, :operation_id, :machine_id], :name => :ix_defect_1
		add_index :defects, [:prod_order_id], :name => :ix_defect_2
	end

	def self.down
		remove_index :defects, :name => :ix_defect_0
		remove_index :defects, :name => :ix_defect_1
		remove_index :defects, :name => :ix_defect_2
		drop_table :defects
	end
end