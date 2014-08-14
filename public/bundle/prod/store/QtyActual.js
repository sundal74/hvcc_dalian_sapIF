Ext.define('Prod.store.QtyActual', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.QtyActual',
	
	model : 'Prod.model.QtyActual',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
	
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/qty_actuals',
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