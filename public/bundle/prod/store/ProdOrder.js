Ext.define('Prod.store.ProdOrder', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.ProdOrder',
	
	model : 'Prod.model.ProdOrder',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
	
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/prod_orders',
		format : 'json',
	    reader: {
			type : 'json',
			root : 'items',
			successProperty : 'success',
			totalProperty : 'total'
        },
        writer: {
			type: 'json'
        }
	}
	
});