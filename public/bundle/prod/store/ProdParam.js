Ext.define('Prod.store.ProdParam', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.ProdParam',
	
	model : 'Prod.model.ProdParam',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
	
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/prod_params',
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