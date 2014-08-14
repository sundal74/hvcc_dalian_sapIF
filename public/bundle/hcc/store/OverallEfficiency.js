Ext.define('Hcc.store.OverallEfficiency', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'work_date', type : 'string' },
		{ name : 'operation', type : 'string' },
		{ name : 'operation_desc', type : 'string' },
		{ name : 'machine', type : 'string' },
		{ name : 'machine_desc', type : 'string' },
		{ name : 'machine_ct', type : 'float' },
		{ name : 'actual_qty', type : 'int' },
		{ name : 'input_worktime', type : 'int' },
		{ name : 'net_worktime', type : 'int' },
		{ name : 'prod_eff', type : 'float' },
		{ name : 'real_worktime', type : 'int' },
		{ name : 'loss_worktime', type : 'int' },
		{ name : 'order_qty', type : 'int' },
		{ name : 'workcenter', type : 'string' }
	],
	
	autoLoad : false,
	
	remoteFilter : true,
	
	// TODO url : shoot.json, method : post
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/overall_efficiency/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}

});