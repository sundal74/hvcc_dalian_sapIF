Ext.define('Prod.view.machine_loss.MachineLossSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_machine_loss_search',
		
	items : [
		{ xtype: 'daterange', fieldLabel: T('label.work_date'), name: 'work_date' },
		{ fieldLabel : T('label.shift'), name : 'shift-eq', xtype : 'codecombo', commonCode : 'SHIFT', displayField : 'description' },
		{ 
			fieldLabel : T('label.wc'), 
			name : 'workcenter.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Workcenter'
		},
		{ 
			fieldLabel : T('label.operation'), 
			name : 'operation.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Operation',
			associationField : ['workcenter.name-eq']
		},
		{ 
			fieldLabel : T('label.machine'), 
			name : 'machine.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Machine',
			associationField:['operation.name-eq']
		},
		{ fieldLabel : T('label.status'), name : 'status-eq', xtype : 'codecombo', commonCode : 'LINESTOP_STATUS', displayField : 'description' },
		{ fieldLabel : T('label.breakdown_code'), name : 'breakdown_code-eq', xtype : 'codecombo', commonCode : 'BREAKDOWN_CODE', displayField : 'description' }
	]
	
});