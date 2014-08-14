Ext.define('Prod.model.Inventory', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'store_id', type : 'string' },
		{ name : 'store', type : 'auto' },
		//{ name : 'machine_id', type : 'string' },
		//{ name : 'machine', type : 'auto' },
		{ name : 'product_id', type : 'string' },
		{ name : 'product', type : 'auto' },
		{ name : 'qty', type : 'integer' },
		{ name : 'add_qty', type : 'integer' },
		{ name : 'reason', type : 'string' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/inventories',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});