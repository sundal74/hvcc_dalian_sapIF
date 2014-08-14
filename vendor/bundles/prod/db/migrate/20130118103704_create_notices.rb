class CreateNotices < ActiveRecord::Migration

	def  self.up
		create_table :notices, :id => :uuid do |t|
			t.references :domain, :null => false
			t.date :work_date
			t.integer :shift
			t.integer :priority
			t.references :operation
			t.string :msg, :limit => 4000
			t.userstamps
			t.timestamps
		end

		add_index :notices, [:domain_id, :work_date, :operation_id], :name => :ix_notice_0
	end

	def  self.down
		remove_index :notices, :name => :ix_notice_0
		drop_table :notices
	end
end