Ext.define('Prod.view.operation.OperationSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_operation_search',
		
	items : [
		{ fieldLabel : T('label.wc'), name : 'workcenter.name-eq', xtype : 'entitynamecombo', valueField : 'name', storeClass : 'Prod.store.Workcenter' },
		{ fieldLabel : T('label.code'), name : 'name-like' },
		{ fieldLabel : T('label.dept_type'), name : 'dept_type-eq', xtype : 'codecombo', commonCode : 'DEPT_TYPE', valueField : 'name', displayField : 'description' },
		{ fieldLabel : T('label.description'), name : 'description-like' }
	]
	
});