Ext.define('Prod.store.LabelModel', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.LabelModel',
	
	model : 'Prod.model.LabelModel',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/label_models',
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