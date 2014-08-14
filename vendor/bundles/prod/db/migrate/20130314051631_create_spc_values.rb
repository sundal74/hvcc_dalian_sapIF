class CreateSpcValues < ActiveRecord::Migration

	def self.up
		create_table :spc_values, :id => :uuid do |t|
			t.references :spc_item, :null => false
			t.date :work_date
			t.string :seq, :limit => 64
			t.float :val1
			t.float :val2
			t.float :val3
			t.float :val4
			t.float :val5
			t.float :x_val
			t.float :r_val
			t.float :x_usl
			t.float :x_lsl
			t.float :r_usl
			t.float :r_lsl
		end

    add_index :spc_values, [:spc_item_id, :work_date, :seq], :unique => true, :name => :ix_spc_value_0
	end

	def self.down
	  remove_index :spc_values, :name => :ix_spc_value_0
		drop_table :spc_values
	end
end