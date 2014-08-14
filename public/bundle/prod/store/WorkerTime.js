Ext.define('Prod.store.WorkerTime', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.WorkerTime',
	
	model : 'Prod.model.WorkerTime',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
		
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/worker_times',
		format : 'json',
	    reader: {
			type: 'json',
			root: 'items',
			successProperty : 'success',
			totalProperty : 'total'
        },
        writer: {
			type: 'json'
        }
	}
	
});