class CreateWorkerTimes < ActiveRecord::Migration

  def self.up
    create_table :worker_times, :id => :uuid do |t|
      t.references :domain
      t.date :work_date
      t.integer :shift
      t.references :prod_order
      t.references :operation
      t.references :machine
      t.references :product
      t.references :user
      t.datetime :start_time
      t.datetime :end_time
      t.integer :work_term
      t.integer :loss_term
    end

    add_index :worker_times, [:work_date, :shift], :name => :ix_worker_time_0
    add_index :worker_times, [:work_date, :shift, :operation_id], :name => :ix_worker_time_1
    add_index :worker_times, [:work_date, :shift, :operation_id, :machine_id], :name => :ix_worker_time_2
    add_index :worker_times, [:prod_order_id], :name => :ix_worker_time_3
    add_index :worker_times, [:prod_order_id, :user_id], :name => :ix_worker_time_4
  end

  def self.down
    remove_index :worker_times, :name => :ix_worker_time_0
    remove_index :worker_times, :name => :ix_worker_time_1
    remove_index :worker_times, :name => :ix_worker_time_2
    remove_index :worker_times, :name => :ix_worker_time_3
    remove_index :worker_times, :name => :ix_worker_time_4
    drop_table :worker_times
  end
end