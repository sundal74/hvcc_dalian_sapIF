Ext.define('Hcc.store.Ftt', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'machine', type : 'string' },
		{ name : 'machine_desc', type : 'string' },
		{ name : 'operation', type : 'string' },
		{ name : 'operation_desc', type : 'string' },
		{ name : 'work_date', type : 'string' },
		{ name : 'input_qty', type : 'int' },
		{ name : 'defect_qty', type : 'int' },
		{ name : 'rework_qty', type : 'int' },
		{ name : 'ftt_value', type : 'float' },
		{ name : 'workcenter', type : 'string' }
	],
	
	autoLoad : false,
	
	remoteFilter : true,
	
	// TODO url : shoot.json, method : post
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/ftt/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
		
});