class CreateDiyServices < ActiveRecord::Migration
  def	self.up
    create_table :diy_services, :id => :uuid do |t|
      t.references :domain, :null => false
			t.string :name, :null => false, :limit => 64
			t.string :description, :limit => 255
			t.string :script_type, :limit => 20
			t.string :collection_tag, :limit => 30
			t.string :member_tag, :limit => 30
			t.boolean :active_flag
			t.boolean :show_params_flag
			t.text :service_logic
			t.string :logic_file, :limit => 128
			t.boolean :atomic_flag
			t.userstamps
			t.timestamps
    end

    add_index :diy_services, [:domain_id, :name], :unique => true, :name => :ix_diy_svc_0
  end

  def self.down
    remove_index :diy_services, :name => :ix_diy_svc_0
		
    drop_table :diy_services
  end
end