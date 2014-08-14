Ext.define('Prod.model.MonProdPlan', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'workcenter_id', type : 'string' },
		{ name : 'product_desc', type : 'string' },
		{ name : 'product', type : 'string' },
		{ name : 'operation_desc', type : 'string' },
		{ name : 'operation', type : 'string' },
		{ name : 'w1_plan_qty', type : 'integer' },
		{ name : 'w2_plan_qty', type : 'integer' },
		{ name : 'w3_plan_qty', type : 'integer' },
		{ name : 'w4_plan_qty', type : 'integer' },
		{ name : 'w5_plan_qty', type : 'integer' }
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/mon_prod_plans',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});