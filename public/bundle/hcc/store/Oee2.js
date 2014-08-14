Ext.define('Hcc.store.Oee2', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'machine', type : 'string' },
		{ name : 'machine_desc', type : 'string' },
		{ name : 'operation', type : 'string' },
		{ name : 'operation_desc', type : 'string' },
		{ name : 'availability', type : 'float' },
		{ name : 'perf_eff', type : 'float' },
		{ name : 'quality', type : 'float' },
		{ name : 'oee_value', type : 'float' },
		{ name : 'workcenter', type : 'string' }
	],
	
	autoLoad : false,
	
	groupField : 'workcenter',
	
	remoteFilter : true,
	
	// TODO url : shoot.json, method : post
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/oee2/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
	
});