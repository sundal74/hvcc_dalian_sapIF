Ext.define('Prod.store.DefectMgt', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'order_date', type : 'string' },
		{ name : 'shift', type : 'string' },
		{ name : 'operation', type : 'string' },
		{ name : 'operation_desc', type : 'string' },
		{ name : 'machine', type : 'string' },
		{ name : 'machine_desc', type : 'string' },
		{ name : 'product', type : 'string' },
		{ name : 'product_desc', type : 'string' },
		{ name : 'product_id', type : 'string' },
		{ name : 'actual_start_time', type : 'date', dateWriteFormat : T('format.submitDatetime') },
		{ name : 'actual_qty', type : 'integer' },
		{ name : 'defect_qty', type : 'integer' },
		{ name : 'rework_qty', type : 'integer' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
	autoLoad : false,
	
	pageSize : 50,
	
	remoteFilter : true,
	
	// TODO url : shoot.json, method : post
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/DefectMgt/query.json',
		format : 'json',
		reader : {
			type : 'json',
			root: 'items',
			successProperty : 'success',
			totalProperty : 'total'
		}
	}
	
});