class CreatePmsHistTrace < ActiveRecord::Migration
  def	self.up
    create_table :inf_pms_hist_trace, :id => false do |t|
      t.string :prd_date, :limit => 8
      t.string :routing, :limit => 5
      t.string :st_no, :limit => 3
      t.string :p_code, :limit => 3
      t.string :int_no, :limit => 12
      t.string :ser_no, :limit => 4
      t.integer :seq
      t.string :prog_id, :limit => 30
      t.string :actdttm, :limit => 17
      t.string :upload_yn, :limit => 1
    end
    
		add_index :inf_pms_hist_trace, [:prd_date, :routing, :st_no, :p_code], :name => :ix_pms_hst_trc_0
		add_index :inf_pms_hist_trace, [:prd_date], :name => :ix_pms_hst_trc_1
		add_index :inf_pms_hist_trace, [:routing], :name => :ix_pms_hst_trc_2
		add_index :inf_pms_hist_trace, [:routing, :st_no, :p_code], :name => :ix_pms_hst_trc_3
  end

  def self.down
    remove_index :inf_pms_hist_trace, :name => :ix_pms_hst_trc_0
    remove_index :inf_pms_hist_trace, :name => :ix_pms_hst_trc_1
    remove_index :inf_pms_hist_trace, :name => :ix_pms_hst_trc_2
    remove_index :inf_pms_hist_trace, :name => :ix_pms_hst_trc_3
    drop_table :inf_pms_hist_trace
  end
end
