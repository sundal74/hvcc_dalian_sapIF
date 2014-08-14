Ext.define('Comp.store.TsfrStatus', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'routing', type : 'string' },
		{ name : 'st_no', type : 'string' },
		{ name : 'st_name', type : 'string' },
		{ name : 'total', type : 'string' },
		{ name : 'first', type : 'string' },
		{ name : 'reject', type : 'string' },
		{ name : 'target_ftt', type : 'string' },
		{ name : 'actual_ftt', type : 'string' }
	],
	
	autoLoad : false,
	
	remoteFilter : true,
	
	groupField : 'routing',
	
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/PmsTsfrStatus/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
		
});