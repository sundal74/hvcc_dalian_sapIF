class CreateOperationsUsers < ActiveRecord::Migration
  
  def	self.up
    create_table :operations_users, :id => false do |t|
      t.string :operation_id, :null => false, :limit => 64
      t.string :user_id, :null => false, :limit => 64
      t.boolean :manager_flag
    end

    add_index :operations_users, [:operation_id, :user_id], :unique => true, :name => :ix_op_user_0
  end

  def self.down
    remove_index :operations_users, :name => :ix_op_user_0
    drop_table :operations_users
  end
end