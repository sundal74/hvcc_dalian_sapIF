class Customer < ActiveRecord::Base

	stampable
	trace_removable
	meaningful_id [:domain_id, :name]
	belongs_to :domain
	attr_accessible :name,:description
	
  #
  # 변경시 BARCODE 테이블에 반영 
  #
  after_save do
    bar_sql = "select count(*) count from barcode.trade where tr_cd = '#{self.name}'"
    bar_res = Customer.connection.select_all(bar_sql)
    if(bar_res && bar_res.length == 1 && bar_res[0]['count'])
      tr_cd = ActiveRecord::Base.connection.quote(self.name)
      tr_nm = ActiveRecord::Base.connection.quote(self.description)
      
      # insert
      if(bar_res[0]['count'] == '0')
        reg_dtm = self.created_at.strftime('%Y%m%d%H%M%S')
        bar_sql = "insert into barcode.trade(tr_cd, tr_nm, tr_fg, use_yn, reg_id, reg_dtm) values(#{tr_cd}, #{tr_nm}, '1', '1', '#{self.creator_id}', '#{reg_dtm}')"
      else
        mod_dtm = self.updated_at.strftime('%Y%m%d%H%M%S')
        bar_sql = "update barcode.trade set use_yn = '1', tr_nm = #{tr_nm}, mod_id = '#{self.updater_id}', mod_dtm = '#{mod_dtm}' where tr_cd = #{tr_cd}"
      end
      
      Customer.connection.execute(bar_sql)
    end
  end
  
  #
  # 삭제시 BARCODE 테이블에 반영 
  #
  after_destroy do
    tr_cd = ActiveRecord::Base.connection.quote(self.name)
    mod_dtm = Time.now.strftime('%Y%m%d%H%M%S')
    bar_sql = "update barcode.trade set use_yn = '0', mod_id = '#{User.current_user.id}', mod_dtm = '#{mod_dtm}' where tr_cd = #{tr_cd}"
    Customer.connection.execute(bar_sql)
  end

end
