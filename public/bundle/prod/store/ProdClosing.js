Ext.define('Prod.store.ProdClosing', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.ProdClosing',
	
	model : 'Prod.model.ProdClosing',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	groupField : 'workcenter',
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/prod_closings',
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