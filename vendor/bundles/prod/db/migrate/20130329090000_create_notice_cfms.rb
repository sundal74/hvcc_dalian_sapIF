class CreateNoticeCfms < ActiveRecord::Migration

	def  self.up
		create_table :notice_cfms, :id => :uuid do |t|
			t.references :notice, :null => false
			t.references :operation
			t.references :machine
			t.boolean :check_flag
			t.datetime :check_time
		end

		add_index :notice_cfms, [:notice_id, :operation_id, :machine_id], :name => :ix_notice_cfm_0
	end

	def  self.down
		remove_index :notice_cfms, :name => :ix_notice_cfm_0
		drop_table :notice_cfms
	end
end