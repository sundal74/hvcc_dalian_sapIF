class CreateCustomers < ActiveRecord::Migration

  def self.up
    create_table :customers, :id => :meaningful do |t|
      t.references :domain, :null => false
      t.string :name, :null => false, :limit => 64
      t.string :description, :limit => 255
      t.datetime :deleted_at
      t.userstamps
      t.timestamps
    end

    add_index :customers, [:domain_id, :name], :unique => true, :name => :ix_cust_0
	end

  def self.down
    remove_index :customers, :name => :ix_cust_0
    drop_table :customers
  end
end