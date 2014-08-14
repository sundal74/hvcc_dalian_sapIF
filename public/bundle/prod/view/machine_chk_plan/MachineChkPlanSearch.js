Ext.define('Prod.view.machine_chk_plan.MachineChkPlanSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_machine_chk_plan_search',
		
	items : [
		{ xtype: 'daterange', fieldLabel: T('label.work_date'), name: 'plan_date' },
		{ 
			fieldLabel : T('label.machine'), 
			name : 'machine.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Machine'
		},
		{ fieldLabel : T('label.pm_type'), name : 'pm_type-eq', xtype : 'codecombo', commonCode : 'PM_TYPE', displayField : 'description' },
		{ fieldLabel : T('label.pm_part'), name : 'pm_part-eq', xtype : 'codecombo', commonCode : 'PM_PART', displayField : 'description' },
		{ fieldLabel : T('label.status'), name : 'status-eq', xtype : 'codecombo', commonCode : 'COMPLETE_CODE', displayField : 'description' }
	]
	
});