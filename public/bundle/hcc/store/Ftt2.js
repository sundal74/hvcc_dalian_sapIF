Ext.define('Hcc.store.Ftt2', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'machine', type : 'string' },
		{ name : 'machine_desc', type : 'string' },
		{ name : 'operation', type : 'string' },
		{ name : 'operation_desc', type : 'string' },
		{ name : 'input_qty', type : 'int' },
		{ name : 'defect_qty', type : 'float' },
		{ name : 'rework_qty', type : 'float' },
		{ name : 'ftt_value', type : 'float' },
		{ name : 'workcenter', type : 'string' }
	],
	
	autoLoad : false,
	
	groupField : 'workcenter',
	
	remoteFilter : true,
	
	// TODO url : shoot.json, method : post
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/ftt2/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
	
});