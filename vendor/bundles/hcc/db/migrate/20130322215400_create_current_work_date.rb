class CreateCurrentWorkDate < ActiveRecord::Migration

	def self.up
		create_table :current_work_date, :id => :uuid do |t|
		  t.references :domain, :null => false
			t.date :work_date
      t.integer :shift
		end
	end
end