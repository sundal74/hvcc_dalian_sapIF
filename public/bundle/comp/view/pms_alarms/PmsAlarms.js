Ext.define('Comp.view.pms_alarms.PmsAlarms', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Comp.view.pms_alarms.PmsAlarmsSearch',
		'Comp.view.pms_alarms.PmsAlarmsList'
	],
	
	xtype : 'comp_pms_alarms',
	
	title : T('menu.PmsAlarms'),
	
	searchView : 'comp_pms_alarms_search',
	
	gridView : 'comp_pms_alarms_list'

});