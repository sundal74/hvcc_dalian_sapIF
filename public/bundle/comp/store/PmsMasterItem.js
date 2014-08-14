Ext.define('Comp.store.PmsMasterItem', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Comp.model.PmsMasterItem',
	
	model : 'Comp.model.PmsMasterItem',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/pms_master_items',
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