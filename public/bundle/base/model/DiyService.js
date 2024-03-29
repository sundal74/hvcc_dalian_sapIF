Ext.define('Base.model.DiyService', {
    
	extend: 'Ext.data.Model',
    
	fields: [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'script_type', type : 'string' },
		{ name : 'collection_tag', type : 'string' },
		{ name : 'member_tag', type : 'string' },
		{ name : 'active_flag', type : 'bool' },
		{ name : 'show_params_flag', type : 'bool' },
		{ name : 'service_logic', type : 'text' },
		{ name : 'logic_file', type : 'string' },
		{ name : 'atomic_flag', type : 'bool' },
		// { name : 'creator_id', type : 'string' },
		{ name : 'updater_id', type : 'string' },
		// { name : 'creator', type : 'auto' },
		{ name : 'updater', type : 'auto' },
		// { name : 'created_at', type : 'date' }, 
		{ name : 'updated_at', type : 'date' }, 
		{ name : 'service_in_params', type : 'auto' }, 
		{ name : 'service_out_params', type : 'auto' }, 
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/diy_services',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});