puts "Loading [1300_create_reports] file..."

puts "Custom Selection creating..."

domain = Domain.system_domain
admin = User.find_by_login('admin')

User.current_user = admin

PlanVsActualSelection = DiySelection.setup domain, :PlanVsActual, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  # check_required_params(params, ['work_date-gte', 'work_date-lte'])
  category = params['category-eq'] unless(params['category-eq'].blank?)
  from_date = params['work_date-gte'] unless(params['work_date-gte'].blank?)
  to_date = params['work_date-lte'] unless(params['work_date-lte'].blank?)
  op_name = params['operation.name-eq'] unless(params['operation.name-eq'].blank?)
  wc_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
  main_op_flag = params['main_op_flag-eq'] unless(params['main_op_flag-eq'].blank?)
  by_product = true

  # by_product : 품목별, by_machine : 설비별 
  category = 'by_product' unless category
  by_product = false if(category != 'by_product')

  if(!from_date && !to_date)
      from_date = self.domain.shift.current_work_date.strftime('%Y-%m-%d')
      to_date = self.domain.shift.current_work_date.strftime('%Y-%m-%d')
  elsif(from_date && !to_date)
      to_date = self.domain.shift.current_work_date.strftime('%Y-%m-%d')
  end
  
  cond = ""
  if(op_name)
      cond << " and o.name = '\#{op_name}'"
  else
      cond << " and w.name = '\#{wc_name}'" if(wc_name)
      cond << " and o.main_op_flag = 1" if(main_op_flag)
  end

  sql = 
  "SELECT
      decode(a.shift, 1, 'Day', 2, 'Night', null, '') shift,
      w.name workcenter,
      o.name operation,
      o.description operation_desc,"

  if(by_product)
      sql << "p.name product,  p.description product_desc,"
  else
      sql << "m.name machine,  m.description machine_desc,"
  end

  sql <<   
     "a.plan,
      a.actual,
      a.scrap,
      a.rework,
      decode(a.plan, 0, 0, round(((a.actual - a.scrap) / a.plan) * 100)) achv_rate
  FROM
      (SELECT
           shift,
           workcenter_id, 
           operation_id, "

  if(by_product)
      sql << "product_id,"
  else
      sql << "machine_id,"
  end

  sql <<   
         " sum(order_qty) plan,
           sum(actual_qty) actual,
           sum(defect_qty) scrap,
           sum(rework_qty) rework
       FROM
           prod_orders
       WHERE
           domain_id = 'System' AND order_date between DATE'\#{from_date}' and DATE'\#{to_date}'
       GROUP BY 
           shift, workcenter_id, operation_id, "

  if(by_product)
      sql << "product_id"
  else
      sql << "machine_id"
  end

  sql <<     
   ") a
       LEFT OUTER JOIN workcenters w ON a.workcenter_id = w.id
       LEFT OUTER JOIN operations o ON a.operation_id = o.id "

  if(by_product)
      sql <<  "LEFT OUTER JOIN products p ON a.product_id = p.id "
  else
      sql << "LEFT OUTER JOIN machines m ON a.machine_id = m.id "
  end

  sql <<
  "WHERE
       a.operation_id is not null \#{cond}
  ORDER BY
       shift, w.name, o.name, "

  if(by_product)
      sql << "p.name"
  else
      sql << "m.name"
  end

  results = ProdOrder.connection.select_all(sql)
  results
  EOS
  
  out_params :shift
  out_params :workcenter
  out_params :operation
  out_params :operation_desc
  out_params :product
  out_params :product_desc
  out_params :plan
  out_params :actual
  out_params :rework
  out_params :scrap
  out_params :achv_rate  
end

overallEfficiencySelection = DiySelection.setup domain, :overall_efficiency, {:script_type => 'DSL-SQL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  domain = self.domain
  from_date = params['work_date-gte'] unless(params['work_date-gte'].blank?)
  to_date = params['work_date-lte'] unless(params['work_date-lte'].blank?)
  workcenter_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
  main_op_flag = params['main_op_flag-eq'] unless(params['main_op_flag-eq'].blank?)

  from_date = parse_date(from_date)
  to_date = parse_date(to_date)

  conditions = ["work_date between ? and ?"]
  conditions.push(from_date)
  conditions.push(to_date)

  conditions[0] << " and operations.main_op_flag = 1" if(main_op_flag)

  con = wc_op_mc_assoc_condition(params, conditions)

  select = 
  "workcenters.name workcenter, 
  operations.name operation, 
  operations.description operation_desc, 
  machines.name machine, 
  machines.description machine_desc, 
  sum_prod_effs.machine_ct machine_ct, 
  sum_prod_effs.actual_qty actual_qty, 
  (sum_prod_effs.input_worktime / 60) input_worktime, 
  (sum_prod_effs.net_worktime  / 60) net_worktime , 
  sum_prod_effs.prod_eff prod_eff, 
  (sum_prod_effs.real_worktime / 60) real_worktime, 
  (sum_prod_effs.loss_worktime / 60) loss_worktime, 
  sum_prod_effs.order_qty order_qty, 
  TO_CHAR(sum_prod_effs.work_date, 'YYYY/MM/DD') work_date"

  sql = domain.sum_prod_effs.select(select).where(con).joins({:operation => :workcenter}, :machine).to_sql
  sql
  EOS
  
  in_params 'work_date-gte'
  in_params 'work_date-lte'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  
  out_params :work_date
  out_params :operation
  out_params :operation_desc
  out_params :machine
  out_params :machine_desc
  out_params :machine_ct
  out_params :actual_qty
  out_params :input_worktime
  out_params :net_worktime
  out_params :prod_eff
  out_params :real_worktime
  out_params :loss_worktime
  out_params :order_qty
  out_params :workcenter
end

overallEfficiency2Selection = DiySelection.setup domain, :overall_efficiency2, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  domain = self.domain
  from_date = params['work_date-gte'] unless(params['work_date-gte'].blank?)
  to_date = params['work_date-lte'] unless(params['work_date-lte'].blank?)
  wc_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
  main_op_flag = params['main_op_flag-eq'] unless(params['main_op_flag-eq'].blank?)

  from_date = parse_date(from_date)
  to_date = parse_date(to_date)

  conditions = ["work_date between ? and ?"]
  conditions.push(from_date)
  conditions.push(to_date)

  conditions[0] << " and operations.workcenter_id = (select id from workcenters where name = '#{wc_name}')" if(wc_name)
  if(main_op_flag)
      conditions[0] << " and operations.main_op_flag = ?" 
      conditions.push(true)
  end

  select = 
  "operations.name operation,
   operations.description operation_desc,
   machines.name machine,
   machines.description machine_desc,
   avg(sum_prod_effs.machine_ct) machine_ct, 
   sum(sum_prod_effs.actual_qty) actual_qty, 
   sum(sum_prod_effs.input_worktime) input_worktime, 
   sum(sum_prod_effs.net_worktime) net_worktime, 
   sum(sum_prod_effs.real_worktime) real_worktime, 
   sum(sum_prod_effs.loss_worktime) loss_worktime, 
   sum(sum_prod_effs.order_qty) order_qty"

  groupStr = "operations.name, operations.description, machines.name, machines.description"
  orderStr = "operations.name, machines.name"
  sql = domain.sum_prod_effs.select(select).joins(:operation, :machine).where(conditions).group(groupStr).order(orderStr).to_sql
  sum_prod_effs = SumProdEff.connection.select_all(sql)

  sum_prod_effs.each do |sum_prod_eff|
    next if sum_prod_eff['operation'].blank?
    prod_eff = 0
    prod_eff = (sum_prod_eff['net_worktime'].to_f / sum_prod_eff['input_worktime'].to_f).to_f if(sum_prod_eff['input_worktime'].to_i != 0)
    sum_prod_eff['prod_eff'] = prod_eff
  end

  sum_prod_effs
  EOS
  
  in_params 'work_date-gte'
  in_params 'work_date-lte'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  
  out_params :operation
  out_params :machine
  out_params :machine_ct
  out_params :actual_qty
  out_params :input_worktime
  out_params :net_worktime
  out_params :prod_eff
  out_params :real_worktime
  out_params :loss_worktime
  out_params :order_qty
  out_params :workcenter
end

oeeSelection = DiySelection.setup domain, :oee, {:script_type => 'DSL-SQL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  domain = self.domain
  from_date = params['work_date-gte'] unless(params['work_date-gte'].blank?)
  to_date = params['work_date-lte'] unless(params['work_date-lte'].blank?)
  workcenter_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
  main_op_flag = params['main_op_flag-eq'] unless(params['main_op_flag-eq'].blank?)

  from_date = parse_date(from_date)
  to_date = parse_date(to_date)
    
  conditions = ["work_date between ? and ?"]
  conditions.push(from_date)
  conditions.push(to_date)

  conditions[0] << " and operations.main_op_flag = 1" if(main_op_flag)

  con = wc_op_mc_assoc_condition(params, conditions)
  select = 
  "workcenters.name workcenter, 
  operations.name operation, 
  operations.description operation_desc, 
  machines.name machine, 
  machines.description machine_desc, 
  sum_oee.availability*100 availability, 
  sum_oee.perf_eff*100 perf_eff, 
  sum_oee.quality*100 quality, 
  sum_oee.oee_value*100 oee_value, 
  TO_CHAR(sum_oee.work_date, 'YYYY-MM-DD') work_date"

  sql = domain.sum_oee.select(select).where(con).joins({:operation => :workcenter}, :machine).to_sql
  sql
  EOS
  
  in_params 'work_date-gte'
  in_params 'work_date-lte'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  
  out_params :availability
  out_params :perf_eff
  out_params :quality
  out_params :oee_value
  out_params :work_date
  out_params :machine
  out_params :machine_desc
  out_params :operation
  out_params :operation_desc
  out_params :workcenter
end

oee2Selection = DiySelection.setup domain, :oee2, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  domain = self.domain
  from_date = params['work_date-gte'] unless(params['work_date-gte'].blank?)
  to_date = params['work_date-lte'] unless(params['work_date-lte'].blank?)
  wc_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
  main_op_flag = params['main_op_flag-eq'] unless(params['main_op_flag-eq'].blank?)

  results = []
  from_date = parse_date(from_date)
  to_date = parse_date(to_date)

  conditions = ["(sum_oee.availability != 0 and sum_oee.perf_eff != 0 and sum_oee.quality != 0) and sum_oee.work_date between ? and ?"]
  conditions.push(from_date)
  conditions.push(to_date)

  conditions[0] << " and o.main_op_flag = 1" if(main_op_flag)
  conditions[0] << " and w.name = '#{wc_name}'" if(wc_name)

  # con = wc_op_mc_assoc_condition(params, conditions)

  select =
      "w.name workcener,
       o.name operation,
       o.description operation_desc,
       m.name machine,
       m.description machine_desc,
       ROUND(EXP (SUM (LN (ABS (DECODE (sum_oee.availability, 0, 1, sum_oee.availability))))), 3) availability,
       ROUND(EXP (SUM (LN (ABS (DECODE (sum_oee.perf_eff, 0, 1, sum_oee.perf_eff))))), 3) perf_eff,
       ROUND(EXP (SUM (LN (ABS (DECODE (sum_oee.quality, 0, 1, sum_oee.quality))))), 3) quality"

  joinStr = "sum_oee inner join operations o on sum_oee.operation_id = o.id
  inner join workcenters w on o.workcenter_id = w.id
  inner join machines m on sum_oee.machine_id = m.id"
  groupStr = "w.name, o.name, o.description, m.name, m.description"

  sql = domain.sum_oee.select(select).joins(joinStr).where(conditions).group(groupStr).order("w.name, o.name, m.name").to_sql
  sum_oee = DiySelection.connection.select_all(sql);

  sum_oee.each do |oee|
      next unless oee["operation"]
      oee["oee_value"] = (oee["availability"].to_f * oee["perf_eff"].to_f * oee["quality"].to_f).round(3)
  end

  sum_oee
  EOS
  
  in_params 'work_date-gte'
  in_params 'work_date-lte'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  
  out_params :workcenter
  out_params :operation
  out_params :operation_desc
  out_params :machine
  out_params :machine_desc
  out_params :availability
  out_params :perf_eff
  out_params :quality
  out_params :oee_value
end

fttSelection = DiySelection.setup domain, :ftt, {:script_type => 'DSL-SQL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  domain = self.domain
  from_date = params['work_date-gte'] unless(params['work_date-gte'].blank?)
  to_date = params['work_date-lte'] unless(params['work_date-lte'].blank?)
  workcenter_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
  main_op_flag = params['main_op_flag-eq'] unless(params['main_op_flag-eq'].blank?)

  from_date = parse_date(from_date)
  to_date = parse_date(to_date)

  conditions = ["work_date between ? and ?"]
  conditions.push(from_date)
  conditions.push(to_date)
  conditions[0] << " and operations.main_op_flag = 1" if(main_op_flag)

  con = wc_op_mc_assoc_condition(params, conditions)
  select = 
  "workcenters.name workcenter, 
   operations.name operation, 
   operations.description operation_desc, 
   machines.name machine, 
   machines.description machine_desc, 
   sum_ftt.input_qty input_qty, 
   sum_ftt.defect_qty defect_qty, 
   sum_ftt.rework_qty rework_qty, 
   sum_ftt.ftt_value ftt_value, 
   TO_CHAR(sum_ftt.work_date, 'YYYY-MM-DD') work_date"

  sql = domain.sum_ftt.select(select).where(con).joins({:operation => :workcenter}, :machine).to_sql
  sql
  EOS
  
  in_params 'work_date-gte'
  in_params 'work_date-lte'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  
  out_params :work_date
  out_params :machine
  out_params :machine_desc
  out_params :operation
  out_params :operation_desc
  out_params :input_qty
  out_params :defect_qty
  out_params :rework_qty
  out_params :ftt_value
  out_params :workcenter
end

ftt2Selection = DiySelection.setup domain, :ftt2, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  domain = self.domain
  from_date = params['work_date-gte'] unless(params['work_date-gte'].blank?)
  to_date = params['work_date-lte'] unless(params['work_date-lte'].blank?)
  wc_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
  main_op_flag = params['main_op_flag-eq'] unless(params['main_op_flag-eq'].blank?)

  results = []
  from_date = parse_date(from_date)
  to_date = parse_date(to_date)

  conditions = ["work_date between ? and ?"]
  conditions.push(from_date)
  conditions.push(to_date)

  if(main_op_flag)
      conditions[0] << " and operations.main_op_flag = ?" 
      conditions.push(true)
  end

  if(wc_name)
      conditions[0] << " and operations.workcenter_id = (select id from workcenters where name = ?)"
      conditions.push(wc_name)
  end

  select = "workcenters.name workcenter,   
   operations.name operation, 
   operations.description operation_desc,
   machines.name machine, 
   machines.description machine_desc,
   sum(input_qty) input_qty, 
   sum(defect_qty) defect_qty, 
   sum(rework_qty) rework_qty"

  joinStr = 
  "sum_ftt inner join operations on operations.id = sum_ftt.operation_id 
   inner join machines on machines.id = sum_ftt.machine_id 
   inner join workcenters on operations.workcenter_id = workcenters.id"
  groupStr = "workcenters.name, operations.name, operations.description, machines.name, machines.description"
  orderStr = "workcenters.name, operations.name, machines.name"
  sql = domain.sum_ftt.select(select).joins(joinStr).where(conditions).group(groupStr).order(orderStr).to_sql
  sum_ftt = SumFtt.connection.select_all(sql)

  sum_ftt.each do |ftt|
    next if ftt['operation'].blank?
    ftt_value = 0
    ftt_value = (ftt['input_qty'].to_i - (ftt['defect_qty'].to_i + ftt['rework_qty'].to_i)).to_f / ftt['input_qty'].to_f if(ftt['input_qty'].to_i != 0)
    ftt['ftt_value'] = ftt_value
  end

  sum_ftt
  EOS
  
  in_params 'work_date-gte'
  in_params 'work_date-lte'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  
  out_params :workcenter
  out_params :machine
  out_params :machine_desc
  out_params :operation
  out_params :operation_desc
  out_params :input_qty
  out_params :defect_qty
  out_params :rework_qty
  out_params :ftt_value
end

btsSelection = DiySelection.setup domain, :bts, {:script_type => 'DSL-SQL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  from_date = params['work_date-gte'] unless(params['work_date-gte'].blank?)
  to_date = params['work_date-lte'] unless(params['work_date-lte'].blank?)
  workcenter_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
  main_op_flag = params['main_op_flag-eq'] unless(params['main_op_flag-eq'].blank?)

  from_date = parse_date(from_date)
  to_date = parse_date(to_date)

  conditions = ["work_date between ? and ?"]
  conditions.push(from_date)
  conditions.push(to_date)

  conditions[0] << " and operations.main_op_flag = 1" if(main_op_flag)
  con = wc_op_mc_assoc_condition(params, conditions)

  select = "workcenters.name workcenter, 
    operations.name operation, 
    operations.description operation_desc, 
    machines.name machine, 
    machines.description machine_desc, 
    products.name product, 
    products.description product_desc, 
    DECODE(sum_bts.shift, 1, 'Day', 2, 'Night') shift,
    sum(plan_qty) plan_qty,
    sum(actual_qty) actual_qty,
    sum(plan_act_lower_qty) plan_act_lower_qty,
    sum(plan_achv_qty) plan_achv_qty"

  group = "workcenters.name, operations.name, operations.description, machines.name, machines.description, products.name, products.description, DECODE(sum_bts.shift, 1, 'Day', 2, 'Night')"

  SumBts.select(select).where(con).group(group).joins({:operation => :workcenter}, :machine, :product).to_sql
  EOS
  
  in_params 'work_date-eq'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'

  out_params :shift
  out_params :workcenter  
  out_params :operation
  out_params :operation_desc
  out_params :machine
  out_params :machine_desc
  out_params :product
  out_params :product_desc
  out_params :vol_perf
  out_params :mix_perf
  out_params :seq_perf
  out_params :bts_value
  out_params :plan_qty
  out_params :actual_qty
  out_params :plan_act_lower_qty
  out_params :plan_achv_qty
end

bts2Selection = DiySelection.setup domain, :bts2, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  rom_date = params['work_date-gte'] unless(params['work_date-gte'].blank?)
   to_date = params['work_date-lte'] unless(params['work_date-lte'].blank?)
   workcenter_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
   main_op_flag = params['main_op_flag-eq'] unless(params['main_op_flag-eq'].blank?)

   from_date = parse_date(from_date)
   to_date = parse_date(to_date)

   conditions = ["work_date between ? and ?"]
   conditions.push(from_date)
   conditions.push(to_date)

   conditions[0] << " and operations.main_op_flag = 1" if(main_op_flag)
   con = wc_op_mc_assoc_condition(params, conditions)

   select = "workcenters.name workcenter, 
     operations.name operation, 
     operations.description operation_desc, 
     machines.name machine, 
     machines.description machine_desc, 
     products.name product, 
     products.description product_desc, 
     sum(plan_qty) plan_qty,
     sum(actual_qty) actual_qty,
     sum(plan_act_lower_qty) plan_act_lower_qty,
     sum(plan_achv_qty) plan_achv_qty"

   group = "workcenters.name, 
     operations.name, 
     operations.description, 
     machines.name, 
     machines.description, 
     products.name, 
     products.description"

   sql = SumBts.select(select).where(con).group(group).joins({:operation => :workcenter}, :machine, :product).order("operation, machine, product").to_sql
   SumBts.connection.select_all(sql)
  EOS
  
  in_params 'work_date-gte'
  in_params 'work_date-lte'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  
  out_params :operation
  out_params :operation_desc
  out_params :machine
  out_params :machine_desc
  out_params :product
  out_params :product_desc
  out_params :vol_perf
  out_params :mix_perf
  out_params :seq_perf
  out_params :bts_value
  out_params :workcenter
end

mHActualSelection = DiySelection.setup domain, :m_h_actual, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  domain = self.domain
  from_date = params['work_date-gte'] unless(params['work_date-gte'].blank?)
  to_date = params['work_date-lte'] unless(params['work_date-lte'].blank?)
  wc_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
  op_name = params['operation.name-eq'] unless(params['operation.name-eq'].blank?)
  mc_name = params['machine.name-eq'] unless(params['machine.name-eq'].blank?)
  main_op_flag = params['main_op_flag-eq'] unless(params['main_op_flag-eq'].blank?)

  cond = " and order_date between DATE'#{from_date}' and DATE'#{to_date}'"
  
  if(mc_name && mc_name.empty?)
      cond << " and machine_id in (select id from machines where name = '#{mc_name}')" 
  elsif(op_name && !op_name.empty?)
     cond << " and operation_id = (select id from operations where name = '#{op_name}') "
  else
     cond << " and workcenter_id = (select id from workcenters where name = '#{wc_name}')" if(wc_name && !wc_name.empty?)
     cond << " and operation_id in (select id from operations where main_op_flag =1)" if(main_op_flag)
  end

  sql = "select 
             w.name workcenter, 
             o.name operation, 
             o.description operation_desc,
             m.name machine, 
             m.description machine_desc, 
             p.name product, 
             p.description product_desc,
             c.name customer,
             a.order_qty, 
             a.actual_qty, 
             a.scrap_qty,
             decode(a.order_qty, 0, 0, round(((a.actual_qty - a.scrap_qty) / a.order_qty) * 100)) achv_rate
         from 
            (SELECT 
                 workcenter_id, operation_id, machine_id, product_id, customer_id, 
                 sum(order_qty) order_qty, 
                 sum(actual_qty) actual_qty, 
                 sum(defect_qty) scrap_qty
            FROM 
                 prod_orders  
            WHERE 
                 prod_orders.domain_id = '#{self.domain_id}' #{cond}
            GROUP BY 
                 workcenter_id, operation_id, machine_id, product_id, customer_id 
            ) a

        left outer join workcenters w on a.workcenter_id = w.id 
        left outer join operations o on a.operation_id = o.id 
        left outer join machines m on a.machine_id = m.id 
        left outer join products p on a.product_id = p.id
        left outer join customers c on a.customer_id = c.id
    ORDER BY
       a.workcenter_id, o.op_seq, a.machine_id, a.product_id"

  results = ProdOrder.connection.select_all(sql)
  results
  EOS
  
  in_params 'work_date-gte'
  in_params 'work_date-lte'
  in_params 'workcenter.name-eq'

  out_params :customer  
  out_params :workcenter
  out_params :operation
  out_params :operation_desc
  out_params :machine
  out_params :machine_desc
  out_params :product
  out_params :product_desc
  out_params :order_qty
  out_params :actual_qty
  out_params :scrap_qty
  out_params :achv_rate
end

DiySelection.setup domain, :DefectRate, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  check_required_params(params, ['work_date-gte', 'work_date-lte'])

    domain = self.domain
    work_date_gte = parse_date(params['work_date-gte'])
    work_date_lte = parse_date(params['work_date-lte'])
    scrap_code_name = params['defect_code.name-eq'] unless(params['defect_code.name-eq'].blank?)

    if(scrap_code_name)
      cond = " BETWEEN DATE'#{work_date_gte}' and DATE'#{work_date_lte}'"

      sql = "select 
            w.name workcenter,
            w.description dept,
            o.name operation,
            o.description operation_desc,
            m.sum_actual_qty,
            m.sum_defect_qty,
            m.defect_rate
          from
            (select 
                 a.workcenter_id, a.operation_id, a.sum_actual_qty, b.sum_defect_qty, 
                 round(decode(a.sum_actual_qty, 0, 0, ((b.sum_defect_qty / a.sum_actual_qty) * 100)), 1) defect_rate
             from
                (SELECT 
                    workcenter_id, 
                    operation_id, 
                    sum(prod_orders.actual_qty) sum_actual_qty
                 FROM 
                    prod_orders 
                 WHERE 
                    domain_id = '#{self.domain_id}' and order_date #{cond}
                 GROUP BY workcenter_id, operation_id) a

                left outer join 
               (SELECT 
                   operation_id, sum(defect_qty) sum_defect_qty
                FROM
                   defects
                WHERE 
                   work_date #{cond} and defect_code_id = (select id from defect_codes where name = '#{scrap_code_name}')
                GROUP BY 
                    operation_id) b on a.operation_id = b.operation_id) m
                join workcenters w on m.workcenter_id = w.id
                join operations o on m.operation_id = o.id
           order by m.workcenter_id, o.op_seq"

    else

     cond = " and order_date between DATE'#{work_date_gte}' and DATE'#{work_date_lte}'"
      sql = "select
        w.name workcenter,
        w.description dept,
        o.name operation,
        o.description operation_desc,
        a.sum_actual_qty,
        a.sum_defect_qty,
        round(decode(a.sum_actual_qty, 0, 0, ((a.sum_defect_qty / a.sum_actual_qty) * 100)), 1) defect_rate
      from (
        SELECT 
          workcenter_id, 
          operation_id, 
          sum(prod_orders.actual_qty) sum_actual_qty, 
          sum(prod_orders.defect_qty) sum_defect_qty 
        FROM 
          prod_orders 
        WHERE 
          domain_id = '#{self.domain_id}' #{cond}
        GROUP BY
          workcenter_id, operation_id 
      ) a
          join workcenters w on a.workcenter_id = w.id 
          join operations o on a.operation_id = o.id 
       order by 
          a.workcenter_id, o.op_seq"
    end

    results = ProdOrder.connection.select_all(sql)
    results
  EOS
  
  in_params 'work_date-lte'
  in_params 'work_date-gte'
  in_params 'workcenter.name-eq'
  
  out_params :workcenter
  out_params :sum_actual_qty
  out_params :sum_defect_qty
  out_params :defect_rate
end

DiySelection.setup domain, :DefectCodeTop10, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  domain = self.domain

    from_date = params['work_date-gte'] unless(params['work_date-gte'].blank?)
    to_date = params['work_date-lte'] unless(params['work_date-lte'].blank?)
    wc_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
    operation_name = params['operation.name-eq'] unless(params['operation.name-eq'].blank?)

    conditions = [""]

    if(!from_date && !to_date)
      from_date = self.domain.shift.current_work_date
      to_date = self.domain.shift.current_work_date
    elsif(from_date && !to_date)
      to_date = self.domain.shift.current_work_date
    end

    from_date = parse_date(from_date)
    to_date = parse_date(to_date)

    conditions[0] << "defects.work_date between ? and ?"
    conditions.push(from_date, to_date)

    if(operation_name)
        conditions[0] << ' and defects.operation_id = (select id from operations where name = ?)'
        conditions.push(operation_name)
    else
      if(wc_name)
        conditions[0] << ' and defects.operation_id in (select id from operations where workcenter_id = (select id from workcenters where name = ?))'
        conditions.push(wc_name)
      end
    end

    select = 'defect_code_id, sum(defect_qty) sum_defect_qty'
    group = 'defect_code_id'
    order = 'sum(defect_qty) desc'

    defects = domain.defects.select(select).includes(:defect_code).where(conditions).group(group).order(order).limit(10)
    results = []
    total_qty, rank = 0, 1

    defects.each do |defect|
      defect_sum_qty = !defect.sum_defect_qty ? 0 : defect.sum_defect_qty
      results.push({
        :ranking => rank,
        :defect_code_name => defect.defect_code ? defect.defect_code.name : '',
        :defect_code_desc => defect.defect_code ? defect.defect_code.description : '',
        :sum_defect_qty => defect_sum_qty.to_i
      })
      total_qty += defect_sum_qty.to_i
      rank += 1
    end

    results.push({
        :ranking => '',
        :defect_code_name => 'Total',
        :defect_code_desc => '',
        :sum_defect_qty => total_qty
    })
    results
  EOS
  
  in_params 'work_date-gte'
  in_params 'work_date-lte'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  out_params :defect_code_name
  out_params :defect_code_desc
  out_params :sum_defect_qty
end

actualPer10MinSelection = DiySelection.setup domain, :ActualPer10Min, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  date = params['work_date-eq'] unless(params['work_date-eq'].blank?)
  operation = params['operation.name-eq'] unless(params['operation.name-eq'].blank?)
  machine = params['machine.name-eq'] unless(params['machine.name-eq'].blank?)
  workcenter = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
  conditions = ["id is not null"]

  con = wc_op_mc_assoc_condition(params, conditions)
  date = parse_date(date)
  con[0] << " and work_date between ? and ?"
  con.push(date, date)

  # for sum hourly actual total
  sum_hourly_actuals = self.domain.sum_hourly_actuals.select("actual_hour, actual_min, sum(actual_qty) sum_qty").where(con).group("actual_hour, actual_min").order("actual_hour, actual_min")
  # for average uph
  uph_conds = ["operations.name = ? and sum_hourly_actuals.work_date between ? and ?"]
  uph_conds.push(operation)
  uph_conds.push(date)
  uph_conds.push(date)

  if(machine)
    uph_conds[0] << " and machines.name = ?"
    uph_conds.push(machine)
  end
    
  avg_uphs = self.domain.sum_hourly_actuals.select("sum_hourly_actuals.machine_id, count(machines.id) cnt, sum(machines.uph) sum_uph").where(uph_conds).joins(:machine, :operation).group("sum_hourly_actuals.machine_id")

  week_day = date.wday + 1
  loss_templates_sql = "
    SELECT 
      DECODE(SUM(B.A01), NULL, 0, SUM(B.A01)) AS hour1, DECODE(SUM(B.A02), NULL, 0, SUM(B.A02)) AS hour2, 
  		DECODE(SUM(B.A03), NULL, 0, SUM(B.A03)) AS hour3, DECODE(SUM(B.A04), NULL, 0, SUM(B.A04)) AS hour4,
      DECODE(SUM(B.A05), NULL, 0, SUM(B.A05)) AS hour5, DECODE(SUM(B.A06), NULL, 0, SUM(B.A06)) AS hour6, 
      DECODE(SUM(B.A07), NULL, 0, SUM(B.A07)) AS hour7, DECODE(SUM(B.A08), NULL, 0, SUM(B.A08)) AS hour8, 
      DECODE(SUM(B.A09), NULL, 0, SUM(B.A09)) AS hour9, DECODE(SUM(B.A10), NULL, 0, SUM(B.A10)) AS hour10, 
      DECODE(SUM(B.A11), NULL, 0, SUM(B.A11)) AS hour11, DECODE(SUM(B.A12), NULL, 0, SUM(B.A12)) AS hour12, 
      DECODE(SUM(B.A13), NULL, 0, SUM(B.A13)) AS hour13, DECODE(SUM(B.A14), NULL, 0, SUM(B.A14)) AS hour14,
      DECODE(SUM(B.A15), NULL, 0, SUM(B.A15)) AS hour15, DECODE(SUM(B.A16), NULL, 0, SUM(B.A16)) AS hour16, 
      DECODE(SUM(B.A17), NULL, 0, SUM(B.A17)) AS hour17, DECODE(SUM(B.A18), NULL, 0, SUM(B.A18)) AS hour18, 
      DECODE(SUM(B.A19), NULL, 0, SUM(B.A19)) AS hour19, DECODE(SUM(B.A20), NULL, 0, SUM(B.A20)) AS hour20, 
      DECODE(SUM(B.A21), NULL, 0, SUM(B.A21)) AS hour21, DECODE(SUM(B.A22), NULL, 0, SUM(B.A22)) AS hour22, 
      DECODE(SUM(B.A23), NULL, 0, SUM(B.A23)) AS hour23, DECODE(SUM(B.A00), NULL, 0, SUM(B.A00)) AS hour24
    FROM (
      SELECT  
        (CASE A.HOUR WHEN '00' THEN A.TIME  END) A00, (CASE A.HOUR WHEN '01' THEN A.TIME  END) A01,
        (CASE A.HOUR WHEN '02' THEN A.TIME  END) A02, (CASE A.HOUR WHEN '03' THEN A.TIME  END) A03,
        (CASE A.HOUR WHEN '04' THEN A.TIME  END) A04, (CASE A.HOUR WHEN '05' THEN A.TIME  END) A05,
        (CASE A.HOUR WHEN '06' THEN A.TIME  END) A06, (CASE A.HOUR WHEN '07' THEN A.TIME  END) A07,
        (CASE A.HOUR WHEN '08' THEN A.TIME  END) A08, (CASE A.HOUR WHEN '09' THEN A.TIME  END) A09,
        (CASE A.HOUR WHEN '10' THEN A.TIME  END) A10, (CASE A.HOUR WHEN '11' THEN A.TIME  END) A11,
        (CASE A.HOUR WHEN '12' THEN A.TIME  END) A12, (CASE A.HOUR WHEN '13' THEN A.TIME  END) A13,
        (CASE A.HOUR WHEN '14' THEN A.TIME  END) A14, (CASE A.HOUR WHEN '15' THEN A.TIME  END) A15,
        (CASE A.HOUR WHEN '16' THEN A.TIME  END) A16, (CASE A.HOUR WHEN '17' THEN A.TIME  END) A17,
        (CASE A.HOUR WHEN '18' THEN A.TIME  END) A18, (CASE A.HOUR WHEN '19' THEN A.TIME  END) A19,
        (CASE A.HOUR WHEN '20' THEN A.TIME  END) A20, (CASE A.HOUR WHEN '21' THEN A.TIME  END) A21,
        (CASE A.HOUR WHEN '22' THEN A.TIME  END) A22, (CASE A.HOUR WHEN '23' THEN A.TIME  END) A23
      FROM (     
        SELECT '00' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '0000' AND '0059'
        UNION ALL
        SELECT '01' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '0100' AND '0159'
        UNION ALL
        SELECT '02' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '0200' AND '0259'
        UNION ALL
        SELECT '03' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '0300' AND '0359'
        UNION ALL
        SELECT '04' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '0400' AND '0459'
        UNION ALL
        SELECT '05' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '0500' AND '0559'
        UNION ALL
        SELECT '06' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '0600' AND '0659'
        UNION ALL
        SELECT '07' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '0700' AND '0759'
        UNION ALL
        SELECT '08' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '0800' AND '0859'
        UNION ALL
        SELECT '09' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '0900' AND '0959'
        UNION ALL
        SELECT '10' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '1000' AND '1059'
        UNION ALL
        SELECT '11' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '1100' AND '1159'
        UNION ALL
        SELECT '12' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '1200' AND '1259'
        UNION ALL
        SELECT '13' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '1300' AND '1359'
        UNION ALL
        SELECT '14' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '1400' AND '1459'
        UNION ALL
        SELECT '15' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '1500' AND '1559'
        UNION ALL
        SELECT '16' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '1600' AND '1659'
        UNION ALL
        SELECT '17' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '1700' AND '1759'
        UNION ALL
        SELECT '18' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '1800' AND '1859'
        UNION ALL
        SELECT '19' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '1900' AND '1959'
        UNION ALL
        SELECT '20' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '2000' AND '2059'
        UNION ALL
        SELECT '21' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '2100' AND '2159'
        UNION ALL
        SELECT '22' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '2200' AND '2259'
        UNION ALL
        SELECT '23' AS HOUR, LOSS_TERM AS TIME FROM LOSS_TEMPLATES WHERE WEEK_DAY = \#{week_day} AND START_TIME BETWEEN '2300' AND '2359'
      ) A
    ) B"

    loss_templates = data_set = DiySelection.connection.select_all(loss_templates_sql)

    results = sum_hourly_actuals.collect do |sum_hourly_actual|
      {
        :actual_hour => sum_hourly_actual.actual_hour,
        :actual_min => sum_hourly_actual.actual_min,
        :sum_qty => sum_hourly_actual.sum_qty
      }
    end

    data, grid, chart = {}, [], []

    if(results && results.length > 0)
      total_uph, uph_cnt, loss_term = 0, 0, {"header" => "test"}
      avg_uphs.each do |auph|
        total_uph += auph['sum_uph'].to_i
        uph_cnt += auph['cnt'].to_i
      end

      loss_templates.each do |loss_template|
  	    0.upto(23) do |term_idx|
  	      loss_term["hour_\#{term_idx}"] = loss_template["hour\#{term_idx}"]
  	    end
      end

      target_uph = (uph_cnt > 0) ? ((total_uph / uph_cnt).to_i) : 0
      data1 = {"header" => "10"}
      data2 = {"header" => "20"}
      data3 = {"header" => "30"}
      data4 = {"header" => "40"}
      data5 = {"header" => "50"}
      data6 = {"header" => "60"}
      result = []

      0.upto(23) do |hour_idx| 
        one_min = results.find { |result| result[:actual_hour] == hour_idx && result[:actual_min] == 0 }
        two_min = results.find { |result| result[:actual_hour] == hour_idx && result[:actual_min] == 1 }
        three_min = results.find { |result| result[:actual_hour] == hour_idx && result[:actual_min] == 2 }
        four_min = results.find { |result| result[:actual_hour] == hour_idx && result[:actual_min] == 3 }
        five_min = results.find { |result| result[:actual_hour] == hour_idx && result[:actual_min] == 4 }
        six_min = results.find { |result| result[:actual_hour] == hour_idx && result[:actual_min] == 5 }
        if(one_min)
          data1["data_\#{hour_idx}_actual"] = one_min ? one_min[:sum_qty] : 0
        else
          data1["data_\#{hour_idx}_actual"] = 0
        end
        if(two_min)
          data2["data_\#{hour_idx}_actual"] = two_min ? two_min[:sum_qty] : 0
        else
          data2["data_\#{hour_idx}_actual"] = 0
        end
        if(three_min)
          data3["data_\#{hour_idx}_actual"] = three_min ? three_min[:sum_qty] : 0
        else
          data3["data_\#{hour_idx}_actual"] = 0
        end
        if(four_min)
          data4["data_\#{hour_idx}_actual"] = four_min ? four_min[:sum_qty] : 0
        else
          data4["data_\#{hour_idx}_actual"] = 0
        end
        if(five_min)
          data5["data_\#{hour_idx}_actual"] = five_min ? five_min[:sum_qty] : 0
        else
          data5["data_\#{hour_idx}_actual"] = 0
        end
        if(six_min)
          data6["data_\#{hour_idx}_actual"] = six_min ? six_min[:sum_qty] : 0
        else
          data6["data_\#{hour_idx}_actual"] = 0
        end

        data1["data_\#{hour_idx}_target"] = ((target_uph.to_f * ((60.0 - loss_term["hour_\#{hour_idx}"].to_f)/60.0).to_f) / 6.0)
        data2["data_\#{hour_idx}_target"] = ((target_uph.to_f * ((60.0 - loss_term["hour_\#{hour_idx}"].to_f)/60.0).to_f) / 6.0)
        data3["data_\#{hour_idx}_target"] = ((target_uph.to_f * ((60.0 - loss_term["hour_\#{hour_idx}"].to_f)/60.0).to_f) / 6.0)
        data4["data_\#{hour_idx}_target"] = ((target_uph.to_f * ((60.0 - loss_term["hour_\#{hour_idx}"].to_f)/60.0).to_f) / 6.0)
        data5["data_\#{hour_idx}_target"] = ((target_uph.to_f * ((60.0 - loss_term["hour_\#{hour_idx}"].to_f)/60.0).to_f) / 6.0)
        data6["data_\#{hour_idx}_target"] = ((target_uph.to_f * ((60.0 - loss_term["hour_\#{hour_idx}"].to_f)/60.0).to_f) / 6.0)
      end
      
      data1["data_24_target"] = data1.delete("data_8_target")
      data1["data_24_actual"] = data1.delete("data_8_actual")
      data2["data_24_target"] = data2.delete("data_8_target")
      data2["data_24_actual"] = data2.delete("data_8_actual")
      data3["data_24_target"] = data3.delete("data_8_target")
      data3["data_24_actual"] = data3.delete("data_8_actual")

      grid.push(data1, data2, data3, data4, data5, data6)
      data = {:grid => grid}
      
    else
      data1 = {"header" => "10"}
      data2 = {"header" => "20"}
      data3 = {"header" => "30"}
      data4 = {"header" => "40"}
      data5 = {"header" => "50"}
      data6 = {"header" => "60"}

      0.upto(24) do |hour_idx| 
        data1["data_\#{hour_idx}_target"] = 0
        data1["data_\#{hour_idx}_actual"] = 0
        data2["data_\#{hour_idx}_target"] = 0
        data2["data_\#{hour_idx}_actual"] = 0
        data3["data_\#{hour_idx}_target"] = 0
        data3["data_\#{hour_idx}_actual"] = 0
        data4["data_\#{hour_idx}_target"] = 0
        data4["data_\#{hour_idx}_actual"] = 0
        data5["data_\#{hour_idx}_target"] = 0
        data5["data_\#{hour_idx}_actual"] = 0
        data6["data_\#{hour_idx}_target"] = 0
        data6["data_\#{hour_idx}_actual"] = 0
      end
      
      grid.push(data1, data2, data3, data4, data5, data6)
      data = {:grid => grid}
    end

    data
  EOS
  
  in_params 'work_date-eq'
  in_params 'prod_dept-eq'
  in_params 'dept_type-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  in_params 'product.name-eq'
  out_params :id
  out_params :work_date
  out_params :shift
  out_params :prod_order_id
  out_params :machine
  out_params :operation
  out_params :product
  out_params :product_desc
  out_params :actual_hour
  out_params :actual_min
  out_params :last_actual_time
  out_params :sum_order_qty
  out_params :sum_defect_qty
  out_params :sum_qty
end

# ProductionStatus
DiySelection.setup domain, :GetDailyActualQty, {:script_type => 'DSL', :view_type => 'LIST'} do
  @service_logic = <<-EOS
  date = params['work_date-eq'] unless(params['work_date-eq'].blank?)
  shift = params['shift-eq'] unless(params['shift-eq'].blank?)
  workcenter_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)  
  operation_name = params['operation.name-eq'] unless(params['operation.name-eq'].blank?)
  machine_name = params['machine.name-eq'] unless(params['machine.name-eq'].blank?)
  product_name = params['product.name-eq'] unless(params['product.name-eq'].blank?)
  no_actual_flag = params['no_actual_flag-eq'] unless(params['no_actual_flag-eq'].blank?)
  wait_flag = params['wait_flag-eq'] unless(params['wait_flag-eq'].blank?)  

  page = (params[:page] || 1).to_i
  limit = (params[:limit] || 30).to_i
  offset = (page - 1) * limit

  # condition, include_arr = ["prod_orders.id is not null"], [:workcenter, :operation, :machine, :product, :customer]
  condition, include_arr = ["prod_orders.id is not null"], [:workcenter, :operation, :machine, :product]

  if(date)
    date = parse_date(date)
    condition[0] << " and order_date between ? and ?"
    condition.push(date, date)
  end

  if(shift)
    condition[0] << " and shift = ? "
    condition.push(shift)
  end

  if(workcenter_name)
    condition[0] << " and workcenter_id = (select id from workcenters where name = ?)"
    condition.push(workcenter_name)
  end

  if(operation_name)
    condition[0] << " and operation_id = (select id from operations where name = ?)"
    condition.push(operation_name)
  end

  if(machine_name)
    condition[0] << " and machine_id = (select id from machines where name = ?)"
    condition.push(machine_name)
  end

  if(product_name)
    condition[0] << " and product_id = (select id from products where name = ?)"
    condition.push(product_name)    
  end

  if(no_actual_flag)
    condition[0] << " and order_seq < 98 and actual_qty = 0"
  end

  if(wait_flag)
    condition[0] << " and status = 'W'"
  end

  total_count = self.domain.prod_orders.includes(include_arr).where(condition).count
  orders = self.domain.prod_orders.includes(include_arr).where(condition).order('prod_orders.shift, prod_orders.workcenter_id, prod_orders.order_seq').limit(limit).offset(offset)
  results = orders.collect do |order|
    {
      :id => order.id, 
      :workcenter => order.workcenter ? order.workcenter.name : '',
      :order_date => order.order_date, 
      :shift => order.shift, 
      :machine => order.machine ? order.machine.name : '', 
      :machine_desc => order.machine ? order.machine.description : '', 
      :operation => order.operation ? order.operation.name : '', 
      :operation_desc => order.operation ? order.operation.description : '', 
      :product => order.product  ? order.product.name : '', 
      :product_desc => order.product ? order.product.description : '', 
      #:customer => order.customer ? order.customer.name : '',
      :customer => '',
      :status => order.status, 
      :order_seq => order.order_seq, 
      :actual_start_time => order.actual_start_time, 
      :actual_end_time => order.actual_end_time, 
      :order_qty => order.order_qty, 
      :actual_qty => order.actual_qty, 
      :defect_qty => order.defect_qty, 
      :rework_qty => order.rework_qty, 
      :worker_count => order.worker_count
    }
  end
  {"items" => results, "success" => true, "total" => total_count}
 EOS
  
  in_params 'work_date-eq'
  in_params 'shift-eq'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  in_params 'product.name-eq'
  
  out_params :id
  out_params :name
  out_params :order_date
  out_params :shift
  out_params :operation
  out_params :operation_desc
  out_params :machine
  out_params :machine_desc
  out_params :product
  out_params :customer
  out_params :product_desc
  out_params :status
  out_params :order_seq
  out_params :actual_start_time
  out_params :actual_end_time
  out_params :order_qty
  out_params :actual_qty
  out_params :defect_qty
  out_params :rework_qty
  out_params :worker_count
end

# 설비 점검 캘린더 데이터 서비스 
DiySelection.setup domain, :ListMachineChkCal, {:script_type => 'DSL', :view_type => 'LIST'} do
  @service_logic = <<-EOS
  start_date = !params[:startDate].blank? ? params[:startDate] : Date.today.beginning_of_month.beginning_of_week - 1
    end_date = !params[:endDate].blank? ? params[:endDate] : Date.today.end_of_month.end_of_week - 1

    start_date = parse_date(start_date) if(start_date.class.name == 'String')
    end_date = parse_date(end_date)  if(end_date.class.name == 'String')

    sql = self.domain.machine_chk_plans.select("to_char(plan_date, 'YYYY-MM-DD') plan_date, pm_type, status, count(*) cnt").where("plan_date between ? and ?", start_date, end_date).group("plan_date, pm_type, status Having count(*) >= 1").to_sql

    pm_type_codes = domain.common_codes.find_by_name('PM_TYPE').codes

    results = MachineChkPlan.connection.select_all(sql)
    idx = 1
    results.each do |result|
        status = result['status']
        cnt = result['cnt'].to_s
        plan_date = result['plan_date']
        status_str = (status == 'T') ? 'Actual' : 'Plan'
        pm_type = result['pm_type'].blank? ? 'Etc' : result['pm_type']
        pm_type_code = pm_type_codes.find { |code| code.name == pm_type }
        pm_type_str = pm_type_code ? pm_type_code.description : 'Etc'
        result['title'] = pm_type_str + ' ' + status_str + ' : ' + cnt
       cid = MachineChkPlan.get_cid(pm_type, status)
        result['cid'] = cid
        result['start'] = plan_date + "00:00:00"
        result['end'] = plan_date + "23:59:59"
        result['ad'] = true
        result['id'] = idx
        idx += 1
    end

    results
  EOS
  
  in_params :startDate
  in_params :endDate
  out_params :id
  out_params :title
  out_params :plan_date
  out_params :ad
  out_params :cid
  out_params :start
  out_params :end
  out_params :status
end

DiySelection.setup domain, :ListMachineChkWeekly, {:script_type => 'DSL', :view_type => 'LIST'} do
  @service_logic = <<-EOS
  start_date = !params[:startDate].blank? ? params[:startDate] : Date.today.beginning_of_month.beginning_of_week - 1
  end_date = !params[:endDate].blank? ? params[:endDate] : Date.today.end_of_month.end_of_week - 1
  
  start_date = parse_date(start_date) if(start_date.class.name == 'String')
  end_date = parse_date(end_date)  if(end_date.class.name == 'String')
  
  sql = self.domain.machine_chk_plans.joins(:machine).select("machine_chk_plans.id, machine_chk_plans.plan_date, machine_chk_plans.pm_type, machines.name machine_code, machine_chk_plans.status").where("machine_chk_plans.plan_date between ? and ?", start_date, end_date).to_sql
  results = MachineChkPlan.connection.select_all(sql)
  
  results.each do |result|
      result['id'] = result['id']
      status = result['status']
      status_str = status == 'T'? 'Actual' : 'Plan'
      plan_date = result['plan_date'].to_date.to_s
      result['title'] = "#{result['machine_code']} [#{status_str}]"
      result['cid'] = (status == 'W') ? 3 : 4
      result['start'] = plan_date + "00:00:00"
      result['end'] = plan_date + "23:59:59"
      result['ad'] = true
  end

  results
  EOS
  
  in_params :startDate
  in_params :endDate
  out_params :id
  out_params :title
  out_params :plan_date
  out_params :ad
  out_params :cid
  out_params :start
  out_params :end
  out_params :status
end

#
# 불량 현황 (Scrap Status) 데이터 서비스 
# 
DiySelection.setup domain, :DefectMgt, {:script_type => 'DSL', :view_type => 'LIST'} do
  @service_logic = <<-EOS
    if('xls' == params[:format])
      params[:limit] = 10000
    end

    order = ProdOrder.new
    list = order.search_prod_orders(self.domain, params)

    orders = list[:list]
    results = []
    orders.each do |order|
        results.push({
          :id => order['id'], 
          :order_date => order['order_date'], 
          :shift => order['shift'], 
          :machine => order['machine'], 
          :operation => order['operation'], 
          :product => order['product'],
          :product_id => order['product_id'],
          :operation_desc => order['operation_desc'],
          :machine_desc => order['machine_desc'],
          :product_desc => order['product_desc'],
         :actual_qty => order['actual_qty'], 
          :defect_qty => order['defect_qty'],
         :rework_qty => order['rework_qty']
        })
    end

    {"items" => results, "success" => true, "total" => list[:count]}
  EOS
  
  in_params 'order_date-eq'
  in_params 'shift-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  in_params 'product.name-eq'
  out_params :id
  out_params :order_date
  out_params :shift
  out_params :operation
  out_params :machine
  out_params :product
  out_params :product_id
  out_params :actual_start_time
  out_params :actual_qty
  out_params :defect_qty
  out_params :rework_qty
end



# 작업자 리스트
DiySelection.setup domain, :ListOperationsUsers, {:script_type => 'DSL', :view_type => 'LIST'} do
  @service_logic = <<-EOS
  check_required_param(params, 'operation_id')

    operations_users = OperationsUsers.where("operation_id = ?", params[:operation_id]).includes(:user)
    parent_code = self.domain.common_codes.find_by_name('PROD_DEPT')
    child_code = self.domain.common_codes.where('parent_id = ?', parent_code.id)
    results =[]

    operations_users.each do |operation_user|
      next if(!operation_user || !operation_user.user)

      prod_dept = ''
      if(!operation_user.user.dept.blank?)
        child_desc = child_code.find { |desc| desc.name == operation_user.user.dept}
        prod_dept = child_desc.description if child_desc
      end

      results.push({
        :user => {:id => operation_user.user_id ? operation_user.user_id : '', :name => operation_user.user.name ? operation_user.user.name : ''},
        :user_name =>  operation_user.user.name ? operation_user.user.name : '',
        :prod_dept => prod_dept
      })
    end

    results
  EOS
  
  in_params :operation_id
  out_params :user
end

# 작업자 추가/삭제
DiySelection.setup domain, :UpdateOperationsUsers, {:script_type => 'DSL', :view_type => 'LIST'} do
  @service_logic = <<-EOS
  check_required_params(params, ['modified_users', 'removed_users', 'operation_id'])

    modified_users = ActiveSupport::JSON.decode(params[:modified_users])
    removed_users = ActiveSupport::JSON.decode(params[:removed_users])
    operation_id = params[:operation_id]

    modified_users.each do |modified_user|
      data = {
        :operation_id => operation_id,
        :user_id => modified_user['user_id']
      }
      operations_users = OperationsUsers.where("operation_id = ? and user_id = ?", operation_id, modified_user['user_id']).first
      if(!operations_users)
        operations_users = OperationsUsers.new(data)
        operations_users.save!
      end
    end

    removed_users.each do |removed_user|

      remove_operations_users = OperationsUsers.delete_all(["operation_id = ? and user_id = ?", operation_id, removed_user['user_id']])

    end

    {"success" => true, "message" => "Success"}
  EOS
  
  in_params :modified_users
  in_params :removed_users
  in_params :operation_id
  out_params :success
  out_params :message
end

DiySelection.setup domain, :MHSummary, {:script_type => 'DSL-SQL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  from_date = params['work_date-gte'] unless(params['work_date-gte'].blank?)
  to_date = params['work_date-lte'] unless(params['work_date-lte'].blank?)
  workcenter_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
  main_op_flag = params['main_op_flag-eq'] unless(params['main_op_flag-eq'].blank?)

  from_date = parse_date(from_date)
  to_date = parse_date(to_date)

  conditions = ["order_date between ? and ?"]
  conditions.push(from_date)
  conditions.push(to_date)

  conditions[0] << " and operations.main_op_flag = 1" if(main_op_flag)
  con = wc_op_mc_assoc_condition(params, conditions)

  select = 
   "workcenters.name workcenter,
    operations.name operation,
    operations.description operation_desc,
    SUM(prod_orders.order_qty) plan_qty,
    SUM(prod_orders.actual_qty) actual_qty,
    DECODE(SUM(prod_orders.worktime), NULL, 0, SUM(prod_orders.worktime)) machine_hour,
    DECODE(SUM(wt.work_term), NULL, 0, SUM(wt.work_term)) work_term,
    DECODE(SUM(wt.loss_term), NULL, 0, SUM(wt.loss_term)) loss_term \n"

  join_str = 
    "INNER JOIN (
      SELECT 
        prod_order_id, SUM(work_term) work_term, SUM(loss_term) loss_term
      FROM 
        worker_times
      WHERE
        work_date between DATE'\#{from_date}' and DATE'\#{to_date}'
      GROUP BY prod_order_id) wt 
      ON wt.prod_order_id = prod_orders.id"

  group_str = "workcenters.name, operations.name, operations.description"

  domain.prod_orders.select(select).where(con).joins(join_str, :workcenter, :operation).group(group_str).order("operation").to_sql
  EOS
  
  in_params 'work_date-gte'
  in_params 'work_date-lte'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  
  out_params :workcenter
  out_params :operation
  out_params :operation_desc
  out_params :plan_qty
  out_params :actual_qty
  out_params :machine_hour
  out_params :achv_rate
  out_params :work_term
  out_params :loss_term
  out_params :real_worktime
  out_params :unit_per_hour
  out_params :unit_per_m_h
  
end

# TODO Oracle Dependency 제거 필요 
DiySelection.setup domain, :MachineLossState2, {:script_type => 'DSL', :view_type => 'LIST'} do
  @service_logic = <<-EOS
  domain = self.domain
  year = params['plan_year-eq'] unless(params['plan_year-eq'].blank?)
  month = params['plan_month-eq'] unless(params['plan_month-eq'].blank?)
  comparison_year = params['comparison_year-eq'] unless(params['comparison_year-eq'].blank?)
  comparison_month = params['comparison_month-eq'] unless(params['comparison_month-eq'].blank?)
  operation = params['operation.name-eq'] unless(params['operation.name-eq'].blank?)
  machine = params['machine.name-eq'] unless(params['machine.name-eq'].blank?)
  workcenter = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
  loss_type = params['loss_type'] unless(params['loss_type'].blank?)
  conditions = ["id is not null"]

  con = wc_op_mc_assoc_condition(params, conditions)

  current_start_day = ''
  current_last_day = ''
  before_start_day = ''
  before_last_day = ''

  if(year && month && comparison_year && comparison_month)
    current_start_day = Date.parse(year + month + '01').beginning_of_month.strftime('%Y%m%d')
    current_last_day = Date.parse(year + month + '01').end_of_month.strftime('%Y%m%d')
    before_start_day = Date.parse(comparison_year + comparison_month + '01').beginning_of_month.strftime('%Y%m%d')
    before_last_day = Date.parse(comparison_year + comparison_month + '01').end_of_month.strftime('%Y%m%d')

    con[0] << " and to_char(work_date, 'YYYYMMDD') between ? and ? or to_char(work_date, 'YYYYMMDD') between ? and ?"
    con.push(current_start_day, current_last_day, before_start_day, before_last_day)
  end

  if(loss_type == 'loss_count')
    machine_losses = domain.machine_losses.select("to_char(work_date, 'YYYY') year, to_char(work_date, 'MM') month, to_char(work_date, 'DD') day, count(*) count").where(con).group("to_char(work_date, 'YYYY'), to_char(work_date, 'MM'), to_char(work_date, 'DD')").order("to_char(work_date, 'YYYY'), to_char(work_date, 'MM'), to_char(work_date, 'DD')")
  else
    machine_losses = domain.machine_losses.select("to_char(work_date, 'YYYY') year, to_char(work_date, 'MM') month, to_char(work_date, 'DD') day, sum(loss_term) count").where(con).group("to_char(work_date, 'YYYY'), to_char(work_date, 'MM'), to_char(work_date, 'DD')").order("to_char(work_date, 'YYYY'), to_char(work_date, 'MM'), to_char(work_date, 'DD')")
  end

  this_month = []
  last_month = []
  this_month_total = 0;
  last_month_total = 0;

  machine_losses.each do |machine_loss|
    if(machine_loss.month == month && machine_loss.year == year)
      this_month.push({
        :year => machine_loss.year,
        :month => machine_loss.month,
        :day => machine_loss.day,
        :count => machine_loss.count
      })
      this_month_total += machine_loss.count.to_i
    else
      last_month.push({
        :year => machine_loss.year,
        :month => machine_loss.month,
        :day => machine_loss.day,
        :count => machine_loss.count
      })
      last_month_total += machine_loss.count.to_i
    end
  end


  data = {}
  items = []

  cal_current_day = (current_last_day.to_i - current_start_day.to_i) +1
  cal_before_day = (before_last_day.to_i - before_start_day.to_i) + 1

  if(this_month.length > 0)

    data1 = {"year" => year }
    data1["month"] = month
    data1["total"] = this_month_total

    1.upto(cal_current_day) do |day_idx| 
      if(day_idx < 10)
        d_idx = "0#{day_idx}"
      else
        d_idx = "#{day_idx}"
      end
      result = this_month.find { |result| result[:day] == d_idx}
      data1["data_#{day_idx}"] = result ? result[:count] : 0
    end

    data2 = {"year" => comparison_year }
    data2["month"] = comparison_month
    data2["total"] = last_month_total

    1.upto(cal_before_day) do |day_idx| 
      if(day_idx < 10)
        d_idx = "0#{day_idx}"
      else
        d_idx = "#{day_idx}"
      end
      result = last_month.find { |result| result[:day] == d_idx}
      data2["data_#{day_idx}"] = result ? result[:count] : 0
    end

    items.push(data1, data2)
    data = {:items => items}
  elsif(last_month.length > 0)
    data1 = {"year" => year }
    data1["month"] = month
    data1["total"] = this_month_total

    1.upto(cal_current_day) do |day_idx| 
      if(day_idx < 10)
        d_idx = "0#{day_idx}"
      else
        d_idx = "#{day_idx}"
      end
      result = this_month.find { |result| result[:day] == d_idx}
      data1["data_#{day_idx}"] = result ? result[:count] : 0
    end

    data2 = {"year" => comparison_year }
    data2["month"] = comparison_month
    data2["total"] = last_month_total

    1.upto(cal_before_day) do |day_idx| 
      if(day_idx < 10)
        d_idx = "0#{day_idx}"
      else
        d_idx = "#{day_idx}"
      end
      result = last_month.find { |result| result[:day] == d_idx}
      data2["data_#{day_idx}"] = result ? result[:count] : 0
    end

    items.push(data1, data2)
    data = {:items => items}
  else

    data1 = {"year" => year }
    data1["month"] = month
    data1["total"] = 0
    1.upto(cal_current_day) { |day_idx| data1["data_#{day_idx}"] = 0 }

    data2 = {"year" => comparison_year }
    data2["month"] = comparison_month
    data2["total"] = 0
    1.upto(cal_before_day) { |day_idx| data2["data_#{day_idx}"] = 0 }

    items.push(data1, data2)
    data = {:items => items}
  end

  data
  EOS
  
  in_params 'plan_year-eq'
  in_params 'plan_month-eq'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  in_params 'loss_type'
  
  out_params :year
  out_params :month
  out_params :total
  out_params :data_1
  out_params :data_2
  out_params :data_3
  out_params :data_4
  out_params :data_5
  out_params :data_6
  out_params :data_7
  out_params :data_8
  out_params :data_9
  out_params :data_10
  out_params :data_11
  out_params :data_12
  out_params :data_13
  out_params :data_14
  out_params :data_15
  out_params :data_16
  out_params :data_17
  out_params :data_18
  out_params :data_19
  out_params :data_20
  out_params :data_21
  out_params :data_22
  out_params :data_23
  out_params :data_24
  out_params :data_25
  out_params :data_26
  out_params :data_27
  out_params :data_28
  out_params :data_29
  out_params :data_30
  out_params :data_31
end

# TODO Oracle Dependency 제거 필요 
DiySelection.setup domain, :MonProdPlan, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  domain = self.domain
  year = params['_q']['plan_year-eq'] unless(params['_q']['plan_year-eq'].blank?)
  month = params['_q']['plan_month-eq'] unless(params['_q']['plan_month-eq'].blank?)
  product = params['_q']['product.name-eq'] unless(params['_q']['product.name-eq'].blank?)

  page = (params[:page] || 1).to_i
  limit = (params[:limit] || 30).to_i
  end_offset = page * limit
  start_offset = end_offset - (limit - 1)

  conditions = "to_char(plan_date, 'YYYYMM') = '#{year + month}'"

  if(product)
    product_id = self.domain.products.find_by_name(product)
    conditions << " and product_id =  '#{product_id.id}'"
  end

  sql = "select * from(select raw_sql_.*, rownum raw_rnum_ from(
       select 
           workcenter_id, 
           product, 
           product_desc, 
           operation, 
           operation_desc
          ,nvl(sum(case when week=1 then total_plan_qty end),0) as w1_plan_qty
          ,nvl(sum(case when week=2 then total_plan_qty end),0) as w2_plan_qty
          ,nvl(sum(case when week=3 then total_plan_qty end),0) as w3_plan_qty
          ,nvl(sum(case when week=4 then total_plan_qty end),0) as w4_plan_qty
          ,nvl(sum(case when week=5 then total_plan_qty end),0) as w5_plan_qty
      from 
  (SELECT 
     to_char(plan_date, 'MM') mm,
     to_char(plan_date, 'W') week, 
     sum(total_plan_qty) total_plan_qty, 
     prod_plans.workcenter_id,
     products.name product, 
     products.description product_desc, 
     operations.name operation, 
     operations.description operation_desc
  FROM prod_plans 
     INNER JOIN products ON products.id = prod_plans.product_id 
     INNER JOIN operations ON operations.id = prod_plans.operation_id 
  WHERE #{conditions} 
  GROUP BY to_char(plan_date, 'MM'), to_char(plan_date, 'W'), prod_plans.workcenter_id, operations.name, operations.description, products.name, products.description
  ORDER BY to_char(plan_date, 'MM'), to_char(plan_date, 'W'), prod_plans.workcenter_id, operations.op_seq, products.name
  )  GROUP BY workcenter_id, operation, operation_desc, product, product_desc ORDER BY workcenter_id, operation, product) raw_sql_ ) where raw_rnum_ between #{start_offset} and #{end_offset}"

  count_sql = "select count(*) count from(select product, product_desc
  ,nvl(sum(case when week=1 then total_plan_qty end),0) as w1_plan_qty
  ,nvl(sum(case when week=2 then total_plan_qty end),0) as w2_plan_qty
  ,nvl(sum(case when week=3 then total_plan_qty end),0) as w3_plan_qty
  ,nvl(sum(case when week=4 then total_plan_qty end),0) as w4_plan_qty
  ,nvl(sum(case when week=5 then total_plan_qty end),0) as w5_plan_qty
  from 
  (SELECT to_char(plan_date, 'MM') mm, to_char(plan_date, 'W') week, 
  sum(total_plan_qty) total_plan_qty, products.name product, products.description product_desc 
  FROM prod_plans 
  INNER JOIN products ON products.id = prod_plans.product_id 
  WHERE #{conditions} 
  GROUP BY to_char(plan_date, 'MM'), to_char(plan_date, 'W'), products.name, products.description) GROUP BY product, product_desc)"

  results = DiySelection.connection.select_all(sql)
  result_counts = DiySelection.connection.select_all(count_sql)

  {"items" => results, "success" => true, "total" => result_counts[0]['count']}
  EOS
  
  in_params 'plan_year-eq'
  in_params 'plan_month-eq'
  in_params 'product.name-eq'
  
  out_params :product
  out_params :product_desc
  out_params :w1_plan_qty
  out_params :w2_plan_qty
  out_params :w3_plan_qty
  out_params :w4_plan_qty
  out_params :w5_plan_qty
  
end

#
# Barcode System Report
#
DiySelection.setup domain, :BarSheepDog, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  sql = "select item_cd, loc_cd, sum(lot_rqty) lot_rqty from (
  SELECT A.ITEM_CD ITEM_CD, C.LOC_CD, A.LOT_RQTY
  FROM (
    barcode.BARCODE_MST A
    LEFT OUTER JOIN barcode.ITEM B ON A.ITEM_CD = B.ITEM_CD
    LEFT OUTER JOIN barcode.LOC C ON A.BASELOC_CD = C.BASELOC_CD AND A.LOC_CD = C.LOC_CD
    LEFT OUTER JOIN barcode.BASELOC D ON A.BASELOC_CD = D.BASELOC_CD
  ) WHERE nvl(D.BASELOC_FG,'%')  IN ('0') AND D.USE_YN = '1'
  ) group by item_cd, loc_cd"

  results = ActiveRecord::Base.connection.execute(sql)
  results
  EOS
  
  out_params :item_cd
  out_params :loc_cd
  out_params :lot_rqty
end

#
# Barcode System Report
#
DiySelection.setup domain, :BarGrByMat, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
    domain = self.domain
    from_date = params['date-gte'] unless(params['date-gte'].blank?)
    to_date = params['date-lte'] unless(params['date-lte'].blank?)
    item_cd = params['item_cd_id'] unless(params['item_cd_id'].blank?)
    loc_cd_from = params['loc_cd_from'] unless(params['loc_cd_from'].blank?)
    loc_cd_to = params['loc_cd_to'] unless(params['loc_cd_to'].blank?)

    page = (params[:page] || 1).to_i
    limit = (params[:limit] || 30).to_i
    end_offset = page * limit
    start_offset = end_offset - (limit - 1)

    from_date = from_date.gsub('-', '')
    to_date = to_date.gsub('-', '')

    sql = 

    "select * from(select raw_sql_.*, rownum raw_rnum_ from(

  SELECT 

    WHI_DT, ITEM_CD, ITEM_NM, ITEM_TP, LOT_SIZE, BOX_QTY, LOT_RQTY IN_QTY, TO_BASE BASELOC_CD, TO_LOC LOC_CD, FROM_BASE OUTBASELOC_CD, FROM_LOC OUTLOC_CD

  FROM ( 

    SELECT 

      SUBSTR(a.whi_dt, 1, 4) || '-' || SUBSTR(a.whi_dt, 5, 2) || '-' || SUBSTR(a.whi_dt, 7, 2) AS WHI_DT,

      a.item_cd AS ITEM_CD,

      b.item_nm AS ITEM_NM,

      b.item_tp AS ITEM_TP,

      a.outbaseloc_cd || ' - ' || c.baseloc_nm as TO_BASE,

      a.outloc_cd || ' - ' || D.loc_nm as TO_LOC,

      a.baseloc_cd || ' - ' || E.baseloc_nm as FROM_BASE,

      a.loc_cd || ' - ' || F.loc_nm as FROM_LOC,

      DECODE(B.LABEL_PRINT_FG, '1', BOX_QTY, '2', PALLET_QTY, '3', CKDBOX_QTY, BOX_QTY) AS LOT_SIZE,

      A.BOXQTY AS BOX_QTY,

      A.QTY AS LOT_RQTY

    FROM (  

        SELECT 

          WHI_DT, ITEM_CD, BASELOC_CD, LOC_CD, OUTBASELOC_CD, OUTLOC_CD, COUNT(*) AS BOXQTY, SUM(LOT_RQTY) AS QTY

        FROM 

          barcode.WHOUSE_IN

        WHERE 

          WHI_DT BETWEEN '#{from_date}' and '#{to_date}'      -- 입고일자

          AND ITEM_CD LIKE NVL('#{item_cd}', '') || '%'               -- 입고품목

          AND OUTLOC_CD LIKE NVL('#{loc_cd_to}', '') || '%'    -- 입고 To LOCATOIN

          AND LOC_CD LIKE NVL('#{loc_cd_from}', '') || '%'             -- 입고 Start LOCATOIN

          -- AND OUTBASELOC_CD LIKE NVL(ARG_BASELOC_CD_TO, '') || '%' and OUTLOC_CD like NVL(ARG_LOC_CD_TO, '') || '%'     -- 입고 To LOCATOIN

          -- AND BASELOC_CD LIKE NVL(ARG_BASELOC_CD_FROM, '') || '%' and LOC_CD like NVL(ARG_LOC_CD_FROM, '') || '%'         -- 입고 Start Location

        GROUP BY 

          WHI_DT, ITEM_CD, BASELOC_CD, LOC_CD, OUTBASELOC_CD, OUTLOC_CD 

      ) A, 

      barcode.ITEM B, barcode.BASELOC c, barcode.LOC d, barcode.BASELOC e, barcode.LOC f

    WHERE 

      a.item_cd = b.item_cd

      and a.outbaseloc_cd = c.baseloc_cd

      and ( a.outbaseloc_cd = d.baseloc_cd and a.outloc_cd = d.loc_cd )

      and a.baseloc_cd = e.baseloc_cd

      and ( a.baseloc_cd = f.baseloc_cd and a.loc_cd = f.loc_cd )

    )

  )raw_sql_ ) where raw_rnum_ between #{start_offset} and #{end_offset}"

    count_sql = 
    "SELECT
         count(*) count
      FROM 
         barcode.ITEM B, 
         barcode.BASELOC c, 
         barcode.LOC d, 
         barcode.BASELOC e, 
         barcode.LOC f,
        (SELECT
            WHI_DT, ITEM_CD, BASELOC_CD, LOC_CD, OUTBASELOC_CD, OUTLOC_CD, COUNT(*) AS BOXQTY, SUM(LOT_RQTY) AS QTY
         FROM
             barcode.WHOUSE_IN
         WHERE
             WHI_DT BETWEEN '#{from_date}' and '#{to_date}'     -- 입고일자
             AND ITEM_CD LIKE NVL('#{item_cd}', '') || '%'     -- 입고품목
             AND OUTLOC_CD LIKE NVL('#{loc_cd_to}', '') || '%'    -- 입고 To LOCATOIN
             AND LOC_CD LIKE NVL('#{loc_cd_from}', '') || '%'             -- 입고 Start LOCATOIN
          -- AND OUTBASELOC_CD LIKE NVL(ARG_BASELOC_CD_TO, '') || '%' and OUTLOC_CD like NVL(ARG_LOC_CD_TO, '') || '%'     -- 입고 To LOCATOIN
          -- AND BASELOC_CD LIKE NVL(ARG_BASELOC_CD_FROM, '') || '%' and LOC_CD like NVL(ARG_LOC_CD_FROM, '') || '%'         -- 입고 Start Location
         GROUP BY
             WHI_DT, ITEM_CD, BASELOC_CD, LOC_CD, OUTBASELOC_CD, OUTLOC_CD
        ) A

       WHERE
           a.item_cd = b.item_cd
           and a.outbaseloc_cd = c.baseloc_cd
           and ( a.outbaseloc_cd = d.baseloc_cd and a.outloc_cd = d.loc_cd )
           and a.baseloc_cd = e.baseloc_cd
           and ( a.baseloc_cd = f.baseloc_cd and a.loc_cd = f.loc_cd )"

    results = DiySelection.connection.select_all(sql)
    result_counts = DiySelection.connection.select_all(count_sql)

    {"items" => results, "success" => true, "total" => result_counts[0]['count']}
  EOS
  
  in_params 'date-gte'
  in_params 'date-lte'
  in_params 'supplier.name-eq'
  in_params 'loc_cd'
  in_params 'item_cd_id'
  in_params 'invoice_no'
  in_params 'po_no'
  in_params 'internal_1'
  in_params 'internal_2'
  in_params 'internal_3'
  
  out_params :bill_dt
  out_params :bill_nb
  out_params :tr_cd
  out_params :invoice_no
  out_params :po_no
  out_params :item_cd
  out_params :item_nm
  out_params :item_tp
  out_params :baseloc_cd
  out_params :loc_cd
  out_params :lot_size
  out_params :box_qty
  out_params :in_qty
end

#
# Barcode System Report
#
DiySelection.setup domain, :BarGrBySer, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
    domain = self.domain
    from_date = params['date-gte'] unless(params['date-gte'].blank?)
    to_date = params['date-lte'] unless(params['date-lte'].blank?)
    item_cd = params['item_cd_id'] unless(params['item_cd_id'].blank?)
    loc_cd_from = params['loc_cd_from'] unless(params['loc_cd_from'].blank?)
    loc_cd_to = params['loc_cd_to'] unless(params['loc_cd_to'].blank?)

    page = (params[:page] || 1).to_i
    limit = (params[:limit] || 30).to_i
    end_offset = page * limit
    start_offset = end_offset - (limit - 1)

    sql = "select * from(select raw_sql_.*, rownum raw_rnum_ from(
  SELECT 
    WHI_DT, ITEM_CD, ITEM_NM, ITEM_TP, SERIAL, LOT_SIZE, LOT_RQTY, TO_BASE LOC_CD, TO_LOC LOC_NM, FROM_BASE OUTLOC_CD, FROM_LOC OUTLOC_NM
  FROM (
    select 
      SUBSTR(a.whi_dt, 1, 4) || '-' || SUBSTR(a.whi_dt, 5, 2) || '-' || SUBSTR(a.whi_dt, 7, 2) AS WHI_DT,
      a.item_cd AS ITEM_CD, b.item_nm AS ITEM_NM, b.item_tp AS ITEM_TP,
      a.outbaseloc_cd || ' - ' || c.baseloc_nm as TO_BASE,
      a.outloc_cd || ' - ' || D.loc_nm as TO_LOC,
      a.baseloc_cd || ' - ' || E.baseloc_nm as FROM_BASE,
      a.loc_cd || ' - ' || F.loc_nm as FROM_LOC,
      a.lot_qty as LOT_SIZE,
      case 
        when 
          instr(a.barcode, '|' ) = 9
        then 
          substr(a.barcode, 1, instr(a.barcode, '|', 1) - 1) || '-' || substr(a.barcode,  instr(a.barcode, '|', 1, 1) + 1, instr(a.barcode, '|', 1, 2) - (instr(a.barcode, '|', 1, 1) + 1))  || '-' ||  substr(a.barcode,  instr(a.barcode, '|', 1, 4) + 1, instr(a.barcode, '|', 1, 5) - (instr(a.barcode, '|', 1, 4) + 1))
        when 
          instr(a.barcode, '|' ) = 18
        then 
          substr(a.barcode, 7, 8) || '-' || substr(a.barcode,  instr(a.barcode, '|', 1, 2) + 1, instr(a.barcode, '|', 1, 3) - (instr(a.barcode, '|', 1, 2) + 1)     )  || '-' ||  substr(a.barcode,  instr(a.barcode, '|', 1, 5) + 1, instr(a.barcode, '|', 1, 6) - (instr(a.barcode, '|', 1, 5) + 1))
      end as serial,
      a.lot_rqty
    from 
      barcode.whouse_in a, barcode.item b, barcode.baseloc c, barcode.loc d, barcode.baseloc e, barcode.loc f
    where 
      a.item_cd = b.item_cd
      and a.outbaseloc_cd = c.baseloc_cd
      and ( a.outbaseloc_cd = d.baseloc_cd and a.outloc_cd = d.loc_cd )
      and a.baseloc_cd = e.baseloc_cd
      and ( a.baseloc_cd = f.baseloc_cd and a.loc_cd = f.loc_cd )
      and a.whi_dt between '#{from_date}' and '#{to_date}'      -- 입고일자
      and a.item_cd like NVL('#{item_cd}', '') || '%'                       -- 입고품목
      and a.loc_cd like NVL('#{loc_cd_from}', '') || '%'                 -- 입고 Start Location
      and a.outloc_cd like NVL('#{loc_cd_to}', '') || '%'               -- 입고 To LOCATOIN
      -- and a.baseloc_cd like NVL(ARG_BASELOC_CD_FROM, '') || '%'  and a.loc_cd like NVL(ARG_LOC_CD_FROM, '') || '%'       -- 입고 Start Location
      -- and a.outbaseloc_cd like NVL(ARG_BASELOC_CD_TO, '') || '%' and a.outloc_cd like NVL(ARG_LOC_CD_TO, '') || '%')        -- 입고 To LOCATOIN
    ORDER BY 
      WHI_DT, ITEM_CD, FROM_BASE, FROM_LOC, TO_BASE, TO_LOC, SERIAL
  )
    ) raw_sql_ ) where raw_rnum_ between #{start_offset} and #{end_offset}"

    count_sql = "  select 
      count(*) count
    from 
      barcode.whouse_in a, barcode.item b, barcode.baseloc c, barcode.loc d, barcode.baseloc e, barcode.loc f
    where 
      a.item_cd = b.item_cd
      and a.outbaseloc_cd = c.baseloc_cd
      and ( a.outbaseloc_cd = d.baseloc_cd and a.outloc_cd = d.loc_cd )
      and a.baseloc_cd = e.baseloc_cd
      and ( a.baseloc_cd = f.baseloc_cd and a.loc_cd = f.loc_cd )
      and a.whi_dt between '#{from_date}' and '#{to_date}'      -- 입고일자
      and a.item_cd like NVL('#{item_cd}', '') || '%'          -- 입고품목
      and a.loc_cd like NVL('#{loc_cd_from}', '') || '%'                 -- 입고 Start Location
      and a.outloc_cd like NVL('#{loc_cd_to}', '') || '%'               -- 입고 To LOCATOIN
      -- and a.baseloc_cd like NVL(ARG_BASELOC_CD_FROM, '') || '%'  and a.loc_cd like NVL(ARG_LOC_CD_FROM, '') || '%'       -- 입고 Start Location
      -- and a.outbaseloc_cd like NVL(ARG_BASELOC_CD_TO, '') || '%'  and a.outloc_cd like NVL(ARG_LOC_CD_TO, '') || '%')       -- 입고 To LOCATOIN"

    results = DiySelection.connection.select_all(sql)
    result_counts = DiySelection.connection.select_all(count_sql)

    {"items" => results, "success" => true, "total" => result_counts[0]['count']}
  EOS
  
  in_params 'date-gte'
  in_params 'date-lte'
  in_params 'supplier.name-eq'
  in_params 'loc'
  in_params 'item_cd_id'
  in_params 'invoice_no'
  in_params 'po_no'
  in_params 'internal_1'
  in_params 'internal_2'
  in_params 'internal_3'
  in_params 'lot_no'
  in_params 'serial_no'
  
  out_params :wh_dt
  out_params :bill_nb
  out_params :tr_cd
  out_params :invoice_no
  out_params :po_no
  out_params :item_cd
  out_params :item_nm
  out_params :item_tp
  out_params :internal
  out_params :objects
  out_params :lot_no
  out_params :serial
  out_params :lot_size
  out_params :lot_rqty
  out_params :baseloc_cd
  out_params :loc_cd
  out_params :reg_dtm
end

#
# Barcode System Report
#
DiySelection.setup domain, :BarGiBySer, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
    from_date = params['date-gte'] unless(params['date-gte'].blank?)
    to_date = params['date-lte'] unless(params['date-lte'].blank?)
    item_cd = params['item_cd'] unless(params['item_cd'].blank?)
    loc_cd_from = params['loc_cd_from'] unless(params['loc_cd_from'].blank?)
    loc_cd_to = params['loc_cd_to'] unless(params['loc_cd_to'].blank?)
    lot_no = params['lot_no'] unless(params['lot_no'].blank?)
    serial = params['serial'] unless(params['serial'].blank?)

    page = (params[:page] || 1).to_i
    limit = (params[:limit] || 30).to_i
    end_offset = page * limit
    start_offset = end_offset - (limit - 1)

    from_date = from_date.gsub('-', '')
    to_date = to_date.gsub('-', '')

    # conditions = "A.WHI_DT BETWEEN to_char(to_date('#{from_date}', 'yyyy-mm-dd'), 'yyyymmdd') AND to_char(to_date('#{to_date}', 'yyyy-mm-dd'), 'yyyymmdd')"

    # conditions << " AND A.ITEM_CD LIKE '#{item_cd}%'" if(item_cd)

    # conditions << " AND A.LOC_CD LIKE '#{loc_cd}%' " if(loc_cd)

    # conditions << " AND A.OUTLOC_CD LIKE '#{t_loc_cd}%' " if(t_loc_cd)

    # conditions << " AND H.LOT_NO LIKE '#{lot_no}%' " if(lot_no)

    # conditions << " AND H.SERIAL_NO LIKE '#{serial}%' " if(serial)

    sql = "select * from(select raw_sql_.*, rownum raw_rnum_ from(
  SELECT 
    WHI_DT, ITEM_CD, ITEM_NM, ITEM_TP, SERIAL, LOT_SIZE, LOT_RQTY, TO_BASE LOC_CD, TO_LOC LOC_NM, FROM_BASE OUTLOC_CD, FROM_LOC OUTLOC_NM
  FROM (
    select 
      SUBSTR(a.whi_dt, 1, 4) || '-' || SUBSTR(a.whi_dt, 5, 2) || '-' || SUBSTR(a.whi_dt, 7, 2) AS WHI_DT,
      a.item_cd AS ITEM_CD, b.item_nm AS ITEM_NM, b.item_tp AS ITEM_TP,
      a.outbaseloc_cd || ' - ' || c.baseloc_nm as TO_BASE,
      a.outloc_cd || ' - ' || D.loc_nm as TO_LOC,
      a.baseloc_cd || ' - ' || E.baseloc_nm as FROM_BASE,
      a.loc_cd || ' - ' || F.loc_nm as FROM_LOC,
      a.lot_qty as LOT_SIZE,
      case 
        when 
          instr(a.barcode, '|' ) = 9
        then 
          substr(a.barcode, 1, instr(a.barcode, '|', 1) - 1) || '-' || substr(a.barcode,  instr(a.barcode, '|', 1, 1) + 1, instr(a.barcode, '|', 1, 2) - (instr(a.barcode, '|', 1, 1) + 1))  || '-' ||  substr(a.barcode,  instr(a.barcode, '|', 1, 4) + 1, instr(a.barcode, '|', 1, 5) - (instr(a.barcode, '|', 1, 4) + 1))
        when 
          instr(a.barcode, '|' ) = 18
        then 
          substr(a.barcode, 7, 8) || '-' || substr(a.barcode,  instr(a.barcode, '|', 1, 2) + 1, instr(a.barcode, '|', 1, 3) - (instr(a.barcode, '|', 1, 2) + 1)     )  || '-' ||  substr(a.barcode,  instr(a.barcode, '|', 1, 5) + 1, instr(a.barcode, '|', 1, 6) - (instr(a.barcode, '|', 1, 5) + 1))
      end as serial,
      a.lot_rqty
    from 
      barcode.whouse_in a, barcode.item b, barcode.baseloc c, barcode.loc d, barcode.baseloc e, barcode.loc f
    where 
      a.item_cd = b.item_cd
      and a.outbaseloc_cd = c.baseloc_cd
      and ( a.outbaseloc_cd = d.baseloc_cd and a.outloc_cd = d.loc_cd )
      and a.baseloc_cd = e.baseloc_cd
      and ( a.baseloc_cd = f.baseloc_cd and a.loc_cd = f.loc_cd )
      and a.whi_dt between '#{from_date}' and '#{to_date}'                  -- 입고일자
      and a.item_cd like NVL('#{item_cd}', '') || '%'                                   -- 입고품목
      and a.loc_cd like NVL('#{loc_cd_from}', '') || '%'                             -- 입고 Start Location
      and a.outloc_cd like NVL('#{loc_cd_to}', '') || '%'                            -- 입고 To LOCATOIN
      -- and a.baseloc_cd like NVL(ARG_BASELOC_CD_FROM, '') || '%' and a.loc_cd like NVL(ARG_LOC_CD_FROM, '') || '%'       -- 입고 Start Location
      -- and a.outbaseloc_cd like NVL(ARG_BASELOC_CD_TO, '') || '%' and a.outloc_cd like NVL(ARG_LOC_CD_TO, '') || '%')       -- 입고 To LOCATOIN
    ORDER BY 
      WHI_DT, ITEM_CD, FROM_BASE, FROM_LOC, TO_BASE, TO_LOC, SERIAL
  )
    ) raw_sql_ ) where raw_rnum_ between #{start_offset} and #{end_offset}"

    count_sql = "  select 
      count(*) count
    from 
      barcode.whouse_in a, barcode.item b, barcode.baseloc c, barcode.loc d, barcode.baseloc e, barcode.loc f
    where 
      a.item_cd = b.item_cd
      and a.outbaseloc_cd = c.baseloc_cd
      and ( a.outbaseloc_cd = d.baseloc_cd and a.outloc_cd = d.loc_cd )
      and a.baseloc_cd = e.baseloc_cd
      and ( a.baseloc_cd = f.baseloc_cd and a.loc_cd = f.loc_cd )
      and a.whi_dt between '#{from_date}' and '#{to_date}'                  -- 입고일자
      and a.item_cd like NVL('#{item_cd}', '') || '%'                                   -- 입고품목
      and a.loc_cd like NVL('#{loc_cd_from}', '') || '%'                             -- 입고 Start Location
      and a.outloc_cd like NVL('#{loc_cd_to}', '') || '%'                            -- 입고 To LOCATOIN
      -- and a.baseloc_cd like NVL(ARG_BASELOC_CD_FROM, '') || '%'  and a.loc_cd like NVL(ARG_LOC_CD_FROM, '') || '%'       -- 입고 Start Location
      -- and a.outbaseloc_cd like NVL(ARG_BASELOC_CD_TO, '') || '%'  and a.outloc_cd like NVL(ARG_LOC_CD_TO, '') || '%')       -- 입고 To LOCATOIN"

    results = DiySelection.connection.select_all(sql)
    result_counts = DiySelection.connection.select_all(count_sql)

    {"items" => results, "success" => true, "total" => result_counts[0]['count']}
  EOS
  
  in_params 'date-gte'
  in_params 'date-lte'
  in_params 'item_cd'
  in_params 'loc_cd'
  in_params 't_loc_cd'
  in_params 'lot_no'
  in_params 'serial'
  
  out_params :whi_dt
  out_params :item_cd
  out_params :item_nm
  out_params :internal
  out_params :serial
  out_params :lot_size
  out_params :lot_rqty
  out_params :loc_nm
  out_params :loc_cd
  out_params :outloc_nm
  out_params :outloc_cd
  out_params :reg_dtm
  out_params :object
  out_params :lot_no
end

#
# Barcode System Report
#
DiySelection.setup domain, :BarGiByMat, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
    from_date = params['date-gte'] unless(params['date-gte'].blank?)
    to_date = params['date-lte'] unless(params['date-lte'].blank?)
    item_cd = params['item_cd'] unless(params['item_cd'].blank?)
    loc_cd_from = params['loc_cd_from'] unless(params['loc_cd_from'].blank?)
    loc_cd_to = params['loc_cd_to'] unless(params['loc_cd_to'].blank?)

    page = (params[:page] || 1).to_i
    limit = (params[:limit] || 30).to_i
    end_offset = page * limit
    start_offset = end_offset - (limit - 1)

    from_date = from_date.gsub('-', '')
    to_date = to_date.gsub('-', '')

    # conditions = "A.WHI_DT BETWEEN to_char(to_date('#{from_date}', 'yyyy-mm-dd'), 'yyyymmdd') AND to_char(to_date('#{to_date}', 'yyyy-mm-dd'), 'yyyymmdd')"

    # conditions << " AND A.ITEM_CD LIKE '#{item_cd}%'" if(item_cd)

    # conditions << " AND A.LOC_CD LIKE '#{loc_cd}%' " if(loc_cd)

    # conditions << " AND A.OUTLOC_CD LIKE '#{t_loc_cd}%' " if(t_loc_cd)

    sql = 

    "select * from(select raw_sql_.*, rownum raw_rnum_ from(

  SELECT 
    SUBSTR(WIN.WHI_DT, 1, 4) || '-' || SUBSTR(WIN.WHI_DT, 5, 2)  || '-' || SUBSTR(WIN.WHI_DT, 7, 2) AS WHI_DT,
    WIN.ITEM_CD, A.ITEM_NM, A.ITEM_TP, 
    CASE 
      WHEN 
        A.LABEL_PRINT_FG = '1' 
      THEN 
        A.BOX_QTY
      WHEN 
        A.LABEL_PRINT_FG = '2' 
      THEN 
        A.PALLET_QTY
      WHEN 
        A.LABEL_PRINT_FG = '3' 
      THEN 
        A.CKDBOX_QTY
      ELSE 
        0 
    END AS LOT_SIZE,
    WIN.BOX_QTY, WIN.LOT_RQTY, WIN.BASELOC_CD || ' - ' || D.BASELOC_NM AS BASELOC_CD,
    WIN.LOC_CD || ' - ' || E.LOC_NM AS LOC_CD,
    WIN.OUTBASELOC_CD  || ' - ' || B.BASELOC_NM AS OUTBASELOC_CD,
    WIN.OUTLOC_CD || ' - ' || C.LOC_NM AS OUTLOC_CD       
  FROM
    (SELECT 
      A.WHI_DT, A.LOT_FG, A.ITEM_CD, A.BASELOC_CD, A.LOC_CD, A.OUTBASELOC_CD, 
      A.OUTLOC_CD, SUM(A.LOT_RQTY) AS LOT_RQTY, COUNT(*) AS BOX_QTY
    FROM 
      barcode.WHOUSE_OUT A
    WHERE 
      A.WHI_DT BETWEEN '#{from_date}' AND '#{to_date}'                                         -- 출고일자
      AND A.ITEM_CD LIKE NVL('#{item_cd}', '') || '%'                                                    -- 품목
      AND A.LOC_CD LIKE NVL('#{loc_cd_from}', '') || '%'                                             -- 출고 start location
      AND A.OUTLOC_CD LIKE NVL('#{loc_cd_to}', '' ) || '%'                                        -- 출고 to  location
      -- AND A.BASELOC_CD LIKE NVL(ARG_BASELOC_CD_FROM, '') || '%'       -- 출고 start base location
      -- AND A.LOC_CD LIKE NVL(ARG_LOC_CD_FROM, '') || '%'                            -- 출고 start location
      -- AND A.OUTBASELOC_CD LIKE NVL(ARG_BASELOC_CD_TO, '' ) || '%'    -- 출고 to base location
      -- AND A.OUTLOC_CD LIKE NVL(ARG_LOC_CD_TO, '' ) || '%'                         -- 출고 to  location
    GROUP BY 
      A.WHI_DT, A.LOT_FG, A.ITEM_CD, A.BASELOC_CD, A.LOC_CD, A.OUTBASELOC_CD, A.OUTLOC_CD 
    ) WIN
    LEFT JOIN barcode.ITEM A ON WIN.ITEM_CD = A.ITEM_CD
    LEFT JOIN barcode.BASELOC B ON WIN.OUTBASELOC_CD = B.BASELOC_CD
    LEFT JOIN barcode.LOC C ON WIN.OUTLOC_CD = C.LOC_CD AND WIN.OUTBASELOC_CD = C.BASELOC_CD
    LEFT JOIN barcode.BASELOC D ON WIN.BASELOC_CD = D.BASELOC_CD
    LEFT JOIN barcode.LOC E ON WIN.LOC_CD = E.LOC_CD AND WIN.BASELOC_CD = E.BASELOC_CD
    LEFT JOIN barcode.COMMON_CODE F ON WIN.LOT_FG = F.COMM_CD AND F.COMM_FG = '87'
  ORDER BY 
    WIN.WHI_DT, WIN.ITEM_CD, WIN.OUTBASELOC_CD, WIN.OUTLOC_CD

    )raw_sql_ ) where raw_rnum_ between #{start_offset} and #{end_offset}"

    count_sql = 
    "SELECT 
         count(*) count     
     FROM
        (SELECT 
            A.WHI_DT, A.LOT_FG, A.ITEM_CD, A.BASELOC_CD, A.LOC_CD, A.OUTBASELOC_CD, 
            A.OUTLOC_CD, SUM(A.LOT_RQTY) AS LOT_RQTY, COUNT(*) AS BOX_QTY
        FROM 
            barcode.WHOUSE_OUT A
        WHERE 
            A.WHI_DT BETWEEN '#{from_date}' AND '#{to_date}'                                        -- 출고일자
            AND A.ITEM_CD LIKE NVL('#{item_cd}', '') || '%'                                                    -- 품목
            AND A.LOC_CD LIKE NVL('#{loc_cd_from}', '') || '%'                                             -- 출고 start location
            AND A.OUTLOC_CD LIKE NVL('#{loc_cd_to}', '' ) || '%'                                        -- 출고 to  location
           -- AND A.BASELOC_CD LIKE NVL(ARG_BASELOC_CD_FROM, '') || '%'       -- 출고 start base location
           -- AND A.LOC_CD LIKE NVL(ARG_LOC_CD_FROM, '') || '%'                            -- 출고 start location
           -- AND A.OUTBASELOC_CD LIKE NVL(ARG_BASELOC_CD_TO, '' ) || '%'    -- 출고 to base location
           -- AND A.OUTLOC_CD LIKE NVL(ARG_LOC_CD_TO, '' ) || '%'                         -- 출고 to  location
        GROUP BY 
           A.WHI_DT, A.LOT_FG, A.ITEM_CD, A.BASELOC_CD, A.LOC_CD, A.OUTBASELOC_CD, A.OUTLOC_CD 
        ) WIN
        LEFT JOIN barcode.ITEM A ON WIN.ITEM_CD = A.ITEM_CD
        LEFT JOIN barcode.BASELOC B ON WIN.OUTBASELOC_CD = B.BASELOC_CD
        LEFT JOIN barcode.LOC C ON WIN.OUTLOC_CD = C.LOC_CD AND WIN.OUTBASELOC_CD = C.BASELOC_CD
        LEFT JOIN barcode.BASELOC D ON WIN.BASELOC_CD = D.BASELOC_CD
        LEFT JOIN barcode.LOC E ON WIN.LOC_CD = E.LOC_CD AND WIN.BASELOC_CD = E.BASELOC_CD
        LEFT JOIN barcode.COMMON_CODE F ON WIN.LOT_FG = F.COMM_CD AND F.COMM_FG = '87' "

    results = DiySelection.connection.select_all(sql)
    result_counts = DiySelection.connection.select_all(count_sql)

    {"items" => results, "success" => true, "total" => result_counts[0]['count']}
  EOS
  
  in_params 'date-gte'
  in_params 'date-lte'
  in_params 'item_cd'
  in_params 'loc_cd'
  in_params 't_loc_cd'
  
  out_params :whi_dt
  out_params :item_cd
  out_params :item_nm
  out_params :item_tp
  out_params :lot_size
  out_params :box_qty
  out_params :lot_rqty
  out_params :baseloc_cd
  out_params :loc_cd
  out_params :outbaseloc_cd
  out_params :outloc_cd
end

lineStopTop10Selection = DiySelection.setup domain, :LineStopTop10, {:script_type => 'DSL-SQL', :view_type => 'LIST'} do
  @service_logic = <<-EOS2
  from_date = params['work_date-gte'] unless(params['work_date-gte'].blank?)
    to_date = params['work_date-lte'] unless(params['work_date-lte'].blank?)
    workcenter_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
    operation_name = params['operation.name-eq'] unless(params['operation.name-eq'].blank?)
    grid_type = params['grid_type'] unless(params['grid_type'].blank?)
    bd_code = params['breakdown_code-eq'] unless(params['breakdown_code-eq'].blank?)

    condition = ["machine_losses.status = ?"]
    condition.push("2")

    from_date = parse_date(from_date)
    to_date = parse_date(to_date)

    condition[0] << ' and machine_losses.work_date between ? and ?'
    condition.push(from_date, to_date)

    if(workcenter_name)
      condition[0] << ' and workcenters.name = ?'
      condition.push(workcenter_name)
    end

    if(operation_name)
      condition[0] << ' and operations.name = ?'
      condition.push(operation_name)
    end

    if(bd_code)
      condition[0] << ' and machine_losses.breakdown_code = ?'
      condition.push(bd_code)
    end

    order = 'count(*) desc'

    order = grid_type + ' desc' if(grid_type)

    select = 'workcenters.name workcenter, operations.name operation, operations.description operation_desc, machines.name machine, machines.description machine_desc, count(*) loss_count, sum(machine_losses.loss_term) loss_term, sum(machine_losses.maint_term) maint_term'
    group = 'workcenters.name, operations.name, operations.description, machines.name, machines.description'

    sql = domain.machine_losses.select(select).where(condition).joins(:workcenter, :operation, :machine).group(group).order(order).to_sql
    sql
  EOS2
  
  in_params 'work_date-gte'
  in_params 'work_date-lte'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  in_params 'grid_type'

  out_params :workcenter
  out_params :operation
  out_params :machine
  out_params :machine_desc
  out_params :loss_count
  out_params :loss_term
  out_params :maint_term
  out_params :operation_desc
end

#  --------------------------------------------------Oracle--------------------------------------------------
machineLossStateSelection = DiySelection.setup domain, :MachineLossState, {:script_type => 'DSL', :view_type => 'LIST'} do
  @service_logic = <<-EOS2
  domain = self.domain
  year = params['plan_year-eq'] unless(params['plan_year-eq'].blank?)
  conparison_year = params['comparison_year-eq'] unless(params['comparison_year-eq'].blank?)
  operation = params['operation.name-eq'] unless(params['operation.name-eq'].blank?)
  machine = params['machine.name-eq'] unless(params['machine.name-eq'].blank?)
  workcenter = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
  loss_type = params['loss_type'] unless(params['loss_type'].blank?)
  conditions = ["id is not null"]

  con = wc_op_mc_assoc_condition(params, conditions)

  if(year && conparison_year )
    con[0] << " and to_char(work_date, 'YYYYMM') between ? and ? or to_char(work_date, 'YYYYMM') between ? and ?"
    con.push((year.to_i).to_s + '01', year + '12')
    con.push((conparison_year .to_i).to_s + '01', conparison_year + '12')
  end

  if(loss_type == 'loss_count')
    machine_losses = domain.machine_losses.select("to_char(work_date, 'YYYY') year, to_char(work_date, 'MM') month, count(*) count").where(con).group("to_char(work_date, 'YYYY'), to_char(work_date, 'MM')").order("to_char(work_date, 'YYYY'), to_char(work_date, 'MM')")
  else
    machine_losses = domain.machine_losses.select("to_char(work_date, 'YYYY') year, to_char(work_date, 'MM') month, sum(loss_term) count").where(con).group("to_char(work_date, 'YYYY'), to_char(work_date, 'MM')").order("to_char(work_date, 'YYYY'), to_char(work_date, 'MM')")
  end

  this_year = []
  last_year = []
  this_year_total = 0;
  last_year_total = 0;

  machine_losses.each do |machine_loss|
    if(machine_loss.year == year)
      this_year.push({
        :year => machine_loss.year,
        :month => machine_loss.month,
        :count => machine_loss.count
      })
      this_year_total += machine_loss.count.to_i
    else
      last_year.push({
        :year => machine_loss.year,
        :month => machine_loss.month,
        :count => machine_loss.count
      })
      last_year_total += machine_loss.count.to_i
    end
  end


  data = {}
  items = []

  if(this_year.length > 0)

    data1 = {"year" => year }
    data1["total"] = this_year_total

    1.upto(12) do |month_idx| 
      if(month_idx < 10)
        mon_idx = "0#{month_idx}"
      else
        mon_idx = "#{month_idx}"
      end
      result = this_year.find { |result| result[:month] == mon_idx}
      data1["data_#{month_idx}"] = result ? result[:count] : 0
    end

    data2 = {"year" => conparison_year }
    data2["total"] = last_year_total

    1.upto(12) do |month_idx| 
      if(month_idx < 10)
        mon_idx = "0#{month_idx}"
      else
        mon_idx = "#{month_idx}"
      end
      result = last_year.find { |result| result[:month] == mon_idx}
      data2["data_#{month_idx}"] = result ? result[:count] : 0
    end

    items.push(data1, data2)
    data = {:items => items}
  else

    data1 = {"year" => year }
    data1["total"] = this_year_total
    1.upto(12) { |month_idx| data1["data_#{month_idx}"] = 0 }

    data2 = {"year" => conparison_year }
    data2["total"] = last_year_total
    1.upto(12) { |month_idx| data2["data_#{month_idx}"] = 0 }

    items.push(data1, data2)
    data = {:items => items}
  end

  data
  EOS2
  
  in_params 'plan_year-eq'
  in_params 'comparison_year-eq'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  in_params 'loss_type'
  
  out_params :year
  out_params :total
  out_params :data_1
  out_params :data_2
  out_params :data_3
  out_params :data_4
  out_params :data_5
  out_params :data_6
  out_params :data_7
  out_params :data_8
  out_params :data_9
  out_params :data_10
  out_params :data_11
  out_params :data_12
end

#
# Barcode System Report
#
DiySelection.setup domain, :BarLoc, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
	# sql = "SELECT comm_cd loc_cd, comm_nme name FROM barcode.BARCODE_MST WHERE COMM_FG = '86' AND live_yn = '1'"
  sql = "SELECT loc_cd loc_cd, concat(loc_cd || ' - ' , loc_nm) name FROM barcode.LOC WHERE use_yn = '1' order by loc_cd"
	results = DiySelection.connection.select_all(sql)
	results
  EOS
  
end

DiySelection.setup domain, :MHSummary2, {:script_type => 'DSL-SQL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  from_date = params['work_date-gte'] unless(params['work_date-gte'].blank?)
  to_date = params['work_date-lte'] unless(params['work_date-lte'].blank?)
  workcenter_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
  main_op_flag = params['main_op_flag-eq'] unless(params['main_op_flag-eq'].blank?)

  from_date = parse_date(from_date)
  to_date = parse_date(to_date)

  conditions = ["order_date between ? and ?"]
  conditions.push(from_date)
  conditions.push(to_date)

  conditions[0] << " and operations.main_op_flag = 1" if(main_op_flag)
  con = wc_op_mc_assoc_condition(params, conditions)

  select = 
   "operations.name operation,  
    operations.description operation_desc,  
    machines.name machine,
    machines.description machine_desc,
    SUM(prod_orders.order_qty) plan_qty,
    SUM(prod_orders.actual_qty) actual_qty,
    DECODE(SUM(prod_orders.worktime), NULL, 0, SUM(prod_orders.worktime)) machine_hour,
    DECODE(SUM(wt.work_term), NULL, 0, SUM(wt.work_term)) work_term,
    DECODE(SUM(wt.loss_term), NULL, 0, SUM(wt.loss_term)) loss_term \n"

  join_str = 
    "INNER JOIN (
      SELECT 
        prod_order_id, SUM(work_term) work_term, SUM(loss_term) loss_term
      FROM 
        worker_times
      WHERE
        work_date between DATE'\#{from_date}' and DATE'\#{to_date}'
      GROUP BY prod_order_id) wt 
      ON wt.prod_order_id = prod_orders.id"

  group_str = "operations.name, operations.description, machines.name, machines.description"

  domain.prod_orders.select(select).where(con).joins(join_str, :operation, :machine).group(group_str).order("machine").to_sql
  EOS
  
  in_params 'work_date-gte'
  in_params 'work_date-lte'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  
  out_params :operation
  out_params :operation_desc
  out_params :machine
  out_params :machine_desc
  out_params :plan_qty
  out_params :actual_qty
  out_params :achv_rate
  out_params :machine_hour
  out_params :sum_work_term
  out_params :sum_loss_term
  out_params :real_worktime
  out_params :unit_per_m_h
  out_params :per_m_h
end

DiySelection.setup domain, :MachineRunTime, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
    from_date = params['work_date-gte'] unless(params['work_date-gte'].blank?)
    to_date = params['work_date-lte'] unless(params['work_date-lte'].blank?)
    workcenter_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
    operation_name = params['operation.name-eq'] unless(params['operation.name-eq'].blank?)
    machine_name = params['machine.name-eq'] unless(params['machine.name-eq'].blank?)
    main_op_flag = params['main_op_flag-eq'] unless(params['main_op_flag-eq'].blank?)

    from_date = parse_date(from_date)
    to_date = parse_date(to_date)

    conditions = ""

    if(!machine_name.blank?)
  	conditions << " and machine_id = (select id from machines where name = '#{machine_name}')"
    elsif(!operation_name.blank?)
  	conditions << " and machine_id in (select id from machines where operation_id = (select id from operations where name = '#{operation_name}'))"           
    elsif(!workcenter_name.blank?)
          main_op_cond = ""
          main_op_cond << " and main_op_flag = 1" if(main_op_flag)
  	conditions << " and machine_id in (select id from machines where operation_id in (select id from operations where workcenter_id = (select id from workcenters where name = '#{workcenter_name}' #{main_op_cond})))"
    else
          if(main_op_flag)
              conditions << " and machine_id in (select id from machines where operation_id in (select id from operations where main_op_flag = 1))" 
          end
    end

    sql = "SELECT
    A.OPERATION, A.OPERATION_DESC, A.MACHINE, A.MACHINE_DESC, A.AVAILABLE_TIME, a.order_qty, a.actual_qty, b.loss_term, B.loss_count, A.run_time, A.HOUR_RATE
  from
  (SELECT 
   PROD_ORDERS.operation_id, OPERATIONS.NAME OPERATION, OPERATIONS.DESCRIPTION OPERATION_DESC, MACHINES.NAME MACHINE, MACHINES.DESCRIPTION MACHINE_DESC, 
   PROD_ORDERS.machine_id, SUM(order_qty) order_qty, SUM(actual_qty) actual_qty, 
   (sum(prod_orders.order_qty) * machines.cycletime) available_time, 
   (sum(prod_orders.actual_qty) * machines.cycletime) run_time, 
   round(DECODE(sum(prod_orders.order_qty) * machines.cycletime, 0, 0, (((sum(prod_orders.actual_qty) * machines.cycletime) / (sum(prod_orders.order_qty) * machines.cycletime)) * 100)), 2) hour_rate
  FROM
   PROD_ORDERS 
  INNER JOIN operations ON operations.id = prod_orders.operation_id 
  INNER JOIN machines ON machines.id = prod_orders.machine_id 
  WHERE
   ORDER_date BETWEEN to_date('#{from_date}', 'yyyy-mm-dd') AND to_date('#{to_date}', 'yyyy-mm-dd') #{conditions}
  GROUP BY
   PROD_ORDERS.operation_id, PROD_ORDERS.machine_id, OPERATIONS.NAME, OPERATIONS.DESCRIPTION, MACHINES.NAME, MACHINES.DESCRIPTION, MACHINES.CYCLETIME
  ORDER BY
   operation_id, machine_id) a

  left outer JOIN 
  (SELECT
   machine_id, SUM(loss_term) loss_term, COUNT(*) loss_count
  FROM
   MACHINE_LOSSES
  WHERE
   work_date BETWEEN to_date('#{from_date}', 'yyyy-mm-dd') AND to_date('#{to_date}', 'yyyy-mm-dd') AND STATUS = '2' #{conditions}
  GROUP BY
   machine_id) b

  ON a.machine_id = b.machine_id"

  results = DiySelection.connection.select_all(sql)
  results
  EOS
  
  in_params 'work_date-gte'
  in_params 'work_date-lte'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  
  out_params :operation
  out_params :operation_desc
  out_params :machine
  out_params :machine_desc
  out_params :available_time
  out_params :order_qty
  out_params :actual_qty
  out_params :loss_term
  out_params :loss_count
  out_params :run_time
  out_params :hour_rate
end

DiySelection.setup domain, :MHSummaryUsers, {:script_type => 'DSL-SQL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  domain = self.domain
  from_date = params['work_date-gte'] unless(params['work_date-gte'].blank?)
  to_date = params['work_date-lte'] unless(params['work_date-lte'].blank?)
  product_name = params['product.name-eq'] unless(params['product.name-eq'].blank?)

  from_date = parse_date(from_date)
  to_date = parse_date(to_date)

  conditions = ["work_date between ? and ?"]
  conditions.push(from_date)
  conditions.push(to_date)

  con = wc_op_mc_assoc_condition(params, conditions)

  if(product_name)
    con[0] << ' and worker_times.product_id = (select id from products where name = ?)'
    con.push(product_name)
  end

  select = 'users.id user_id, sum(worker_times.work_term) sum_work_term, DECODE(sum(worker_times.loss_term), null, 0, sum(worker_times.loss_term)) sum_loss_term, (sum(worker_times.work_term) - DECODE(sum(worker_times.loss_term), null, 0, sum(worker_times.loss_term))) real_worktime'

  sql = domain.worker_times.joins(:user).select(select).where(con).group("users.id").to_sql

  sql
  EOS
  
  in_params 'work_date-gte'
  in_params 'work_date-lte'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  in_params 'product.name-eq'
  
  out_params :user_id
  out_params :real_worktime
  out_params :sum_loss_term
  out_params :sum_work_term
end

DiySelection.setup domain, :ScrapTrendDaily, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  domain = self.domain
  year = params['plan_year-eq'] unless(params['plan_year-eq'].blank?)
  month = params['plan_month-eq'] unless(params['plan_month-eq'].blank?)
  comparison_year = params['comparison_year-eq'] unless(params['comparison_year-eq'].blank?)
  comparison_month = params['comparison_month-eq'] unless(params['comparison_month-eq'].blank?)
  operation = params['operation.name-eq'] unless(params['operation.name-eq'].blank?)
  machine = params['machine.name-eq'] unless(params['machine.name-eq'].blank?)
  workcenter = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
  conditions = ["id is not null"]

  con = wc_op_mc_assoc_condition(params, conditions)

  current_start_day = ''
  current_last_day = ''
  before_start_day = ''
  before_last_day = ''

  if(year && month && comparison_year && comparison_month)
    current_start_day = Date.parse(year + month + '01').beginning_of_month.strftime('%Y%m%d')
    current_last_day = Date.parse(year + month + '01').end_of_month.strftime('%Y%m%d')
    before_start_day = Date.parse(comparison_year + comparison_month + '01').beginning_of_month.strftime('%Y%m%d')
    before_last_day = Date.parse(comparison_year + comparison_month + '01').end_of_month.strftime('%Y%m%d')

    con[0] << " and to_char(work_date, 'YYYYMMDD') between ? and ? or to_char(work_date, 'YYYYMMDD') between ? and ?"
    con.push(current_start_day, current_last_day, before_start_day, before_last_day)
  end

  defects = domain.defects.select("to_char(work_date, 'YYYY') year, to_char(work_date, 'MM') month, to_char(work_date, 'DD') day, sum(defect_qty) count").where(con).group("to_char(work_date, 'YYYY'), to_char(work_date, 'MM'), to_char(work_date, 'DD')").order("to_char(work_date, 'YYYY'), to_char(work_date, 'MM'), to_char(work_date, 'DD')")

  this_month = []
  last_month = []
  this_month_total = 0;
  last_month_total = 0;

  defects.each do |defect|
    if(defect.month == month && defect.year == year)
      this_month.push({
        :year => defect.year,
        :month => defect.month,
        :day => defect.day,
        :count => defect.count
      })
      this_month_total += defect.count.to_i
    else
      last_month.push({
        :year => defect.year,
        :month => defect.month,
        :day => defect.day,
        :count => defect.count
      })
      last_month_total += defect.count.to_i
    end
  end


  data = {}
  items = []

  cal_current_day = (current_last_day.to_i - current_start_day.to_i) +1
  cal_before_day = (before_last_day.to_i - before_start_day.to_i) + 1

  if(this_month.length > 0)

    data1 = {"year" => year }
    data1["month"] = month
    data1["total"] = this_month_total

    1.upto(cal_current_day) do |day_idx| 
      if(day_idx < 10)
        d_idx = "0#{day_idx}"
      else
        d_idx = "#{day_idx}"
      end
      result = this_month.find { |result| result[:day] == d_idx}
      data1["data_#{day_idx}"] = result ? result[:count] : 0
    end

    data2 = {"year" => comparison_year }
    data2["month"] = comparison_month
    data2["total"] = last_month_total

    1.upto(cal_before_day) do |day_idx| 
      if(day_idx < 10)
        d_idx = "0#{day_idx}"
      else
        d_idx = "#{day_idx}"
      end
      result = last_month.find { |result| result[:day] == d_idx}
      data2["data_#{day_idx}"] = result ? result[:count] : 0
    end

    items.push(data1, data2)
    data = {:items => items}
  elsif(last_month.length > 0)
    data1 = {"year" => year }
    data1["month"] = month
    data1["total"] = this_month_total

    1.upto(cal_current_day) do |day_idx| 
      if(day_idx < 10)
        d_idx = "0#{day_idx}"
      else
        d_idx = "#{day_idx}"
      end
      result = this_month.find { |result| result[:day] == d_idx}
      data1["data_#{day_idx}"] = result ? result[:count] : 0
    end

    data2 = {"year" => comparison_year }
    data2["month"] = comparison_month
    data2["total"] = last_month_total

    1.upto(cal_before_day) do |day_idx| 
      if(day_idx < 10)
        d_idx = "0#{day_idx}"
      else
        d_idx = "#{day_idx}"
      end
      result = last_month.find { |result| result[:day] == d_idx}
      data2["data_#{day_idx}"] = result ? result[:count] : 0
    end

    items.push(data1, data2)
    data = {:items => items}
  else

    data1 = {"year" => year }
    data1["month"] = month
    data1["total"] = 0
    1.upto(cal_current_day) { |day_idx| data1["data_#{day_idx}"] = 0 }

    data2 = {"year" => comparison_year }
    data2["month"] = comparison_month
    data2["total"] = 0
    1.upto(cal_before_day) { |day_idx| data2["data_#{day_idx}"] = 0 }

    items.push(data1, data2)
    data = {:items => items}
  end

  data
  EOS
  
  in_params 'plan_year-eq'
  in_params 'plan_month-eq'
  in_params 'comparison_year-eq'
  in_params 'comparison_month-eq'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  
  out_params :year
  out_params :month
  out_params :total
  out_params :data_1
  out_params :data_2
  out_params :data_3
  out_params :data_4
  out_params :data_5
  out_params :data_6
  out_params :data_7
  out_params :data_8
  out_params :data_9
  out_params :data_10
  out_params :data_11
  out_params :data_12
  out_params :data_13
  out_params :data_14
  out_params :data_15
  out_params :data_16
  out_params :data_17
  out_params :data_18
  out_params :data_19
  out_params :data_20
  out_params :data_21
  out_params :data_22
  out_params :data_23
  out_params :data_24
  out_params :data_25
  out_params :data_26
  out_params :data_27
  out_params :data_28
  out_params :data_29
  out_params :data_30
  out_params :data_31
end

DiySelection.setup domain, :ScrapTrendMonthly, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  domain = self.domain
  year = params['plan_year-eq'] unless(params['plan_year-eq'].blank?)
  conparison_year = params['comparison_year-eq'] unless(params['comparison_year-eq'].blank?)
  operation = params['operation.name-eq'] unless(params['operation.name-eq'].blank?)
  machine = params['machine.name-eq'] unless(params['machine.name-eq'].blank?)
  workcenter = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
  conditions = ["id is not null"]

  con = wc_op_mc_assoc_condition(params, conditions)

  if(year && conparison_year )
    con[0] << " and to_char(work_date, 'YYYYMM') between ? and ? or to_char(work_date, 'YYYYMM') between ? and ?"
    con.push((year.to_i).to_s + '01', year + '12')
    con.push((conparison_year .to_i).to_s + '01', conparison_year + '12')
  end

  defects = domain.defects.select("to_char(work_date, 'YYYY') year, to_char(work_date, 'MM') month, sum(defect_qty) count").where(con).group("to_char(work_date, 'YYYY'), to_char(work_date, 'MM')").order("to_char(work_date, 'YYYY'), to_char(work_date, 'MM')")


  this_year = []
  last_year = []
  this_year_total = 0;
  last_year_total = 0;

  defects.each do |defect|
    if(defect.year == year)
      this_year.push({
        :year => defect.year,
        :month => defect.month,
        :count => defect.count
      })
      this_year_total += defect.count.to_i
    else
      last_year.push({
        :year => defect.year,
        :month => defect.month,
        :count => defect.count
      })
      last_year_total += defect.count.to_i
    end
  end


  data = {}
  items = []

  if(this_year.length > 0)

    data1 = {"year" => year }
    data1["total"] = this_year_total

    1.upto(12) do |month_idx| 
      if(month_idx < 10)
        mon_idx = "0#{month_idx}"
      else
        mon_idx = "#{month_idx}"
      end
      result = this_year.find { |result| result[:month] == mon_idx}
      data1["data_#{month_idx}"] = result ? result[:count] : 0
    end

    data2 = {"year" => conparison_year }
    data2["total"] = last_year_total

    1.upto(12) do |month_idx| 
      if(month_idx < 10)
        mon_idx = "0#{month_idx}"
      else
        mon_idx = "#{month_idx}"
      end
      result = last_year.find { |result| result[:month] == mon_idx}
      data2["data_#{month_idx}"] = result ? result[:count] : 0
    end

    items.push(data1, data2)
    data = {:items => items}
  else

    data1 = {"year" => year }
    data1["total"] = this_year_total
    1.upto(12) { |month_idx| data1["data_#{month_idx}"] = 0 }

    data2 = {"year" => conparison_year }
    data2["total"] = last_year_total
    1.upto(12) { |month_idx| data2["data_#{month_idx}"] = 0 }

    items.push(data1, data2)
    data = {:items => items}
  end

  data
  EOS
  
  in_params 'plan_year-eq'
  in_params 'comparison_year-eq'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  
  out_params :year
  out_params :total
  out_params :data_1
  out_params :data_2
  out_params :data_3
  out_params :data_4
  out_params :data_5
  out_params :data_6
  out_params :data_7
  out_params :data_8
  out_params :data_9
  out_params :data_10
  out_params :data_11
  out_params :data_12
end

DiySelection.setup domain, :DefectRateDetail, {:script_type => 'DSL-SQL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  domain = self.domain
  from_date = params['work_date-gte'] unless(params['work_date-gte'].blank?)
  to_date = params['work_date-lte'] unless(params['work_date-lte'].blank?)
  operation_name = params['operation.name-eq'] unless(params['operation.name-eq'].blank?)

  from_date = parse_date(from_date)
  to_date = parse_date(to_date)

  conditions = ["defects.work_date between ? and ?"]
  conditions.push(from_date)
  conditions.push(to_date)

  if(operation_name)
    conditions[0] << " and defects.operation_id = (select id from operations where name = ?)"
    conditions.push(operation_name)
  end

  select = 'defects.work_date work_date, defects.shift shift, operations.name operation, operations.description operation_desc, machines.name machine, machines.description machine_desc, products.name product, products.description product_desc, defects.child_product_id child_product, defect_codes.name defect_code, defect_codes.description defect_code_desc, defects.defect_qty defect_qty, defects.description description'

  sql = domain.defects.select(select).where(conditions).joins(:operation, :machine, :product, :defect_code).to_sql
  sql
  EOS
  
  in_params 'work_date-gte'
  in_params 'work_date-lte'
  in_params 'operation.name-eq'
  
  out_params :work_date
  out_params :shift
  out_params :operation
  out_params :operation_desc
  out_params :machine
  out_params :machine_desc
  out_params :product
  out_params :product_desc
  out_params :child_product
  out_params :defect_code
  out_params :defect_code_desc
  out_params :defect_qty
  out_params :description
end

DiySelection.setup domain, :LineStopDetail, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  domain = self.domain
  from_date = params['work_date-gte'] unless(params['work_date-gte'].blank?)
  to_date = params['work_date-lte'] unless(params['work_date-lte'].blank?)
  operation_name = params['operation.name-eq'] unless(params['operation.name-eq'].blank?)
  machine_name = params['machine.name-eq'] unless(params['machine.name-eq'].blank?)

  conditions = ["machine_losses.work_date between ? and ?"]
  conditions.push(parse_date(from_date))
  conditions.push(parse_date(to_date))

  if(operation_name)
    conditions[0] << " and machine_losses.operation_id = (select id from operations where name = ?)"
    conditions.push(operation_name)
  end

  if(machine_name)
    conditions[0] << " and machine_losses.machine_id = (select id from machines where name = ?)"
    conditions.push(machine_name)
  end

  select = "count(*) loss_count, sum(machine_losses.loss_term) loss_term, sum(machine_losses.maint_term) maint_term, machine_losses.breakdown_code breakdown_code"
  group ="machine_losses.BREAKDOWN_CODE"

  machine_losses = domain.machine_losses.select(select).where(conditions).joins(:operation, :machine).group(group)
  parent_code = domain.common_codes.find_by_name('BREAKDOWN_CODE')
  child_codes = parent_code.codes

  results =[]
  machine_losses.each do |ml|
    child_desc = child_codes.find { |desc| desc.name == ml.breakdown_code}  
    breakdown_code_desc = child_desc ? child_desc.description : ''

    results.push({
      :breakdown_code => ml.breakdown_code,
      :breakdown_code_desc => breakdown_code_desc,
      :loss_count => ml.loss_count,
      :loss_term => ml.loss_term,
      :maint_term => ml.maint_term
    })
  end

  results
  EOS
  
  in_params 'work_date-gte'
  in_params 'work_date-lte'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  
  out_params :operation
  out_params :operation_desc
  out_params :machine
  out_params :machine_desc
  out_params :loss_count
  out_params :loss_term
  out_params :maint_term
  out_params :breakdown_code
  out_params :breakdown_code_desc
end

DiySelection.setup domain, :ftt3, {:script_type => 'DSL-SQL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
        domain = self.domain
	from_date = params['work_date-gte'] unless(params['work_date-gte'].blank?)
	to_date = params['work_date-lte'] unless(params['work_date-lte'].blank?)
	workcenter_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
        main_op_flag = params['main_op_flag-eq'] unless(params['main_op_flag-eq'].blank?)

	from_date = parse_date(from_date)
	to_date = parse_date(to_date)

	conditions = ["order_date between ? and ?"]
	conditions.push(from_date)
	conditions.push(to_date)

        conditions[0] << " and operations.main_op_flag = 1" if(main_op_flag)

	con = wc_op_mc_assoc_condition(params, conditions)
	
	select = "workcenters.name workcenter, 
                        operations.name operation, 
                        operations.description operation_desc, 
                        machines.name machine, 
                        machines.description machine_desc, 
                        products.name product, 
                        products.description product_desc, 
	                sum(prod_orders.actual_qty) actual_qty, sum(prod_orders.defect_qty) defect_qty, sum(prod_orders.rework_qty) rework_qty, 
	                ROUND(DECODE((sum(prod_orders.actual_qty) + sum(prod_orders.defect_qty) + sum(prod_orders.rework_qty)), 0, 0, (sum(prod_orders.actual_qty)/(sum(prod_orders.actual_qty) +         sum(prod_orders.defect_qty) + sum(prod_orders.rework_qty)))*100), 1) ftt"
	group = "workcenters.name, operations.name, operations.description, machines.name, machines.description, products.name, products.description"
	
	sql = domain.prod_orders.select(select).where(con).joins(:workcenter, :operation, :machine, :product).group(group).order('workcenter, operation, machine, product').to_sql
	sql
  EOS
  
  in_params 'work_date-gte'
  in_params 'work_date-lte'
  in_params 'workcenter.name-eq'
  in_params 'operation.name-eq'
  in_params 'machine.name-eq'
  
  out_params :workcenter
  out_params :operation
  out_params :operation_desc
  out_params :machine
  out_params :machine_desc
  out_params :product
  out_params :product_desc
  out_params :actual_qty
  out_params :defect_qty
  out_params :rework_qty
  out_params :ftt
end

#  --------------------------------------------------Oracle--------------------------------------------------


# -------------------------------------------------- NOT USED ------------------------------------------------

# For Dynamic Resource Field
DiySelection.setup domain, :SelectOperations, {:script_type => 'DSL', :view_type => 'SELECTOR'} do
  @service_logic = <<-EOS
  prod_dept = params[:prod_dept] unless params[:prod_dept].blank?
  dept_type = params[:dept_type] unless params[:dept_type].blank?

  wc_conds = []

  if(prod_dept && dept_type)
      wc_conds.push("prod_dept = ? and dept_type = ?", prod_dept, dept_type)
  elsif(prod_dept && !dept_type)
      wc_conds.push("prod_dept = ?", prod_dept)
  elsif(!prod_dept && dept_type)
      wc_conds.push("dept_type = ?", dept_type)
  else
     # ...
  end

  workcenters = self.domain.workcenters.where(wc_conds)
  wc_ids = workcenters.collect { |wc| wc.id }
  operations = self.domain.operations.select('id,name,description').where("workcenter_id in (?)", wc_ids)

  results = []
  operations.each do |op|
      results.push({:id => op.id, :name => op.name, :description => op.description})
  end
  results
  EOS
  
  in_params :prod_type
  in_params :dept_type
  out_params :id
  out_params :name
  out_params :description
end

# For Dynamic Resource Field
DiySelection.setup domain, :SelectMachines, {:script_type => 'DSL', :view_type => 'SELECTOR'} do
  @service_logic = <<-EOS
  operation_id = params[:operation_id] unless params[:operation_id].blank?

  if(operation_id)
     machines = self.domain.machines.select('id,name,description').find_all_by_operation_id(operation_id)
  else
     machines = self.domain.machines.select('id,name,description').all
  end

  results = []
  machines.each do |machine|
      results.push({:id => machine.id, :name => machine.name, :description => machine.description})
  end
  results
  EOS
  
  in_params :operation_id
  out_params :id
  out_params :name
  out_params :description
end

# For Dynamic Resource Field
DiySelection.setup domain, :SelectProducts, {:script_type => 'DSL', :view_type => 'SELECTOR'} do
  @service_logic = <<-EOS
  products = self.domain.products.where("prod_type != ?", "RM")

  results = []

  products.each do |product|
    results.push({:id => product.id, :name => product.name, :description => product.description})
  end

  results
  EOS
  
  in_params :operation_id
  out_params :id
  out_params :name
  out_params :description
end

# For AutoCompletion RawMaterials
DiySelection.setup domain, :SelectRawMaterials, {:script_type => 'DSL', :view_type => 'SELECTOR'} do
  @service_logic = <<-EOS
  conditions = ["prod_type = ? ", 'RM']

  unless params[:name].blank?
      conditions[0] << " and name like '%" + params[:name] + "%'"
  end 

  products = self.domain.products.where(conditions)

  results = []

  products.each do |product|
    results.push({:id => product.id, :name => product.name, :description => product.description})
  end

  results
  EOS
  
  in_params :name
  out_params :id
  out_params :name
  out_params :description
end

sheepDogSelection = DiySelection.setup domain, :SheepDog, {:script_type => 'DSL-SQL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  select = 'operations.name store, products.name product, products.description product_desc, inventories.qty qty'
  conditions = ["operations.inv_flag = ?", true]
  sql = self.domain.inventories.select(select).where(conditions).joins('INNER JOIN operations ON operations.id = inventories.store_id', :product).to_sql  
  sql
  EOS
  
  out_params :store
  out_params :product
  out_params :product_desc
  out_params :qty
end

ProdOverviewSelection = DiySelection.setup domain, :ProdOverview, {:script_type => 'DSL', :view_type => 'LIST'} do
  @count_logic = '100'
  @service_logic = <<-EOS
  work_date = params['work_date-eq'] unless(params['work_date-eq'].blank?)
  wc_name = params['workcenter.name-eq'] unless(params['workcenter.name-eq'].blank?)
  cond = ""
  cond << " and w.name = '\#{wc_name}'" if(wc_name)
  work_date = Date.today.strftime('%Y-%m-%d') unless(work_date)

  sql = "select
    w.name wc, o.name op, o.description op_name, m.name mc, m.description mc_name, mn.status, mn.linestop, mn.plan, mn.actual, mn.scrap, mn.rework, mn.workers
  from (
  (select 
    a.workcenter_id, a.operation_id, a.machine_id, b.status, a.plan, a.actual, c.linestop, a.scrap, a.rework, d.workers
  from (
    (select 
      workcenter_id, operation_id, machine_id, sum(order_qty) plan, sum(actual_qty) actual, sum(defect_qty) scrap, sum(rework_qty) rework
    from
      prod_orders
    where
      order_date = DATE'\#{work_date}'
    group by 
      workcenter_id, operation_id, machine_id) a
    inner join (select 
      machine_id, 
      case 
        when r = 'O' then 'R'
        when w = 'O' then 'W'
        else 'T'
      end as status
    from (
      select
        machine_id, 
        max(decode(status, 'R', 'O', '')) r, 
        max(decode(status, 'W', 'O', '')) w, 
        max(decode(status, 'T', 'O', '')) t 
      from
        prod_orders
      where
        order_date = DATE'\#{work_date}'
      group by machine_id)
    ) b on a.machine_id = b.machine_id

    left outer join (select distinct(machine_id) machine_id, 'Y' linestop from machine_losses where status = '1' ) c
    on a.machine_id = c.machine_id

    left outer join  (select 
        po.machine_id, wt.workers
      from 
        (select prod_order_id, count(*) workers from worker_times where work_date = DATE'\#{work_date}' and start_time is not null and end_time is null group by prod_order_id) wt
        inner join prod_orders po on wt.prod_order_id = po.id
      where 
        po.order_date = DATE'\#{work_date}' and po.status = 'R') d on a.machine_id = d.machine_id
    )
  ) mn inner join workcenters w on mn.workcenter_id = w.id
       inner join operations o on mn.operation_id = o.id
       inner join machines m on mn.machine_id = m.id)
  where
    mn.machine_id is not null \#{cond}
  order by w.name, o.name, m.name"

  results = DiySelection.connection.select_all(sql)
  results
  EOS
end

# -------------------------------------------------- NOT USED ------------------------------------------------

puts "Reports Loaded!"