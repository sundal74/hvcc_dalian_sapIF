Ext.define('Comp.store.ProdHist', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'work_date', type : 'date' },
		{ name : 'routing', type : 'string' },
		{ name : 'int_no', type : 'string' },
		{ name : 'ser_no', type : 'string' },
		{ name : 'created_at', type : 'date' }
	],
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	pageSize : 50,
	
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/PmsProdHist/query.json',
		format : 'json',
		reader : {
			type : 'json',
			root: 'items',
			successProperty : 'success',
			totalProperty : 'total'
		}
	}
		
});