Ext.define('Prod.store.ProdPlan', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.ProdPlan',
	
	model : 'Prod.model.ProdPlan',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
	
	pageSize : 10000,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/prod_plans',
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