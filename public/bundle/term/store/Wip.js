Ext.define('Term.store.Wip', {
	
	extend : 'Ext.data.Store',

	fields : [
		{ name : 'machine', type : 'string' },
		{ name : 'product', type : 'string' },
		{ name : 'product_desc', type : 'string' },
		{ name : 'qty', type : 'integer' }
	],
	
	autoLoad : false,
	
	pageSize : 5000,
	
	remoteFilter : true,
	
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_services/sheepTest/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
});