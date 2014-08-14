Ext.define('Hcc.view.daily_actual_qty.DailyActualQtySearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'hcc_daily_actual_qty_search',
	
	items : [
		{ 
			fieldLabel : T('label.work_date'), 
			name : 'work_date-eq', 
			xtype : 'datefield', 
			format : T('format.date'), 
			submitFormat : T('format.submitDate') 
		},
		{ 
			fieldLabel : T('label.shift'), 
			name : 'shift-eq', 
			xtype : 'codecombo', 
			commonCode : 'SHIFT', 
			displayField : 'description' 
		},
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
		{ 
			fieldLabel : T('label.product'), 
			name : 'product.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Product'
		},
		{
			name : 'no_actual_flag-eq',
			fieldLabel : 'No ' + T('label.actual'),
			xtype : 'checkbox',
			inputValue : true
		},
		{
			name : 'wait_flag-eq',
			fieldLabel : 'Waiting',
			xtype : 'checkbox',
			inputValue : true
		}		
	]
	
});
