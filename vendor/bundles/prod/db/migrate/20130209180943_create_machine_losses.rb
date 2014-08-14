class CreateMachineLosses < ActiveRecord::Migration

	def self.up
		create_table :machine_losses, :id => :uuid do |t|
			t.references :domain, :null => false
			t.date :work_date
			t.integer :shift
			t.references :workcenter
			t.references :operation
			t.references :machine
			t.references :product
			t.references :prod_order
			t.string :status, :limit => 10
			t.references :loss_code
			t.string :breakdown_code
			t.references :reporter, :class_name => "User"
			t.references :maintainer, :class_name => "User"
			t.datetime :event_time
			t.datetime :maint_start_time
			t.datetime :maint_end_time
			t.integer :loss_term
			t.integer :maint_term
			t.integer :maintainer_count, :default => 0
			t.string :reporter_comment, :limit => 4000
			t.string :maint_comment, :limit => 4000
			t.boolean :line_stop_flag
			t.string :order_no, :limit => 64
			t.string :notice_no, :limit => 64
			t.boolean :print_flag, :default => false
			t.boolean :notice_flag, :default => false
			t.boolean :upload_flag, :default => false
			t.datetime :upload_time
			t.userstamps
			t.timestamps
		end

    add_index :machine_losses, [:domain_id, :operation_id], :name => :ix_mc_loss_0
		add_index :machine_losses, [:domain_id, :updated_at], :name => :ix_mc_loss_1
		add_index :machine_losses, [:domain_id, :work_date], :name => :ix_mc_loss_2
		add_index :machine_losses, [:domain_id, :work_date, :shift], :name => :ix_mc_loss_3
		add_index :machine_losses, [:domain_id, :work_date, :shift, :operation_id], :name => :ix_mc_loss_4
	end

	def self.down
		remove_index :machine_losses, :name => :ix_mc_loss_0
		remove_index :machine_losses, :name => :ix_mc_loss_1
		remove_index :machine_losses, :name => :ix_mc_loss_2
		remove_index :machine_losses, :name => :ix_mc_loss_3
		remove_index :machine_losses, :name => :ix_mc_loss_4
		drop_table :machine_losses
	end

end