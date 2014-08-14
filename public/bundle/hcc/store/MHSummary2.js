Ext.define('Hcc.store.MHSummary2', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ 
			name : 'operation', 
			type : 'string',
			convert : function(v, record) {
				return v + " (" + record.data.operation_desc + ")";
			}
		},
		{ name : 'operation_desc', type : 'string' },
		{ name : 'machine', type : 'string' },
		{ name : 'machine_desc', type : 'string' },
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
	
	groupField : 'operation',
	
	remoteFilter : true,
	
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/MHSummary2/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
});