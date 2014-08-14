Ext.define('Comp.view.pms_spc_alarm.PmsSpcAlarm', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Comp.view.pms_spc_alarm.PmsSpcAlarmSearch',
		'Comp.view.pms_spc_alarm.PmsSpcAlarmList'
	],
	
	xtype : 'comp_pms_spc_alarm',
	
	title : T('menu.PmsSpcAlarm'),
	
	searchView : 'comp_pms_spc_alarm_search',
	
	gridView : 'comp_pms_spc_alarm_list'
	
});