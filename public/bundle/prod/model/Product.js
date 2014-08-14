Ext.define('Prod.model.Product', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'prod_type', type : 'string' },
		{ name : 'pack_type', type : 'string' },
		{ name : 'unit', type : 'string' },
		{ name : 'default_qty', type : 'integer' },
		{ name : 'short_name', type : 'string' },
		{ name : 'model_no', type : 'string' },
		{ name : 'cust_code', type : 'string' },
		{ name : 'cust_part_no', type : 'string' },
		{ name : 'cust_part_name', type : 'string' },
		{ name : 'creator_id', type : 'string' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater_id', type : 'string' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],

	validations : [
		{type : 'presence', field : 'name'}
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/products',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});