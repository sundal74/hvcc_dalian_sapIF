Ext.define('Comp.store.WorstTop10', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'st_no', type : 'string' },
		{ name : 'st_name', type : 'string' },
		{ name : 'err_code', type : 'string' },
		{ name : 'err_code_name', type : 'string' },
		{ name : 'err_cnt', type : 'int' }
	],
	
	autoLoad : false,
	
	remoteFilter : true,
	
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/PmsWorstTop10/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
		
});