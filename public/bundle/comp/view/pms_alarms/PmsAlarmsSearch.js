Ext.define('Comp.view.pms_alarms.PmsAlarmsSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'comp_pms_alarms_search',
	
	items : [
		{ xtype: 'daterange', fieldLabel: T('label.work_date'), name: 'work_date' },
		{ fieldLabel : T('label.type'), name : 'alarm_type-eq', xtype : 'codecombo', commonCode : 'PMS_ALARM', displayField : 'description' },	
	]
	
});