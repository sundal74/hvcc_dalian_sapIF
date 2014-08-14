class CreateOperationsDefects < ActiveRecord::Migration
  
  def	self.up
    create_table :operations_defects, :id => false do |t|
      t.string :operation_id, :null => false, :limit => 64
      t.string :defect_code_id, :null => false, :limit => 64
    end

    add_index :operations_defects, [:operation_id, :defect_code_id], :unique => true, :name => :ix_op_defect_cd_0
  end

  def self.down
    remove_index :operations_defects, :name => :ix_op_defect_cd_0
    drop_table :operations_defects
  end
end