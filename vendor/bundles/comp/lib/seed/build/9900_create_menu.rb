puts "Loading [9900_create_menu] file..."

domain = Domain.system_domain
Menu.setup domain, :Compressor, {:rank => 9000} do
  submenu :CompMasterSpr, {:rank => 1000, :menu_type => 'SEPARATOR'}
  submenu :PmsMasterStation, {:rank => 1100, :template => 'Comp.view.pms_master_station.PmsMasterStation'}
  submenu :PmsMasterModel, {:rank => 1200, :template => 'Comp.view.pms_master_model.PmsMasterModel'}
  submenu :PmsMasterItem, {:rank => 1300, :template => 'Comp.view.pms_master_item.PmsMasterItem'}
  submenu :PmsMasterError, {:rank => 1400, :template => 'Comp.view.pms_master_error.PmsMasterError'}
  submenu :CompReportSpr, {:rank => 2000, :menu_type => 'SEPARATOR'}
  submenu :TsfrStatus, {:rank => 2100, :template => 'Comp.view.tsfr_status.TsfrStatus'}
  submenu :TsfrTrend, {:rank => 2200, :template => 'Comp.view.tsfr_trend.TsfrTrend'}
  submenu :ProdHist, {:rank => 2300, :template => 'Comp.view.prod_hist.ProdHist'}
  submenu :WorstTop10, {:rank => 2400, :template => 'Comp.view.worst_top10.WorstTop10'}
  submenu :PmsErrorTrend, {:rank => 2500, :template => 'Comp.view.pms_error_trend.PmsErrorTrend'}
  submenu :PmsSpc, {:rank => 2600, :template => 'Comp.view.pms_spc.PmsSpc'}
  submenu :PmsAlarms, {:rank => 2700, :template => 'Comp.view.pms_alarms.PmsAlarms'}
  # submenu :PmsSpcAlarm, {:rank => 2800, :template => 'Comp.view.pms_spc_alarm.PmsSpcAlarm'}
end

puts "Compressor Menu Loaded!"