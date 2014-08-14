class CreateStdWorkDocs < ActiveRecord::Migration

	def self.up
		create_table :std_work_docs, :id => :uuid do |t|
			t.references :domain
			t.string :name, :null => false, :limit => 255
			t.string :description, :limit => 4000
			t.references :operation
			t.references :machine
			t.references :product
			t.string :doc_type, :limit => 20
			t.references :file_group
			t.userstamps
			t.timestamps
		end

		add_index :std_work_docs, [:domain_id, :name], :name => :ix_std_work_doc_0
		add_index :std_work_docs, [:domain_id, :operation_id, :machine_id, :product_id], :name => :ix_std_work_doc_1
	end

	def self.down
		remove_index :std_work_docs, :name => :ix_std_work_doc_0
		remove_index :std_work_docs, :name => :ix_std_work_doc_1
		drop_table :std_work_docs
	end
end