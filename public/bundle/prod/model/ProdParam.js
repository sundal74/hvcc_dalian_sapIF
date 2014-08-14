Ext.define('Prod.model.ProdParam', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'operation_id', type : 'string' },
		{ name : 'operation', type : 'auto' },
		{ name : 'machine_id', type : 'string' },
		{ name : 'machine', type : 'auto' },
		{ name : 'product_id', type : 'string' },
		{ name : 'product', type : 'auto' },
		{ name : 'location', type : 'string' },
		{ name : 'target_uph', type : 'float' },
		{ name : 'cycletime', type : 'float' },
		{ name : 'creator_id', type : 'string' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater_id', type : 'string' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/prod_params',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});