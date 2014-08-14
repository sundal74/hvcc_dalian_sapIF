class CreateLabelModels < ActiveRecord::Migration

	def self.up
		create_table :label_models, :id => :meaningful do |t|
			t.references :domain
			t.string :name, :limit => 64
			t.string :description, :limit => 1000
			t.string :dept_type, :limit => 10
			t.string :printer_type, :limit => 20
			t.text :command
			t.boolean :active_flag, :default => false
			t.userstamps
			t.timestamps
		end

		add_index :label_models, [:domain_id, :name], :unique => true, :name => :ix_label_model_0
	end

	def self.down
		remove_index :label_models, :name => :ix_label_model_0
		drop_table :label_models
	end
end