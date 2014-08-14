Ext.define('Hcc.store.Oee', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'machine', type : 'string' },
		{ name : 'machine_desc', type : 'string' },
		{ name : 'operation', type : 'string' },
		{ name : 'operation_desc', type : 'string' },
		{ name : 'availability', type : 'int' },
		{ name : 'perf_eff', type : 'float' },
		{ name : 'quality', type : 'float' },
		{ name : 'oee_value', type : 'float' },
		{ name : 'work_date', type : 'string' },
		{ name : 'workcenter', type : 'string' }
	],
	
	autoLoad : false,
	
	remoteFilter : true,
	
	// TODO url : shoot.json, method : post
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/oee/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
	
});