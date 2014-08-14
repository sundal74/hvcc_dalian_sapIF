Ext.define('Prod.model.Lot', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'name', type : 'string' },
		{ name : 'lot_no', type : 'string' },
		{ name : 'serial_no', type : 'string' },
		{ name : 'status', type : 'string' },
		{ name : 'shift', type : 'string' },
		{ name : 'prod_order_id', type : 'string' },
		{ name : 'product_id', type : 'string' },
		{ name : 'product', type : 'auto' },
		{ name : 'operation_id', type : 'string' },
		{ name : 'operation', type : 'auto' },
		{ name : 'machine_id', type : 'string' },
		{ name : 'machine', type : 'auto' },
		{ name : 'actual_qty', type : 'integer' },
		{ name : 'tran_time', type : 'date', dateWriteFormat : T('format.submitDatetime') },
		{ name : '_cud_flag_', type : 'string' }
	],

	validations : [
		{type : 'presence', field : 'name'}
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/lots',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});