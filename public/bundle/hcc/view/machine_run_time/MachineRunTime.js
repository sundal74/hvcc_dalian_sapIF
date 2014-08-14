Ext.define('Hcc.view.machine_run_time.MachineRunTime', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.machine_run_time.MachineRunTimeSearch',
		'Hcc.view.machine_run_time.MachineRunTimeList'
	],
	
	xtype : 'hcc_machine_run_time',
	
	title : T('menu.MachineRunTime'),
	
	searchView : 'hcc_machine_run_time_search',
	
	gridView : 'hcc_machine_run_time_list'

});