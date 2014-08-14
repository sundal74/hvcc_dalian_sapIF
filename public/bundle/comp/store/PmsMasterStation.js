Ext.define('Comp.store.PmsMasterStation', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Comp.model.PmsMasterStation',
	
	model : 'Comp.model.PmsMasterStation',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/pms_master_stations',
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