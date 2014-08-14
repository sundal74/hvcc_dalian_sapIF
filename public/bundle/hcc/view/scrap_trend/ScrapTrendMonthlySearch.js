Ext.define('Hcc.view.scrap_trend.ScrapTrendMonthlySearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	requires : ['Base.store.Year', 'Base.store.Month'],
	
	xtype : 'hcc_scrap_trend_monthly_search',

	items : [
		{ 
			fieldLabel : T('label.year'), 
			name : 'plan_year-eq', 
			xtype : 'combo', 
			queryMode: 'local', 
			store : Ext.create('Base.store.Year'),
			displayField : 'name', 
			valueFiled : 'value' 
		},
		{ 
			fieldLabel : T('label.compare_year'),
			name : 'comparison_year-eq', 
			xtype : 'combo', 
			queryMode: 'local', 
			store : Ext.create('Base.store.Year'),
			displayField : 'name', 
			valueFiled : 'value' 
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
		}
	]
	
});