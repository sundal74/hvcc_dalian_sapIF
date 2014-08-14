class CreateMenus < ActiveRecord::Migration
  def	self.up
    create_table :menus, :id => :uuid do |t|
      t.string :name, :null => false, :limit => 64
			t.string :description, :limit => 255
			t.references :domain, :null => false
			t.references :parent, :class_name => :Menu
			t.references :entity, :class_name => :Entity
			t.string :template, :limit => 128
			t.string :menu_type, :limit => 20
			t.string :category, :limit => 64
			t.integer :rank, :default => 100
			t.string :icon_path, :limit => 255
			t.boolean :hidden_flag, :default => false
			t.userstamps
			t.timestamps
			
    end

    add_index :menus, [:domain_id, :name], :unique => true, :name => :ix_menu_0
    add_index :menus, [:parent_id], :name => :ix_menu_1
    add_index :menus, [:domain_id, :menu_type], :name => :ix_menu_2
		add_index :menus, [:entity_id], :name => :ix_menu_3
		
  end

  def self.down
    remove_index :menus, :name => :ix_menu_0
		remove_index :menus, :name => :ix_menu_1
		remove_index :menus, :name => :ix_menu_2
		remove_index :menus, :name => :ix_menu_3
		
    drop_table :menus
  end
end