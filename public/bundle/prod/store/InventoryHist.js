Ext.define('Prod.store.InventoryHist', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.InventoryHist',
	
	model : 'Prod.model.InventoryHist',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
	
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/inventory_hists',
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