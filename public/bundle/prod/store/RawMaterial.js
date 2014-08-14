Ext.define('Prod.store.RawMaterial', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.RawMaterial',
	
	model : 'Prod.model.RawMaterial',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
	
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/raw_materials',
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