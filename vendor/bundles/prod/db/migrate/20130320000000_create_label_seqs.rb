class CreateLabelSeqs < ActiveRecord::Migration

	def self.up
		create_table :label_seqs, :id => :uuid do |t|
			t.string :work_date
			t.references :operation
			t.references :product
			t.integer :label_seq
		end

		add_index :label_seqs, [:work_date, :operation_id, :product_id], :unique => true, :name => :ix_label_seq_0
	end

	def self.down
		remove_index :label_seqs, :name => :ix_label_seq_0
		drop_table :label_seqs
	end
end