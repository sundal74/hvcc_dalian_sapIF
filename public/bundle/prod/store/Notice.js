Ext.define('Prod.store.Notice', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.Notice',
	
	model : 'Prod.model.Notice',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
	
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/notices',
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