Ext.define('Comp.model.PmsMasterModel', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'routing', type : 'string' },
		{ name : 'p_code', type : 'string' },
		{ name : 'model_no', type : 'string' },
		{ name : 'model_name', type : 'string' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/pms_master_models',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});