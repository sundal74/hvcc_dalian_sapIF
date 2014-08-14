Ext.define('Prod.view.worker_time.WorkerTimeDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.worker_time.WorkerTimeForm'
	],
	
	xtype : 'prod_worker_time_detail',
	
	title : T('title.worker_time'),
		
	items : [ {
		xtype : 'prod_worker_time_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});