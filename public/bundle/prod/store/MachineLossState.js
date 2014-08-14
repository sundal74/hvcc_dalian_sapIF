Ext.define('Prod.store.MachineLossState', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'year', type : 'string' },
		{ name : 'total', type : 'string' },
		{ name : 'data_1', type : 'integer' },
		{ name : 'data_2', type : 'integer' },
		{ name : 'data_3', type : 'integer' },
		{ name : 'data_4', type : 'integer' },
		{ name : 'data_5', type : 'integer' },
		{ name : 'data_6', type : 'integer' },
		{ name : 'data_7', type : 'integer' },
		{ name : 'data_8', type : 'integer' },
		{ name : 'data_9', type : 'integer' },
		{ name : 'data_10', type : 'integer' },
		{ name : 'data_11', type : 'integer' },
		{ name : 'data_12', type : 'integer' }
	],
	
	autoLoad : false,
	
	remoteFilter : true,
	
	// TODO url : shoot.json, method : post
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/MachineLossState/query.json',
		format : 'json',
		reader : {
			type : 'json',
			root : 'items'
		}
	}
	
});