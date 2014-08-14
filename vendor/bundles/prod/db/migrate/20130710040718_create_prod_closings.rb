class CreateProdClosings < ActiveRecord::Migration

	def self.up
		create_table :prod_closings, :id => :uuid do |t|
			t.references :domain
			t.string :work_date, :limit => 10, :null => false
			t.references :operation, :limit => 64, :null => false
			t.references :closer, :limit => 64, :null => false
			t.boolean :closed_flag
			t.datetime :closed_at
		end

		add_index :prod_closings, [:domain_id, :work_date], :name => :ix_prd_closing_1
		add_index :prod_closings, [:domain_id, :work_date, :operation_id], :unique => true, :name => :ix_prd_closing_2
	end

	def self.down
	  remove_index :prod_closings, :name => :ix_prd_closing_1
	  remove_index :prod_closings, :name => :ix_prd_closing_2
		drop_table :prod_closings
	end
end