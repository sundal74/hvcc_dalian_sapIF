Ext.define('Prod.store.LabelPlan', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.LabelPlan',
	
	model : 'Prod.model.LabelPlan',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
	
	pageSize : 100,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/label_plans',
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