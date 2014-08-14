puts "Loading [1010_create_workcenters] file..."

Workcenter.delete_all
domain = Domain.system_domain
admin = User.find("admin")
User.current_user = admin

data = {:name => 'T01', :description => 'Fin Mill & Press'}
save_data(domain.workcenters, data, admin)
data = {:name => 'T02', :description => 'HEX Brazing'}
save_data(domain.workcenters, data, admin)
data = {:name => 'T03', :description => 'HE Leak'}
save_data(domain.workcenters, data, admin)
data = {:name => 'T04', :description => 'Injection'}
save_data(domain.workcenters, data, admin)
data = {:name => 'T05', :description => 'Compressor'}
save_data(domain.workcenters, data, admin)
data = {:name => 'T06', :description => 'Condenser'}
save_data(domain.workcenters, data, admin)
data = {:name => 'T07', :description => 'Radiator'}
save_data(domain.workcenters, data, admin)
data = {:name => 'T08', :description => 'Evaporator'}
save_data(domain.workcenters, data, admin)
data = {:name => 'T09', :description => 'Heater'}
save_data(domain.workcenters, data, admin)
data = {:name => 'T10', :description => 'Intercooler'}
save_data(domain.workcenters, data, admin)
data = {:name => 'T11', :description => 'Oilcooler'}
save_data(domain.workcenters, data, admin)
data = {:name => 'T12', :description => 'Injection'}
save_data(domain.workcenters, data, admin)
data = {:name => 'T13', :description => 'Hose&Pipe'}
save_data(domain.workcenters, data, admin)
data = {:name => 'T14', :description => 'HVAC'}
save_data(domain.workcenters, data, admin)
data = {:name => 'T15', :description => 'AIS'}
save_data(domain.workcenters, data, admin)
data = {:name => 'T16', :description => 'R/Drier'}
save_data(domain.workcenters, data, admin)
data = {:name => 'T17', :description => 'Packing Dealer Kit'}
save_data(domain.workcenters, data, admin)

puts "Total 17 Workcenter Loaded!"