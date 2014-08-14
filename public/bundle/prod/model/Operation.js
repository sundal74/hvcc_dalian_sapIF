Ext.define('Prod.model.Operation', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'workcenter_id', type : 'string' },
		{ name : 'workcenter', type : 'auto' },
		{ name : 'dept_type', type : 'string' },
		{ name : 'op_type', type : 'string' },
		{ name : 'op_seq', type : 'integer' },
		{ name : 'inv_flag', type : 'boolean' },
		//{ name : 'rm_input_flag', type : 'boolean' },
		{ name : 'track_rm_store', type : 'auto' },
		{ name : 'track_rm_store_id', type : 'string' },
		{ name : 'main_op_flag', type : 'boolean' },
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
		url : '/domains/' + login.current_domain_id + '/operations',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});