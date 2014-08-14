Ext.define('Hcc.view.actual_per_hour.ActualPerHourSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'hcc_actual_per_hour_search',
	
	items : [
		{ fieldLabel : T('label.work_date'), name : 'work_date-eq', xtype : 'datefield', format : T('format.date'), submitFormat : T('format.submitDate') },
		{ fieldLabel : T('label.wc'), name : 'workcenter.name-eq', xtype : 'entitysearchcombo', storeClass : 'Prod.store.Workcenter', valueField : 'name' },
		{ fieldLabel : T('label.operation'), name : 'operation.name-eq', xtype : 'entitysearchcombo', storeClass : 'Prod.store.Operation', valueField : 'name', associationField : ['workcenter.name-eq'] },
		{ fieldLabel : T('label.machine'), name : 'machine.name-eq', xtype : 'entitysearchcombo', storeClass : 'Prod.store.Machine', valueField : 'name', associationField:['operation.name-eq']},
	]
	
});