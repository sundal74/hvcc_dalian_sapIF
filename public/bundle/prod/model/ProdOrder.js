Ext.define('Prod.model.ProdOrder', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'order_date', type : 'date', dateWriteFormat : T('format.submitDate') },
		{ name : 'workcenter_id', type : 'string' },
		{ name : 'workcenter_name', type : 'string' },
		{ name : 'workcenter', type : 'auto' },
		{ name : 'shift', type : 'string' },
		{ name : 'operation_id', type : 'string' },
		{ name : 'operation', type : 'auto' },
		{ name : 'operation_name', type : 'string' },
		{ name : 'machine_id', type : 'string' },
		{ name : 'machine', type : 'auto' },
		{ name : 'product_id', type : 'string' },
		{ name : 'product', type : 'auto' },
		{ name : 'product_name', type : 'string' },
		{ name : 'customer', type : 'auto' },
		{ name : 'customer_id', type : 'string' },
		{ name : 'status', type : 'string' },
		{ name : 'order_seq', type : 'integer' },
		{ name : 'main_op_flag', type : 'boolean' },
		{ name : 'uph', type : 'float' },
		{ name : 'cycletime', type : 'float' },
		{ name : 'order_qty', type : 'integer' },
		{ name : 'pallet_qty', type : 'integer' },
		{ name : 'actual_qty', type : 'integer' },
		{ name : 'defect_qty', type : 'integer' },
		{ name : 'rework_qty', type : 'integer' },
		{ name : 'actual_start_time', type : 'date', dateWriteFormat : T('format.submitDatetime') },
		{ name : 'actual_end_time', type : 'date', dateWriteFormat : T('format.submitDatetime') },
		{ name : 'worker_count', type : 'integer' }
		
		/*{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },		
		{ name : 'creator_id', type : 'string' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater_id', type : 'string' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }*/
	],

  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/prod_orders',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});