Ext.define('Prod.store.MachineLoss', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.MachineLoss',
	
	model : 'Prod.model.MachineLoss',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
	
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/machine_losses',
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