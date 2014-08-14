Ext.define('Hcc.store.MHSummary', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'workcenter', type : 'string' },
		{ name : 'operation', type : 'string' },
		{ name : 'operation_desc', type : 'string' },
		{ name : 'plan_qty', type : 'integer' },
		{ name : 'actual_qty', type : 'integer' },
		{ name : 'achv_rate', type : 'float' },
		{ name : 'machine_hour', type : 'integer' },
		{ name : 'work_term', type : 'integer' },
		{ name : 'loss_term', type : 'integer' },
		{ name : 'real_worktime', type : 'integer' },
		{ name : 'unit_per_hour', type : 'float' },
		{ name : 'unit_per_m_h', type : 'float' }
	],
	
	autoLoad : false,
	
	groupField : 'workcenter',
	
	remoteFilter : true,
	
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/MHSummary/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
});