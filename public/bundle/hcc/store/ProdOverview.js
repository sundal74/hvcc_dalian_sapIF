Ext.define('Hcc.store.ProdOverview', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'wc', type : 'string' },
		{ name : 'op', type : 'string' },
		{ name : 'op_name', type : 'string' },
		{ name : 'mc', type : 'string' },
		{ name : 'mc_name', type : 'string' },
		{ name : 'status', type : 'string' },
		{ name : 'linestop', type : 'string' },
		{ name : 'workers', type : 'string' },
		{ name : 'plan', type : 'string' },
		{ name : 'actual', type : 'string' },
		{ name : 'scrap', type : 'string' },
		{ name : 'rework', type : 'string' }
	],
	
	autoLoad : false,
	
	groupField : 'wc',
	
	remoteFilter : true,
	
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/ProdOverview/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
		
});