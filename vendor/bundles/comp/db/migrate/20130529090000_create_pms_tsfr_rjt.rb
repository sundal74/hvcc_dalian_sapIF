class CreatePmsTsfrRjt < ActiveRecord::Migration
  def	self.up
    create_table :inf_pms_tsfr_rjt, :id => false do |t|
      t.string :prd_date, :limit => 8
      t.string :shift, :limit => 1
      t.string :routing, :limit => 5
      t.string :st_no, :limit => 3
      t.string :p_code, :limit => 3
      t.string :int_no, :limit => 15
      t.string :prog_id, :limit => 30
      t.string :actdttm, :limit => 17
      t.string :upload_yn, :limit => 1
    end

		add_index :inf_pms_tsfr_rjt, [:prd_date, :routing, :st_no, :p_code], :name => :ix_pms_tsfr_rjt_0    
		add_index :inf_pms_tsfr_rjt, [:prd_date, :routing], :name => :ix_pms_tsfr_rjt_1
		add_index :inf_pms_tsfr_rjt, [:int_no], :name => :ix_pms_tsfr_rjt_2

  end

  def self.down
    remove_index :inf_pms_tsfr_rjt, :name => :ix_pms_tsfr_rjt_0
    remove_index :inf_pms_tsfr_rjt, :name => :ix_pms_tsfr_rjt_1
    remove_index :inf_pms_tsfr_rjt, :name => :ix_pms_tsfr_rjt_2
    drop_table :inf_pms_tsfr_rjt
  end
end
