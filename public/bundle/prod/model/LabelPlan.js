Ext.define('Prod.model.LabelPlan', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'order_date', type : 'date', dateWriteFormat : T('format.submitDate') },
		{ name : 'shift', type : 'string' },
		{ name : 'operation_id', type : 'string' },
		{ name : 'operation', type : 'auto' },
		{ name : 'product_id', type : 'string' },
		{ name : 'product', type : 'auto' },
		{ name : 'customer_id', type : 'string' },
		{ name : 'customer', type : 'auto' },
		{ name : 'order_qty', type : 'integer' },
		{ name : 'lot_qty', type : 'integer' },
		{ name : 'print_qty', type : 'integer' },
		{ name : 'printed_qty', type : 'integer' },
		{ name : 'completed_flag', type : 'boolean' },
		{ name : 'reprinted_flag', type : 'boolean' },
		{ name : 'creator_id', type : 'string' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater_id', type : 'string' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'string' },
		{ name : 'updated_at', type : 'string' },
		{ name : '_cud_flag_', type : 'string' }
	],

	/*validations : [
		{type : 'presence', field : 'name'}
	],*/
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/label_plans',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});