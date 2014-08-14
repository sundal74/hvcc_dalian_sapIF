Ext.define('Hcc.store.Bts2', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'work_date', type : 'string' },
		{ name : 'workcenter', type : 'string' },
		{ name : 'operation',  type : 'string' },
		{ name : 'operation_desc', type : 'string' },
		{ name : 'machine',  type : 'string' },
		{ name : 'machine_desc', type : 'string' },
		{ name : 'product',  type : 'string' },
		{ name : 'product_desc', type : 'string' },
		{ name : 'plan_qty', type : 'integer' },
		{ name : 'actual_qty', type : 'integer' },
		{ name : 'plan_act_lower_qty', type : 'integer' },
		{ name : 'plan_achv_qty', type : 'integer' },
		{ name : 'vol_perf', type : 'float' },
		{ name : 'mix_perf', type : 'float' },
		{ name : 'seq_perf', type : 'float' },
		{ name : 'bts_value', type : 'float' }	
	],
	
	autoLoad : false,
	
	groupField : 'workcenter',
	
	remoteFilter : true,
	
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/bts2/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
	
});