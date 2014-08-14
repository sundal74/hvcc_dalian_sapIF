Ext.define('Hcc.store.ActualPerHour', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'header', type : 'string' },
		{ name : 'data_0', type : 'float' },
		{ name : 'data_1', type : 'float' },
		{ name : 'data_2', type : 'float' },
		{ name : 'data_3', type : 'float' },
		{ name : 'data_4', type : 'float' },
		{ name : 'data_5', type : 'float' },
		{ name : 'data_6', type : 'float' },
		{ name : 'data_7', type : 'float' },
		{ name : 'data_8', type : 'float' },
		{ name : 'data_9', type : 'float' },
		{ name : 'data_10', type : 'float' },
		{ name : 'data_11', type : 'float' },
		{ name : 'data_12', type : 'float' },
		{ name : 'data_13', type : 'float' },
		{ name : 'data_14', type : 'float' },
		{ name : 'data_15', type : 'float' },
		{ name : 'data_16', type : 'float' },
		{ name : 'data_17', type : 'float' },
		{ name : 'data_18', type : 'float' },
		{ name : 'data_19', type : 'float' },
		{ name : 'data_20', type : 'float' },
		{ name : 'data_21', type : 'float' },
		{ name : 'data_22', type : 'float' },
		{ name : 'data_23', type : 'float' },
		{ name : 'data_24', type : 'float' }
	],
	
	autoLoad : false,
	
	remoteFilter : true,
	
	proxy : {
		type : 'memory',
		reader : 'json'
	}
	
});