Ext.define('Prod.store.Department', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.Department',
	
	model : 'Prod.model.Department',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
	
	pageSize : 100,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/common_codes',
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