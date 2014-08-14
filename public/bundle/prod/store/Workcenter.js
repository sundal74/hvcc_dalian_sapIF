Ext.define('Prod.store.Workcenter', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.Workcenter',
	
	model : 'Prod.model.Workcenter',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
	
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/workcenters',
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