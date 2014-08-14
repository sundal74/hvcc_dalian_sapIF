Ext.define('Prod.model.OperationsDefects', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'operation_id', type : 'string' },
		{ name : 'defect_code_id', type : 'string' },
		{ name : 'defect_code', type : 'auto' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy : {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/defect_codes/operation_defect_codes',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});