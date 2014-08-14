Ext.define('Prod.model.InventoryHist', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'inventory_id', type : 'string' },
		{ name : 'store_id', type : 'string' },
		{ name : 'store', type : 'auto' },
		{ name : 'machine_id', type : 'string' },
		{ name : 'machine', type : 'auto' },
		{ name : 'product_id', type : 'string' },
		{ name : 'product', type : 'auto' },
		{ name : 'inv_qty', type : 'integer' },
		{ name : 'qty', type : 'integer' },
		{ name : 'action_code', type : 'string' },
		{ name : 'lot_type', type : 'string' },
		{ name : 'lot_id', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/inventory_hists',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});