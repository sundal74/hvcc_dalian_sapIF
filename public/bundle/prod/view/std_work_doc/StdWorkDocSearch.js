Ext.define('Prod.view.std_work_doc.StdWorkDocSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_std_work_doc_search',
	
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
			fieldLabel : T('label.machine'), 
			name : 'machine.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Machine',
			associationField:['operation.name-eq']
		}
	]
	
});