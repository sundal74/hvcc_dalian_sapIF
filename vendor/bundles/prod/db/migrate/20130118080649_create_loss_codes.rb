class CreateLossCodes < ActiveRecord::Migration

	def  self.up
		create_table :loss_codes, :id => :meaningful do |t|
			t.references :domain, :null => false
			t.string :name, :null => false, :limit => 64
			t.string :description, :limit => 255
			t.boolean :control_flag
			t.datetime :deleted_at
			t.userstamps
			t.timestamps
		end

		add_index :loss_codes, [:domain_id, :name], :unique => true, :name => :ix_loss_cd_0
	end

	def  self.down
		remove_index :loss_codes, :name => :ix_loss_cd_0
		drop_table :loss_codes
	end
end