class CreateLabelMasters < ActiveRecord::Migration

	def self.up
		create_table :label_masters, :id => :uuid do |t|
			t.references :domain, :null => false
			t.string :dept_type, :limit => 20
			t.references :operation
			t.references :product
			t.references :label_model
			t.references :customer
			t.string :part_no, :limit => 128
			t.string :part_name, :limit => 128
			t.string :part_no_seq, :limit => 128
			t.string :car_type, :limit => 64
			t.string :car_name, :limit => 64
			t.integer :pallet_qty, :default => 0
			t.integer :cut_qty, :default => 0
			t.string :ship_loc, :limit => 64
			t.string :area, :limit => 20
			t.string :customer_plant, :limit => 64
			t.string :handle_type, :limit => 10
			t.string :box_no, :limit => 64
			t.string :jis_code, :limit => 64
			t.userstamps
			t.timestamps
		end

		add_index :label_masters, [:domain_id, :operation_id], :name => :ix_label_mst_0
    add_index :label_masters, [:domain_id, :operation_id, :product_id], :name => :ix_label_mst_1
	end

	def self.down
		remove_index :label_masters, :name => :ix_label_mst_0
		remove_index :label_masters, :name => :ix_label_mst_1
		drop_table :label_masters
	end
end