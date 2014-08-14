Ext.define('Prod.store.StdWorkDoc', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.StdWorkDoc',
	
	model : 'Prod.model.StdWorkDoc',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
	
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/std_work_docs',
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