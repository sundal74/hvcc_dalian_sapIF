Ext.define('Prod.view.operations_workers.OperationsWorkers', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
	layout : { type : 'hbox', align : 'stretch' },
	
 	requires : [ 
		'Prod.view.operations_workers.OperationsWorkersSearch',
		'Prod.view.operations_workers.OperationsWorkersList',
		'Prod.view.operations_workers.OperationsWorkersSubList'
	],
	
	xtype : 'prod_operations_workers',
	
	title : T('menu.OperationsWorkers'),
	
	searchView : 'prod_operations_workers_search',
	
	gridView : 'prod_operations_workers_list',
	
	subView : 'prod_operations_workers_sub_list'

});