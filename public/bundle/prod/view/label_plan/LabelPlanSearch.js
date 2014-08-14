Ext.define('Prod.view.label_plan.LabelPlanSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_label_plan_search',
		
	items : [ { 
			name : 'order_date-eq', 
			fieldLabel : T('label.date'), 
			xtype : 'datefield', 
			format : T('format.date'), 
			submitFormat : T('format.submitDate') 
		}, { 
			fieldLabel : T('label.shift'), 
			name : 'shift-eq', 
			xtype : 'codecombo', 
			commonCode : 'SHIFT', 
			displayField : 'description' 
		},	{ 
			fieldLabel : T('label.wc'), 
			name : 'workcenter.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Workcenter'
		}, { 
			fieldLabel : T('label.operation'), 
			name : 'operation.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Operation',
			associationField : ['workcenter.name-eq']
		}, { 
			fieldLabel : T('label.product'), 
			name : 'product.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Product'
		} ]
	
});