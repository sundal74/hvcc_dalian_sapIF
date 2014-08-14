Ext.define('Prod.store.LossTemplate', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.LossTemplate',
	
	model : 'Prod.model.LossTemplate',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
	
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/loss_templates',
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