Ext.define('Prod.view.operations_workers.OperationsWorkersSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_operations_workers_search',
	
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
		},
		{
			fieldLabel : T('label.x_id', {x : T('label.operator')}), 
			name : 'operator_id-like', 
			xtype : 'textfield'			
		}
	]
	
});