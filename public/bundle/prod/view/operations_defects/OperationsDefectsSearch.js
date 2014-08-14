Ext.define('Prod.view.operations_defects.OperationsDefectsSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_operations_defects_search',
	
	items : [
		{ 
			fieldLabel : T('label.wc'), 
			name : 'workcenter.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Workcenter'
		},
		{ 
			fieldLabel : T('label.code'), 
			name : 'name-like', 
			xtype : 'textfield' 
		}
	]
	
});