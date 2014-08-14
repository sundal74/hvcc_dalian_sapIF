Ext.define('Comp.model.PmsMasterError', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'routing', type : 'string' },
		{ name : 'st_no', type : 'string' },
		{ name : 'err_code', type : 'string' },
		{ name : 'err_name', type : 'string' },
		{ name : 'err_type', type : 'string' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/pms_master_errors',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});