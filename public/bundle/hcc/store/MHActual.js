Ext.define('Hcc.store.MHActual', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'workcenter', type : 'string' },
		{ name : 'operation', type : 'string' },
		{ name : 'operation_desc', type : 'string' },
		{ name : 'machine', type : 'string' },
		{ name : 'machine_desc', type : 'string' },
		{ name : 'product', type : 'string' },
		{ name : 'product_desc', type : 'string' },
		{ name : 'customer', type : 'string' },
		{ name : 'order_qty', type : 'int' },
		{ name : 'actual_qty', type : 'int' },
		{ name : 'scrap_qty', type : 'int' },
		{ name : 'achv_rate', type : 'float' },
	],
	
	autoLoad : false,
	
	groupField : 'workcenter',
	
	remoteFilter : true,
	
	// TODO url : shoot.json, method : post
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/m_h_actual/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
});