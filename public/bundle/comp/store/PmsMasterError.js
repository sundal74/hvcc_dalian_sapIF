Ext.define('Comp.store.PmsMasterError', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Comp.model.PmsMasterError',
	
	model : 'Comp.model.PmsMasterError',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/pms_master_errors',
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