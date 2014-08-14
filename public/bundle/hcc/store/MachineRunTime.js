Ext.define('Hcc.store.MachineRunTime', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'operation', type : 'string' },
		{ name : 'operation_desc', type : 'string' },
		{ name : 'machine', type : 'string' },
		{ name : 'machine_desc', type : 'string' },
		{ name : 'available_time', type : 'float' },
		{ name : 'order_qty', type : 'int' },
		{ name : 'actual_qty', type : 'int' },
		{ name : 'loss_term', type : 'string' },
		{ name : 'loss_count', type : 'string' },
		{ name : 'run_time', type : 'float' },
		{ name : 'hour_rate', type : 'float' }
	],
	
	autoLoad : false,
	
	remoteFilter : true,
	
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/MachineRunTime/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
});