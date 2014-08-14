Ext.define('Prod.model.QtyActual', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'work_date', type : 'date', dateWriteFormat : T('format.submitDate') },
		{ name : 'shift', type : 'string' },
		{ name : 'operation_id', type : 'string' },
		{ name : 'operation', type : 'auto' },
		{ name : 'machine_id', type : 'string' },
		{ name : 'machine', type : 'auto' },
		{ name : 'product_id', type : 'string' },
		{ name : 'product', type : 'auto' },
		{ name : 'customer_id', type : 'string' },
		{ name : 'customer', type : 'auto' },
		{ name : 'prod_order_id', type : 'string' },
		{ name : 'actual_qty', type : 'integer' },
		{ name : 'defect_qty', type : 'integer' },
		{ name : 'rework_qty', type : 'integer' },
		{ name : 'description', type : 'string' },
		{ name : 'created_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/qty_actuals',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});