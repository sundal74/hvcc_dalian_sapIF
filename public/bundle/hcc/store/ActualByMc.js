Ext.define('Hcc.store.ActualByMc', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'shift', type : 'string' },
		{ name : 'workcenter', type : 'string' },
		{ name : 'operation', type : 'string' },
		{ name : 'operation_desc', type : 'string' },
		{ name : 'machine', type : 'string' },
		{ name : 'machine_desc', type : 'string' },
		{ name : 'plan', type : 'integer' },
		{ name : 'actual', type : 'integer' },
		{ name : 'scrap', type : 'integer' },
		{ name : 'rework', type : 'integer' },
		{ name : 'achv_rate', type : 'float' }
	],
	
	autoLoad : false,
	
	remoteFilter : true,
	
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/PlanVsActual/query.json?category-eq=by_machine',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
	
});