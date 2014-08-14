Ext.define('Prod.model.ProdPlan', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'plan_date', type : 'date', dateWriteFormat : T('format.submitDate') },
		{ name : 'shift', type : 'string' },
		{ name : 'workcenter_id', type : 'string' },
		{ name : 'workcenter', type : 'auto' },
		{ name : 'operation_id', type : 'string' },
		{ name : 'operation', type : 'auto' },
		{ name : 'product_id', type : 'string' },
		{ name : 'product', type : 'auto' },
		{ name : 'customer_id', type : 'string' },
		{ name : 'shift1_plan_qty', type : 'integer' },
		{ name : 'shift2_plan_qty', type : 'integer' },
		{ name : 'shift3_plan_qty', type : 'integer' },
		{ name : 'shift1_seq', type : 'integer' },
		{ name : 'shift2_seq', type : 'integer' },
		{ name : 'shift3_seq', type : 'integer' },
		{ name : 'creator_id', type : 'string' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater_id', type : 'string' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],

  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/prod_plans',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});