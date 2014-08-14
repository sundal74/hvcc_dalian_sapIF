Ext.define('Prod.model.SpcItem', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		//{ name : 'code', type : 'string' },
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'operation_id', type : 'string' },
		{ name : 'operation_name', type : 'string' },
		{ name : 'operation', type : 'auto' },
		{ name : 'x_usl', type : 'float' },
		{ name : 'x_lsl', type : 'float' },
		{ name : 'r_usl', type : 'float' },
		{ name : 'r_lsl', type : 'float' },
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
		url : '/domains/' + login.current_domain_id + '/spc_items',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});