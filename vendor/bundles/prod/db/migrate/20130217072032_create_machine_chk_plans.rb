class CreateMachineChkPlans < ActiveRecord::Migration

	def self.up
		create_table :machine_chk_plans, :id => :uuid do |t|
			t.references :domain, :null => false
			t.string :name, :limit => 64
			t.string :description, :limit => 4000
			t.references :machine
			t.string :status, :null => false, :limit => 20
			t.date :plan_date
			t.date :due_date
			t.date :check_date
			t.string :pm_part, :limit => 32
			t.string :pm_type, :limit => 32
			t.datetime :start_time
			t.datetime :end_time
			t.integer :checker_count
			t.string :reporter
			t.references :inspector, :class_name => "User"
			t.integer :work_term, :default => 0
			t.integer :total_work_term, :default => 0
			t.boolean :upload_flag
			t.datetime :upload_time
			t.string :chk_comment, :limit => 4000
			t.boolean :upload_ok_flag
			t.string :upload_msg
			t.userstamps
			t.timestamps
		end

		add_index :machine_chk_plans, [:domain_id, :plan_date], :name => :ix_mc_chk_plan_0
		add_index :machine_chk_plans, [:domain_id, :plan_date, :machine_id], :name => :ix_mc_chk_plan_1
		add_index :machine_chk_plans, [:domain_id, :plan_date, :machine_id, :pm_part, :pm_type], :name => :ix_mc_chk_plan_2
	end

	def self.down
		remove_index :machine_chk_plans, :name => :ix_mc_chk_plan_0
		remove_index :machine_chk_plans, :name => :ix_mc_chk_plan_1
		remove_index :machine_chk_plans, :name => :ix_mc_chk_plan_2
		drop_table :machine_chk_plans
	end
end