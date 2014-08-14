Ext.define('Comp.store.PmsMasterModel', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Comp.model.PmsMasterModel',
	
	model : 'Comp.model.PmsMasterModel',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/pms_master_models',
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