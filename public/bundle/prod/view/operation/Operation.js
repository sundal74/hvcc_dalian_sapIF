Ext.define('Prod.view.operation.Operation', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.operation.OperationSearch',
		'Prod.view.operation.OperationList'
	],
	
	xtype : 'prod_operation',
	
	title : T('menu.Operation'),
	
	searchView : 'prod_operation_search',
	
	gridView : 'prod_operation_list'
	
});