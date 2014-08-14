Ext.define('Prod.store.OperationsDefects', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.OperationsDefects',
	
	model : 'Prod.model.OperationsDefects',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
		
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/defect_codes/operation_defect_codes',
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