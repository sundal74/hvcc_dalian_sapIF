Ext.define('Prod.store.Bom', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.Bom',
	
	model : 'Prod.model.Bom',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
	
	pageSize : 100,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/boms',
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
	},
	
	groupField: 'product_name'
	
});