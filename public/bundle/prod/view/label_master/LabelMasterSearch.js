Ext.define('Prod.view.label_master.LabelMasterSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_label_master_search',
		
	items : [
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
			fieldLabel : T('label.product'), 
			name : 'product.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Product'
		},
		{
			fieldLabel : T('label.option'), 
			name : 'customer.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Customer'
		}
	]
	
});