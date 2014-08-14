Ext.define('Prod.model.WorkerTime', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'work_date', type : 'date', dateWriteFormat : T('format.submitDate') },
		{ name : 'shift', type : 'integer' },
		{ name : 'prod_order_id', type : 'string' },
		{ name : 'operation_id', type : 'string' },
		{ name : 'operation', type : 'auto' },
		{ name : 'machine_id', type : 'string' },
		{ name : 'machine', type : 'auto' },
		{ name : 'product_id', type : 'string' },
		{ name : 'product', type : 'auto' },
		{ name : 'user_id', type : 'string' },
		{ name : 'user', type : 'auto' },
		{ name : 'start_time', type : 'date', dateWriteFormat : T('format.submitDatetime') },
		{ name : 'end_time', type : 'date', dateWriteFormat : T('format.submitDatetime') },
		{ name : 'work_term', type : 'integer' },
		{ name : 'loss_term', type : 'integer' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/worker_times',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});