class CreateProductParts < ActiveRecord::Migration

	def  self.up
		create_table :product_parts, :id => :uuid do |t|
			t.references :domain
			t.references :parent_product
			t.references :child_product
			t.float :qty, :default => 0.0
			t.string :unit, :null => false, :limit => 10
			t.string :bom_type, :limit => 10
			t.datetime :deleted_at
			t.userstamps
			t.timestamps
		end

		add_index :product_parts, [:parent_product_id, :child_product_id], :name => :ixx_prd_part_1
	end

	def  self.down
		remove_index :product_parts, :name => :ixx_prd_part_1
		drop_table :product_parts
	end
end