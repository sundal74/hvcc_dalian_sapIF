Ext.define('Prod.store.SpcItem', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.SpcItem',
	
	model : 'Prod.model.SpcItem',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
	
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/spc_items',
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