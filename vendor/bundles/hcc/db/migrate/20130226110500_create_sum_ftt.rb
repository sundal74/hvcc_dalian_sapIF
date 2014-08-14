class CreateSumFtt < ActiveRecord::Migration

	def self.up
		create_table :sum_ftt, :id => :uuid do |t|
			t.references :domain, :null => false
			t.date :work_date
			t.references :operation
			t.references :machine
		  t.integer :input_qty, :default => 0
      t.integer :defect_qty, :default => 0
      t.integer :rework_qty, :default => 0
      t.integer :total_defect_qty, :default => 0
      t.integer :repair_qty, :default => 0
			t.float :ftt_value, :default => 0.0
		end

		add_index :sum_ftt, [:domain_id, :work_date, :operation_id, :machine_id], :unique => true, :name => :ix_sum_ftt_0
		add_index :sum_ftt, [:domain_id, :work_date], :name => :ix_sum_ftt_1
		add_index :sum_ftt, [:domain_id, :work_date, :operation_id], :name => :ix_sum_ftt_2
	end

	def self.down
		remove_index :sum_ftt, :name => :ix_sum_ftt_0
		remove_index :sum_ftt, :name => :ix_sum_ftt_1
		remove_index :sum_ftt, :name => :ix_sum_ftt_2
		drop_table :sum_ftt
	end
end