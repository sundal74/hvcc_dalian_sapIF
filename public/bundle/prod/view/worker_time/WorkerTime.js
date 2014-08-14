Ext.define('Prod.view.worker_time.WorkerTime', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.worker_time.WorkerTimeSearch',
		'Prod.view.worker_time.WorkerTimeList'
	],
	
	xtype : 'prod_worker_time',
	
	title : T('title.worker_time'),
	
	searchView : 'prod_worker_time_search',
	
	gridView : 'prod_worker_time_list'
	
});