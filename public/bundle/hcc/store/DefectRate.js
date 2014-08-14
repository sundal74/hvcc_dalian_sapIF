Ext.define('Hcc.store.DefectRate', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'workcenter', type : 'string' },
		{ name : 'operation', type : 'string' },
		{ name : 'operation_desc', type : 'string' },
		//{ name : 'machine', type : 'string' },
		{ name : 'dept', type : 'string' },
		{ name : 'sum_actual_qty', type : 'int' },
		{ name : 'sum_defect_qty', type : 'int' },
		{ name : 'defect_rate', type : 'float' }
	],
	
	autoLoad : false,
	
	groupField : 'workcenter',
	
	remoteFilter : true,
	
	// TODO url : shoot.json, method : post
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/DefectRate/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
});