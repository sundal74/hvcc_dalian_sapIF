class CreateRemTraces < ActiveRecord::Migration

	def  self.up
		create_table :rem_traces, :id => :uuid do |t|
			t.references :domain, :null => false
			t.string :entity_type, :limit => 128
			t.string :entity_id, :limit => 128
      t.text :rem_content
			t.userstamps
			t.timestamps
		end

		add_index :rem_traces, [:domain_id, :entity_type], :name => :ix_rem_traces_0
	end

	def  self.down
		remove_index :rem_traces, :name => :ix_rem_traces_0
		drop_table :rem_traces
	end
end