Ext.define('Hcc.store.ActualPer10Min', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'header', type : 'string' },
		{ name : 'data_0_target', type : 'float' },
		{ name : 'data_0_actual', type : 'float' },
		{ name : 'data_1_target', type : 'float' },
		{ name : 'data_1_actual', type : 'float' },
		{ name : 'data_2_target', type : 'float' },
		{ name : 'data_2_actual', type : 'float' },
		{ name : 'data_3_target', type : 'float' },
		{ name : 'data_3_actual', type : 'float' },
		{ name : 'data_4_target', type : 'float' },
		{ name : 'data_4_actual', type : 'float' },
		{ name : 'data_5_target', type : 'float' },
		{ name : 'data_5_actual', type : 'float' },
		{ name : 'data_6_target', type : 'float' },
		{ name : 'data_6_actual', type : 'float' },
		{ name : 'data_7_target', type : 'float' },
		{ name : 'data_7_actual', type : 'float' },
		{ name : 'data_8_target', type : 'float' },
		{ name : 'data_8_actual', type : 'float' },
		{ name : 'data_9_target', type : 'float' },
		{ name : 'data_9_actual', type : 'float' },
		{ name : 'data_10_target', type : 'float' },
		{ name : 'data_10_actual', type : 'float' },
		{ name : 'data_11_target', type : 'float' },
		{ name : 'data_11_actual', type : 'float' },
		{ name : 'data_12_target', type : 'float' },
		{ name : 'data_12_actual', type : 'float' },
		{ name : 'data_13_target', type : 'float' },
		{ name : 'data_13_actual', type : 'float' },
		{ name : 'data_14_target', type : 'float' },
		{ name : 'data_14_actual', type : 'float' },
		{ name : 'data_15_target', type : 'float' },
		{ name : 'data_15_actual', type : 'float' },
		{ name : 'data_16_target', type : 'float' },
		{ name : 'data_16_actual', type : 'float' },
		{ name : 'data_17_target', type : 'float' },
		{ name : 'data_17_actual', type : 'float' },
		{ name : 'data_18_target', type : 'float' },
		{ name : 'data_18_actual', type : 'float' },
		{ name : 'data_19_target', type : 'float' },
		{ name : 'data_19_actual', type : 'float' },
		{ name : 'data_20_target', type : 'float' },
		{ name : 'data_20_actual', type : 'float' },
		{ name : 'data_21_target', type : 'float' },
		{ name : 'data_21_actual', type : 'float' },
		{ name : 'data_22_target', type : 'float' },
		{ name : 'data_22_actual', type : 'float' },
		{ name : 'data_23_target', type : 'float' },
		{ name : 'data_23_actual', type : 'float' }
	],
	
	autoLoad : false,
	
	remoteFilter : true,
	
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/ActualPer10Min/query.json',
		format : 'json',
		reader : {
			type : 'json',
			root : 'grid'
		}
	}
	
});