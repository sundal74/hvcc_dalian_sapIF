class CreateLossTemplates < ActiveRecord::Migration

	def self.up
		create_table :loss_templates, :id => :uuid do |t|
			t.references :domain, :null => false
			t.integer :week_day
			t.string :start_time, :limit => 8
			t.string :end_time, :limit => 8
			t.integer :loss_term, :default => 0
			t.references :loss_code
			t.boolean :control_flag
			t.datetime :deleted_at
			t.userstamps
			t.timestamps
		end

		add_index :loss_templates, [:domain_id, :loss_code_id], :name => :ix_loss_tpl_0
	end

	def self.down
		remove_index :loss_templates, :name => :ix_loss_tpl_0
		drop_table :loss_templates
	end
end