class CreateDefectCodes < ActiveRecord::Migration

	def  self.up
		create_table :defect_codes, :id => :meaningful do |t|
			t.references :domain, :null => false
			t.string :name, :limit => 255
			t.string :description, :limit => 255
			t.string :code_type
			t.datetime :deleted_at
			t.userstamps
			t.timestamps
		end

		add_index :defect_codes, [:domain_id, :name], :unique => true, :name => :ix_defect_cd_0
	end

	def  self.down
		remove_index :defect_codes, :name => :ix_defect_cd_0		
		drop_table :defect_codes
	end
end