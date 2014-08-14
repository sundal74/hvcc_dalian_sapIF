Ext.define('Prod.view.mon_prod_plan.MonProdPlanSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	requires : ['Base.store.Year', 'Base.store.Month'],
	
	xtype : 'prod_mon_prod_plan_search',

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
			fieldLabel : T('label.month'), 
			name : 'plan_month-eq', 
			xtype : 'combo', 
			queryMode: 'local', 
			store : Ext.create('Base.store.Month'),
			displayField : 'name', 
			valueFiled : 'value' 
		}
	]
	
});