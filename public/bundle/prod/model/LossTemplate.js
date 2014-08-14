Ext.define('Prod.model.LossTemplate', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'week_day', type : 'integer' },
		{ name : 'start_time', type : 'string' },
		{ name : 'end_time', type : 'string' },
		{ name : 'loss_term', type : 'integer' },
		{ name : 'loss_code_id', type : 'string' },
		{ name : 'loss_code', type : 'auto' },
		{ name : 'control_flag', type : 'boolean' },
		{ name : 'creator_id', type : 'string' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater_id', type : 'string' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
	validations : [
		{type : 'format', field : 'start_time', matcher: /^\d{4}$/},
		{type : 'format', field : 'end_time', matcher: /^\d{4}$/}
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/loss_templates',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});