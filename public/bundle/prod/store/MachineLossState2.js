Ext.define('Prod.store.MachineLossState2', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'year', type : 'string' },
		{ name : 'month', type : 'string' },
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
		{ name : 'data_12', type : 'integer' },
		{ name : 'data_13', type : 'integer' },
		{ name : 'data_14', type : 'integer' },
		{ name : 'data_15', type : 'integer' },
		{ name : 'data_16', type : 'integer' },
		{ name : 'data_17', type : 'integer' },
		{ name : 'data_18', type : 'integer' },
		{ name : 'data_19', type : 'integer' },
		{ name : 'data_20', type : 'integer' },
		{ name : 'data_21', type : 'integer' },
		{ name : 'data_22', type : 'integer' },
		{ name : 'data_23', type : 'integer' },
		{ name : 'data_24', type : 'integer' },
		{ name : 'data_25', type : 'integer' },
		{ name : 'data_26', type : 'integer' },
		{ name : 'data_27', type : 'integer' },
		{ name : 'data_28', type : 'integer' },
		{ name : 'data_29', type : 'integer' },
		{ name : 'data_30', type : 'integer' },
		{ name : 'data_31', type : 'integer' },
	],
	
	autoLoad : false,
	
	remoteFilter : true,
	
	// TODO url : shoot.json, method : post
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/MachineLossState2/query.json',
		format : 'json',
		reader : {
			type : 'json',
			root : 'items'
		}
	}
	
});