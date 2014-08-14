Ext.define('Comp.store.PmsAlarms', {
	
	extend : 'Ext.data.Store',
	
	fields : [
			{ name : 'alarm_type', type : 'string' },
			{ name : 'prd_date', type : 'string' },
			{ name : 'shift', type : 'string' },
			{ name : 'routing', type : 'string' },
			{ name : 'st_no', type : 'string' },
			{ name : 'p_code', type : 'string' },
			{ name : 'total', type : 'string' },
			{ name : 'first', type : 'string' },
			{ name : 'reject', type : 'string' },
			{ name : 'err_code', type : 'string' },
			{ name : 'err_cnt', type : 'string' },
			{ name : 'int_no', type : 'string' },
			{ name : 'srl_no', type : 'string' },
			{ name : 'comments', type : 'string' },
			{ name : 'created_at', type : 'date' }
		],
	
	autoLoad : false,
	
	remoteFilter : true,
	
	pageSize : 50,
	
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/PmsAlarms/query.json',
		format : 'json',
		reader : {
			type : 'json',
			root: 'items',
			successProperty : 'success',
			totalProperty : 'total'
		}
	}
		
});