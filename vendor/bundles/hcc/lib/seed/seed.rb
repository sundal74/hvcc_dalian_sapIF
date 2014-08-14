debug_print "Loading [Hcc] bundle data..."

domain = Domain.system_domain
admin = User.find_by_login('admin')
User.current_user = admin

puts "Entity data creating..."

puts "Menu creating..."
Menu.setup domain, :ProdIndex, {:rank => 6000} do
  submenu :ActualPerHour, {:rank => 100, :template => 'Hcc.view.actual_per_hour.ActualPerHour'}
  submenu :MHActual, {:rank => 200, :template => 'Hcc.view.m_h_actual.MHActual'}
  submenu :ActualByMc, {:rank => 300, :template => 'Hcc.view.plan_actual.ActualByMc'}
  submenu :DailyplanVsOutput, {:rank => 400, :template => 'Hcc.view.dailyplan_vs_output.DailyplanVsOutput'}
  submenu :OverallEfficiency, {:rank => 500, :template => 'Hcc.view.overall_efficiency.OverallEfficiency'}
  submenu :OverallEfficiency2, {:rank => 600, :template => 'Hcc.view.overall_efficiency.OverallEfficiency2'}
  submenu :Oee, {:rank => 700, :template => 'Hcc.view.oee.Oee'}
  submenu :Oee2, {:rank => 800, :template => 'Hcc.view.oee.Oee2'}
  submenu :Ftt, {:rank => 900, :template => 'Hcc.view.ftt.Ftt'}
  submenu :Ftt2, {:rank => 1000, :template => 'Hcc.view.ftt.Ftt2'}
  submenu :Ftt3, {:rank => 1100, :template => 'Hcc.view.ftt.Ftt3'}
  submenu :Bts, {:rank => 1200, :template => 'Hcc.view.bts.Bts'}
  submenu :Bts2, {:rank => 1300, :template => 'Hcc.view.bts.Bts2'}
  submenu :MHSummary, {:rank => 1400, :template => 'Hcc.view.m_h_summary.MHSummary'}
  submenu :MHSummary2, {:rank => 1500, :template => 'Hcc.view.m_h_summary.MHSummary2'}
  #submenu :SheepDog, {:rank => 1600, :template => 'Hcc.view.sheep_dog.SheepDog'}
end

Menu.setup domain, :Quality, {:rank => 4000} do
  submenu :DefectRate, {:rank => 1300, :template => 'Hcc.view.defect_rate.DefectRate'}
  submenu :DefectCodeTop10, {:rank => 1400, :template => 'Hcc.view.defect_code_top10.DefectCodeTop10'}
  submenu :ScrapTrendDaily, {:rank => 1500, :template => 'Hcc.view.scrap_trend.ScrapTrendDaily'}
  submenu :ScrapTrendMonthly, {:rank => 1600, :template => 'Hcc.view.scrap_trend.ScrapTrendMonthly'}
  submenu :SpcSpr, {:rank => 2000, :menu_type => 'SEPARATOR'}
  submenu :SpcChart, {:rank => 2100, :template => 'Hcc.view.spc_chart.SpcChart'}
end

Menu.setup domain, :Production, {:rank => 2000} do
  submenu :ProdClosing, {:rank => 2100, :template => 'Hcc.view.prod_closing.ProdClosing'}
  submenu :DailyActualQty, {:rank => 2200, :template => 'Hcc.view.daily_actual_qty.DailyActualQty'}
end

Menu.setup domain, :MachineMgmt, {:rank => 3000} do  
  submenu :MachineRunTime, {:rank => 2500, :template => 'Hcc.view.machine_run_time.MachineRunTime'}
end

Menu.setup domain, :Barcode, {:rank => 5000} do
  submenu :ReportSpr, {:rank => 2000, :menu_type => 'SEPARATOR'}
  submenu :BarGrByMat, {:rank => 2100, :template => 'Hcc.view.bar_report.BarGrByMat'}
  submenu :BarGrBySer, {:rank => 2200, :template => 'Hcc.view.bar_report.BarGrBySer'}
  submenu :BarGiByMat, {:rank => 2300, :template => 'Hcc.view.bar_report.BarGiByMat'}
  submenu :BarGiBySer, {:rank => 2400, :template => 'Hcc.view.bar_report.BarGiBySer'}
  # submenu :BarSheepDog, {:rank => 2500, :template => 'Hcc.view.bar_sheep_dog.BarSheepDog'}
end

puts "Menu created!"

puts "Completed to load [Hcc] bundle data!"