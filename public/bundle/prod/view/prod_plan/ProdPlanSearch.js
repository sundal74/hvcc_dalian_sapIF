Ext.define('Prod.view.prod_plan.ProdPlanSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_prod_plan_search',
		
	items : [
		{ 
			fieldLabel : T('label.date'), 
			name : 'plan_date-eq', 
			xtype : 'datefield', 
			format : T('format.date'), 
			submitFormat : T('format.submitDate') 
		},
		{ 
			fieldLabel : T('label.type'), 
			name : 'dept_type-eq', 
			xtype : 'codecombo', 
			commonCode : 'DEPT_TYPE', 
			displayField : 'description'
		},
		{ 
			fieldLabel : T('label.wc'), 
			name : 'workcenter.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Workcenter',
			associationField : ['dept_type-eq']
		}
	]
	
});