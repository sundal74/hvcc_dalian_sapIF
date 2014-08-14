Ext.define('Hcc.store.Ftt3', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'workcenter', type : 'string' },
		{ name : 'operation', type : 'string' },
		{ name : 'operation_desc', type : 'string' },
		{ name : 'machine', type : 'string' },
		{ name : 'machine_desc', type : 'string' },
		{ name : 'product', type : 'string' },
		{ name : 'product_desc', type : 'string' },
		{ name : 'actual_qty', type : 'float' },
		{ name : 'defect_qty', type : 'float' },
		{ name : 'rework_qty', type : 'float' },
		{ name : 'ftt', type : 'float' },
	],
	
	autoLoad : false,
	
	groupField : 'workcenter',
	
	remoteFilter : true,
	
	// TODO url : shoot.json, method : post
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/ftt3/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
});