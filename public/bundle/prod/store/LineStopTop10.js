Ext.define('Prod.store.LineStopTop10', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'workcenter', type : 'string' },
		{ name : 'operation', type : 'string' },
		{ name : 'operation_desc', type : 'string' },
		{ name : 'machine', type : 'string' },
		{ name : 'machine_desc', type : 'string' },
		{ name : 'shift', type : 'string' },
		{ name : 'loss_count', type : 'string' },
		{ name : 'loss_term', type : 'string' },
		{ name : 'maint_term', type : 'string' }
	],
	
	autoLoad : false,
	
	remoteFilter : true,
	
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/LineStopTop10/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}

});