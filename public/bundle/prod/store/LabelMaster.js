Ext.define('Prod.store.LabelMaster', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.LabelMaster',
	
	model : 'Prod.model.LabelMaster',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
	
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/label_masters',
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