class CreateRoles < ActiveRecord::Migration
  def	self.up
    create_table :roles, :id => :meaningful do |t|
      t.references :domain, :null => false
      t.string :name, :null => false, :limit => 64
      t.string :description, :limit => 255
      t.userstamps
      t.timestamps
    end
    
		add_index :roles, [:domain_id, :name], :unique => true, :name => :ix_role_0
  end

  def self.down
    remove_index :roles, :name => :ix_role_0
		
    drop_table :roles
  end
end
