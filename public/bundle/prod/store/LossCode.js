Ext.define('Prod.store.LossCode', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.LossCode',
	
	model : 'Prod.model.LossCode',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
	
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/loss_codes',
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