puts "Loading [9000_create_pms_report] file..."

puts "Custom Selection For Compr creating..."

domain = Domain.system_domain
admin = User.find_by_login('admin')
User.current_user = admin

DiySelection.setup domain, :SelectStation, {:description => 'Using at Compressor Menu', :script_type => 'DSL', :view_type => 'SELECTOR'} do
  @count_logic = '100'
  @service_logic = <<-EOS
   q_params = params['_q']
   name_like = q_params['name-like'] unless q_params['name-like'].blank?
   routing_eq = params['routing-eq'] unless params['routing-eq'].blank?
   routing_eq = params['routing.name-eq'] unless(routing_eq)

   page = (params[:page] || 1).to_i
   limit = (params[:limit] || 30).to_i
   offset = (page - 1) * limit

   conditions = ["id is not null"]

   if(name_like)
     conditions[0] << " and st_no like ?"
     conditions.push("%\#{name_like}%")
   end

   if(routing_eq)
     conditions[0] << " and routing = ?"
     conditions.push(routing_eq)
   end

   total_count = self.domain.pms_master_stations.where(conditions).count
   stations = self.domain.pms_master_stations.select('id, st_no, name').where(conditions).order('st_no asc').limit(limit).offset(offset)
   results = []

   stations.each do |station|
     results.push({:id => station.id, :name => station.st_no, :description => station.name})
   end

   {"items" => results, "success" => true, "total" => total_count}
  EOS

  out_params :id
  out_params :name
  out_params :description
end

DiySelection.setup domain, :SelectBarLoc, {:description => 'Master >> Prod Params Update', :script_type => 'DSL', :view_type => 'SELECTOR'} do
  @count_logic = '100'
  @service_logic = <<-EOS
   q_params = params['_q']
   name_like = q_params['name-like'] if(q_params && !q_params['name-like'].blank?)

   page = (params[:page] || 1).to_i
   limit = (params[:limit] || 30).to_i
   offset = (page - 1) * limit

   conditions = 'LC.LOC_CD IS NOT NULL'
   conditions << " AND LC.LOC_CD LIKE '%\#{name_like}%' " if(name_like)

   count_sql = "
     SELECT 
         COUNT(*) COUNT
     FROM 
         barcode.BASELOC BL JOIN barcode.LOC LC ON BL.BASELOC_CD = LC.BASELOC_CD
     WHERE 
         BL.BASELOC_FG = '1' AND BL.USE_YN = '1' AND LC.USE_YN = '1' AND LC.PROD_LINE_FG IN ('1', '2')"

   sql = "
   SELECT * FROM (
       SELECT raw_sql_.*, rownum raw_rnum_
           FROM (SELECT 
               LC.LOC_CD id, LC.LOC_CD name, LC.LOC_NM description
           FROM barcode.BASELOC BL
              JOIN barcode.LOC LC ON BL.BASELOC_CD = LC.BASELOC_CD
           WHERE
               \#{conditions} 
               AND BL.BASELOC_FG = '1'
               AND BL.USE_YN = '1'
               AND LC.USE_YN = '1'
               AND LC.PROD_LINE_FG IN ('1', '2')
      ORDER BY BL.BASELOC_CD, LC.LOC_CD) raw_sql_
  )
  WHERE raw_rnum_ between \#{(offset + 1)} and \#{limit + offset}"

   count_result = DiySelection.connection.select_all(count_sql)
   locs = DiySelection.connection.select_all(sql)

   {"items" => locs, "success" => true, "total" => count_result[0]["count"]}
  EOS

  out_params :id
  out_params :name
  out_params :description
end

DiySelection.setup domain, :SelectPmsSpcItem, {:description => 'Compressor >> Spc', :script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  q_params = params['_q']
  name_like = q_params['name-like'] unless q_params['name-like'].blank?
  routing_eq = params['routing-eq'] unless(params['routing-eq'].blank?)
  routing_eq = params['routing.name-eq'] unless(routing_eq)
  st_no_eq = params['station.name-eq'] unless(params['station.name-eq'].blank?)
  st_no_eq = params['station-eq'] unless(st_no_eq)

  page = (params[:page] || 1).to_i
  limit = (params[:limit] || 30).to_i
  offset = (page - 1) * limit

  conditions = ["id is not null and item_no is not null"]
  if(routing_eq)
      conditions[0] << " and routing = ? " 
      conditions.push(routing_eq)
  end

  if(st_no_eq)
      conditions[0] << " and st_no = ? " 
      conditions.push(st_no_eq)
  end

  if(name_like)
      conditions[0] << " and item_no like ? " 
      conditions.push("%\#{name_like}%")
  end
 
  total_count = self.domain.pms_master_items.where(conditions).count
  items = self.domain.pms_master_items.select('id, item_no, item_name').where(conditions).order('item_no asc, item_order asc').limit(limit).offset(offset)
  results = []

  items.each do |item|
    results.push({:id => item.id, :name => item.item_no, :description => item.item_name})
  end

  {"items" => results, "success" => true, "total" => total_count}
  EOS
   
end

DiySelection.setup domain, :SelectPmsSpcPcode, {:description => 'Compressor >> Spc', :script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  if(params['work_date-eq'].blank?|| params['item_no-eq'].blank?)
    {"items" => [], "success" => true, "total" => 0} 
  else
    work_date_lte = parse_date(params['work_date-eq']) 
    work_date_gte = work_date_lte - 30
    item_no_eq = params['item_no-eq'] unless(params['item_no-eq'].blank?)

    page = (params[:page] || 1).to_i
    limit = (params[:limit] || 30).to_i
    offset = (page - 1) * limit

    conditions = [" item_no = ?  and (prd_date between ? and ? )"]
    conditions.push(item_no_eq)
    conditions.push(work_date_gte.strftime('%Y%m%d'))
    conditions.push(work_date_lte.strftime('%Y%m%d'))

    count_sql = PmsSpc.select("distinct(trim(p_code)) p_code").where(conditions).to_sql
    sql = PmsSpc.select('distinct (trim(p_code)) p_code').where(conditions).order('p_code asc').limit(limit).offset(offset).to_sql
    count_results = PmsMasterModel.connection.select_all("select count(p_code) count from inf_pms_master_model where p_code in (\#{count_sql})")
    results = PmsMasterModel.connection.select_all("select p_code id, p_code name, model_name description from inf_pms_master_model where p_code in (select p_code from (\#{sql}))")
    total_count = count_results[0]['count']

    {"items" => results, "success" => true, "total" => total_count}
  end
  EOS
   
end

DiySelection.setup domain, :PmsTsfrStatus, {:description => 'Compressor >> TsfrStatus', :script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  domain = self.domain
  if(params['work_date-eq'].blank?)
    work_date = Date.today
  else
    work_date = parse_date(params['work_date-eq'])
  end
  
  shift_eq = params['shift-eq'] unless(params['shift-eq'].blank?)
  wc_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
  op_name = params['operation.name-eq'] unless(params['operation.name-eq'].blank?)
  
  cond = ""
  cond << " and shift = '\#{shift_eq}'" if(shift_eq)
  
  if(op_name) 
    cond << " and routing = '\#{op_name}'"
  else
    cond << " and routing in (select name from operations where workcenter_id = (select id from workcenters where name = '\#{wc_name}')) " if(wc_name)
  end
  
  sql = "select 
    a.routing, a.st_no, s.name st_name, a.total, a.first, a.reject
  from 
      (select 
          routing, st_no, sum(total) total, sum(first) first, sum(reject) reject 
       from 
          inf_pms_tsfr 
       where 
          prd_date = '\#{work_date.strftime('%Y%m%d')}' \#{cond}
       group by 
          routing, st_no) a, inf_pms_master_station s
  where
      a.routing = s.routing and
      a.st_no = s.st_no" 

  results = DiySelection.connection.select_all(sql)
  results.each do |r|
      total = r['total'].to_i
      first = r['first'].to_i
      ftt = (total > 0) ? ((first.to_f / total.to_f) * 100).to_i : 0
      r['target_ftt'] = 100
      r['actual_ftt'] = ftt
  end
  
  results
  EOS

  in_params 'work_date-eq'
  in_params 'shift-eq'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'station.name-eq'

  out_params :routing
  out_params :st_no
  out_params :st_name
  out_params :total
  out_params :first
  out_params :reject
  out_params :target_ftt
  out_params :actual_ftt
end

DiySelection.setup domain, :PmsTsfrReject, {:description => 'Compressor >> TsfrTrend', :script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  check_required_params(params,['prd_date', 'routing', 'st_no'])
  
  prd_date = params['prd_date'] unless(params['prd_date'].blank?)
  work_date = parse_date(prd_date) if(prd_date)
  shift = params['prd_date'] unless(params['shift'].blank?)
  routing = params['routing'] unless(params['routing'].blank?)
  st_no = params['st_no'] unless(params['st_no'].blank?)
  
  conditions = ["prd_date is not null "]
  
  if(work_date)
    conditions[0] << "and prd_date = ?"
    conditions.push(work_date.strftime('%Y%m%d'))
  end
  
  if(shift)
    conditions[0] << "and shift = ?"
    conditions.push(shift)
  end
  
  if(st_no)
    conditions[0] << "and st_no = ?"
    conditions.push(st_no)
  end
  
  if(routing)
    conditions[0] << "and routing = ?"
    conditions.push(routing)
  end
  
  results = PmsTsfrRjt.select("to_date(prd_date, 'YYYYMMDD') prd_date, shift, routing, st_no, p_code, int_no, to_timestamp(actdttm, 'YYYYMMDDHH24MISSFF3') created_at").where(conditions).order("actdttm desc")
  results
  EOS

  in_params 'prd_date'
  in_params 'shift'
  in_params 'routing'
  in_params 'st_no'

  out_params :prd_date
  out_params :shift
  out_params :routing
  out_params :st_no
  out_params :p_code
  out_params :int_no
end

DiySelection.setup domain, :PmsTsfrTrend, {:description => 'Compressor >> TsfrTrend', :script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
    if(params['work_date-eq'].blank? || params['workcenter.name-eq'].blank? || params['operation.name-eq'].blank?)
         {'headers' =>[], 'items' =>[]}
    else
        domain = self.domain
        work_date_lte = parse_date(params['work_date-eq'])
        work_date_gte = work_date_lte - 6
        wc_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
        op_name = params['operation.name-eq'] unless(params['operation.name-eq'].blank?)

        date_idx = 1
        header_values = {'st_no' => 'Station'}
        date_map = {}

        work_date_gte.upto(work_date_lte) do |dt|
          header_values["d\#{date_idx}_value"] = dt.strftime('%m-%d')
          date_map[dt.strftime('%Y%m%d')] = "d\#{date_idx}_value"
          date_idx += 1
        end

        sql = 
          "select 
             a.st_no, s.name st_name, a.prd_date, a.total, a.first, a.reject
          from 
          (select 
              st_no, prd_date, sum(total) total, sum(first) first, sum(reject) reject 
           from 
              inf_pms_tsfr 
           where 
              prd_date between '\#{work_date_gte.strftime('%Y%m%d')}'  and '\#{work_date_lte.strftime('%Y%m%d')}' and st_no in (select st_no from inf_pms_master_station where routing = '\#{op_name}' and monitor_flg = 1)
           group by 
              st_no, prd_date) a,
           inf_pms_master_station s
          where
              a.st_no = s.st_no and
              a.total > 0" 

         q_results = DiySelection.connection.select_all(sql)
         headers = [header_values]
         results = []

         q_results.each do |r|
             total = r['total'].to_i
             first = r['first'].to_i
             ftt = (total > 0) ? ((first.to_f / total.to_f) * 100).to_i : 0
             date_idx_str = date_map[r['prd_date']]

             st_result = results.find { |result| result['st_no'] == r['st_no'] }
             unless(st_result)
                 st_result = {'st_no' => r['st_no'], 'st_name' => r['st_name']}
                 results.push(st_result)
             end
             st_result[date_idx_str] = ftt
         end

         results.each do |result|
             1.upto(7) do |idx|
                result["d\#{idx}_value"] = 0 unless(result.key?("d\#{idx}_value"))
             end
         end 

         output = {'headers' => headers, 'items' => results}
         output
  end
  EOS

  in_params 'work_date-gte'
  in_params 'work_date-lte'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'

  out_params :st_no
  out_params :st_name
  out_params :d1_value
  out_params :d2_value
  out_params :d3_value
  out_params :d4_value
  out_params :d5_value
  out_params :d6_value
  out_params :d7_value
end

DiySelection.setup domain, :PmsProdHist, {:description => 'Compressor >> Prod. History', :script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  page = (params[:page] || 1).to_i
  limit = (params[:limit] || 30).to_i
  offset = (page - 1) * limit
  
  domain = self.domain
  if(params['work_date-lte'].blank?)
    work_date_lte = Date.today
    work_date_gte = work_date_lte - 7
  else
    work_date_gte = parse_date(params['work_date-gte'])
    work_date_lte = parse_date(params['work_date-lte'])      
  end

  wc_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
  op_name = params['operation.name-eq'] unless(params['operation.name-eq'].blank?)
  int_no_like = params['int_no-like'] unless(params['int_no-like'].blank?)
  
  condition =  [""]
  condition[0] << " prd_date between ? and ?"
  condition.push(work_date_gte.strftime('%Y%m%d'))
  condition.push(work_date_lte.strftime('%Y%m%d'))
  
  if(int_no_like)
      condition[0] << " and int_no like ?"
      condition.push("%\#{int_no_like}%")
  else
      if(op_name)
          condition[0] << " and routing = ? and st_no in (select st_no from inf_pms_master_station where routing = ? and equipment is not null)"
          condition.push(op_name)
          condition.push(op_name)
      else
          if(wc_name)
              condition[0] << " and routing in (select name from operations where workcenter_id = (select id from workcenters where name = ?))"
              condition[0] << " and st_no in (select st_no from inf_pms_master_station where equipment is not null)"
              condition.push(wc_name)
          end
      end
  end

  total_count = PmsHistTrace.where(condition).count
  items = PmsHistTrace.where(condition).order('actdttm desc').limit(limit).offset(offset)
  results = []
  items.each do |item|
     result = {}
     result['routing'] = item['routing']
     result['work_date'] = Date.strptime(item['prd_date'], '%Y%m%d')
     result['int_no'] = item['int_no']
     result['ser_no'] = item['ser_no']
     result['created_at'] = Time.strptime(item['actdttm'][0..13], '%Y%m%d%H%M%S')
     results.push(result)
  end

  {"items" => results, "success" => true, "total" => total_count}
  EOS

  in_params 'work_date-gte'
  in_params 'work_date-lte'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'int_no-like'

  out_params :work_date
  out_params :int_no
  out_params :ser_no
  out_params :created_at
end

DiySelection.setup domain, :PmsHistSubData, {:description => 'Compressor >> Prod. History', :script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  int_no = params['int_no-eq'] unless(params['int_no-eq'].blank?)
  routing = params['routing-eq'] unless(params['routing-eq'].blank?)

  items = PmsHistTrace.connection.select_all("select routing, int_no, ser_no, p_code, st_no, actdttm from inf_pms_hist_trace where routing = '\#{routing}' and int_no = '\#{int_no}' order by actdttm desc")
  items.each do |item|
     item['updated_at'] = Time.strptime(item['actdttm'][0..13], '%Y%m%d%H%M%S')
  end
  items
  EOS

  in_params 'int_no-eq'

  out_params :int_no
  out_params :p_code
  out_params :st_no
  out_params :upated_at
end

DiySelection.setup domain, :PmsHistHists, {:description => 'Compressor >> Prod. History', :script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  int_no = params['int_no-eq'] unless(params['int_no-eq'].blank?)
  ser_no = params['ser_no-eq'] unless(params['ser_no-eq'].blank?)
  line = params['line-eq'] unless(params['line-eq'].blank?)
  line = 'VS1' unless line

  sql = "SELECT * FROM "

  if(line == 'VS1')
      sql << " PH_R280@link_vs1"
  elsif(line == 'VS2')
      sql << " PH_R280@link_vs2"
  elsif(line == 'HS1')
      sql << " PH_R280@link_hs"
  end

  sql << " WHERE INT_NO = '\#{int_no}' AND SERIAL_NO = '\#{ser_no}'"

  results = DiySelection.connection.select_all(sql)
  results
  EOS

  in_params 'int_no-eq'
  in_params 'ser_no-eq'
end

DiySelection.setup domain, :PmsHistRaws, {:description => 'Compressor >> Prod. History', :script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  int_no = params['int_no-eq'] unless(params['int_no-eq'].blank?)
  p_code = params['p_code-eq'] unless(params['p_code-eq'].blank?)
  line = params['line-eq'] unless(params['line-eq'].blank?)
  line = 'VS1' unless line
  sql = "SELECT 
  	INT_NO, ST_NO, SEQ, to_date(PRD_DATE, 'YYYYMMDD') PRD_DATE, SHT SHIFT, RES54 P_CODE, 
  	RES01, RES02, RES03, RES04, RES05, RES06, RES07, RES08, RES09, RES10,
  	RES11, RES12, RES13, RES14, RES15, RES16, RES17, RES18, RES19, RES20,
  	RES21, RES55, to_timestamp(DATE_TIME, 'YYYYMMDDHH24MISSFF3') created_at
  FROM
  	PH_P809"

  if(line == 'VS1')
      sql << "@link_vs1"
  elsif(line == 'VS2')
      sql << "@link_vs2"
  elsif(line == 'HS1')
      sql << "@link_hs"
  end

  sql << " WHERE
  	INT_NO = '\#{int_no}' and trim(RES54) = '\#{p_code}'
  ORDER BY
          DATE_TIME ASC"

  results = DiySelection.connection.select_all(sql)
  results
  EOS

  in_params 'int_no-eq'
  in_params 'ser_no-eq'
end

DiySelection.setup domain, :PmsWorstTop10, {:description => 'Compressor >> WorstTop10', :script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
   if(params['work_date-lte'].blank?)
     to_date = Date.today
     from_date = work_date_lte - 7
   else
     from_date = parse_date(params['work_date-gte'])
     to_date = parse_date(params['work_date-lte'])      
   end

   domain = self.domain
   wc_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
   op_name = params['operation.name-eq'] unless(params['operation.name-eq'].blank?)

   conditions = "inf_pms_error.prd_date between '\#{from_date.strftime('%Y%m%d')}' and '\#{to_date.strftime('%Y%m%d')}'"

   if(op_name)
       conditions << " and inf_pms_error.routing = '\#{op_name}'"
   else
     if(wc_name)
       conditions << " and inf_pms_error.routing in (select name from operations where workcenter_id = (select id from workcenters where name = '\#{wc_name}'))"
     end
   end

   sql = 
  "select
      sum(inf_pms_error.err_cnt) err_cnt,
      inf_pms_error.st_no st_no, 
      inf_pms_master_station.name st_name, 
      inf_pms_error.err_code err_code, 
      inf_pms_master_error.err_name err_code_name
   from 
     inf_pms_error 
     INNER JOIN inf_pms_master_station ON inf_pms_master_station.routing = inf_pms_error.routing AND 
     inf_pms_master_station.st_no = inf_pms_error.st_no
     INNER JOIN inf_pms_master_error ON inf_pms_master_error.routing = inf_pms_error.routing AND 
     inf_pms_master_error.st_no = inf_pms_error.st_no AND inf_pms_master_error.err_code = inf_pms_error.err_code 
   where 
     \#{conditions}  AND ROWNUM <= 15
   group by 
     inf_pms_error.st_no, 
     inf_pms_error.err_code, 
     inf_pms_master_station.name, 
     inf_pms_master_error.err_name
   order by 
     err_cnt desc"

   results = DiySelection.connection.select_all(sql)
   results
  EOS
  
  in_params 'work_date-gte'
  in_params 'work_date-lte'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  
  out_params :st_no
  out_params :st_name
  out_params :err_code
  out_params :err_code_name
  out_params :err_cnt
end

DiySelection.setup domain, :PmsErrorTrend, {:description => 'Compressor >> Error Trend', :script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
    if(params['work_date-eq'].blank? || params['workcenter.name-eq'].blank? || params['operation.name-eq'].blank?)
         {'headers' =>[], 'items' =>[]}
    else
        domain = self.domain
        work_date_lte = parse_date(params['work_date-eq'])
        work_date_gte = work_date_lte - 6
        wc_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
        op_name = params['operation.name-eq'] unless(params['operation.name-eq'].blank?)

        date_idx = 1
        header_values = {'st_no' => 'Station'}
        date_map = {}

        work_date_gte.upto(work_date_lte) do |dt|
          header_values["d\#{date_idx}_value"] = dt.strftime('%m-%d')
          date_map[dt.strftime('%Y%m%d')] = "d\#{date_idx}_value"
          date_idx += 1
        end

        sql = 
          "select 
             a.st_no, s.name st_name, a.prd_date, a.err_cnt
          from 
          (select 
              st_no, prd_date, sum(err_cnt) err_cnt
           from 
              inf_pms_error 
           where 
              prd_date between '\#{work_date_gte.strftime('%Y%m%d')}'  and 
              '\#{work_date_lte.strftime('%Y%m%d')}' and 
              st_no in (select st_no from inf_pms_master_station where routing = '\#{op_name}')
           group by 
              st_no, prd_date) a,
           inf_pms_master_station s
          where
              a.st_no = s.st_no and
              s.monitor_flg = 1 and
              a.err_cnt > 0
          order by st_no" 

         q_results = DiySelection.connection.select_all(sql)
         headers = [header_values]
         results = []

         q_results.each do |r|
             date_idx_str = date_map[r['prd_date']]
             st_result = results.find { |result| result['st_no'] == r['st_no'] }
             unless(st_result)
                 st_result = {'st_no' => r['st_no'], 'st_name' => r['st_name']}
                 results.push(st_result)
             end
             st_result[date_idx_str] = r['err_cnt'].to_i
         end

         results.each do |result|
             1.upto(7) do |idx|
                result["d\#{idx}_value"] = 0 unless(result.key?("d\#{idx}_value"))
             end
         end 

         output = {'headers' => headers, 'items' => results}
         output
  end
  EOS
  
end

DiySelection.setup domain, :PmsAlarms, {:description => 'Compressor >> Alarm', :script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  condition =  [""]

  if(params['mode'] && params['mode'] == 'alarm_popup')
    condition[0] << " actdttm >= ?"
    condition.push(params['occurred_at'])
    params[:limit] = 5
  else
    work_date_gte = parse_date(params['work_date-gte'])
    work_date_lte = parse_date(params['work_date-lte'])
    condition[0] << " prd_date between ? and ?"
    condition.push(work_date_gte.strftime('%Y%m%d'))
    condition.push(work_date_lte.strftime('%Y%m%d'))
  end

  page = (params[:page] || 1).to_i
  limit = (params[:limit] || 30).to_i
  offset = (page - 1) * limit

  alarm_type = params['alarm_type-eq'] unless(params['alarm_type-eq'].blank?) 
  if(alarm_type)
      condition[0] << " and alarm_type = ?"
      condition.push(alarm_type)
  end

  total_count = PmsAlarm.where(condition).count
  sql = PmsAlarm.where(condition).order('prd_date desc, shift desc, actdttm desc').limit(limit).offset(offset).to_sql
  items = PmsAlarm.connection.select_all(sql)
  items.each do |item|
     item['prd_date'] = Date.strptime(item['prd_date'], '%Y%m%d')
     item['created_at'] = Time.strptime(item['actdttm'][0..13], '%Y%m%d%H%M%S')
  end

  {"items" => items, "success" => true, "total" => total_count}
  EOS
  
end

puts "Reports Loaded!"
