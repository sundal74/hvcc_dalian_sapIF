Ext.define('Prod.model.Defect', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'dept_type', type : 'string' },
		{ name : 'work_date', type : 'date', dateWriteFormat : T('format.submitDate') },
		{ name : 'shift', type : 'string' },
		{ name : 'operation_id', type : 'string' },
		{ name : 'operation', type : 'auto' },
		{ name : 'machine_id', type : 'string' },
		{ name : 'machine', type : 'auto' },
		{ name : 'product_id', type : 'string' },
		{ name : 'product', type : 'auto' },
		{ name : 'child_product_id', type : 'string' },
		{ name : 'child_product', type : 'auto' },
		{ name : 'prod_order_id', type : 'string' },
		{ name : 'defect_code', type : 'auto' },
		{ name : 'defect_code_id', type : 'string' },
		{ name : 'defect_qty', type : 'integer' },
		{ name : 'description', type : 'string' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/defects',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});