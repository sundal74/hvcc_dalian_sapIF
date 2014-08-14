Ext.define('Prod.model.Notice', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'work_date', type : 'date', dateWriteFormat : T('format.submitDate') },
		{ name : 'operation_id', type : 'string' },
		{ name : 'operation', type : 'auto' },
		{ name : 'msg', type : 'string' },
		{ name : 'creator_id', type : 'string' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater_id', type : 'string' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],

	validations : [
		{type : 'presence', field : 'msg'}
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/notices',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});