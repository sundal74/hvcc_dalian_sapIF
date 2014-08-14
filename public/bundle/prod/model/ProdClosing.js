Ext.define('Prod.model.ProdClosing', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'work_date', type : 'string' },
		{ name : 'workcenter', type : 'string' },
		{ name : 'operation_id', type : 'string' },
		{ name : 'operation', type : 'string' },
		{ name : 'operation_desc', type : 'string' },
		{ name : 'closer_id', type : 'string' },
		{ name : 'closer_name', type : 'string' },
		{ name : 'closed_flag', type : 'boolean' },
		{ name : 'closable', type : 'string' },
		{ name : 'closed_at', type : 'date' }
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/prod_closings',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});