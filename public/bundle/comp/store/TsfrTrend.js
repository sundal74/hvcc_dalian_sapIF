Ext.define('Comp.store.TsfrTrend', {
	
	extend : 'Ext.data.Store',
	
	fields : [
			{ name : 'st_no', type : 'string' },
			{ name : 'st_name', type : 'string' },
			{ name : 'd1_value', type : 'string' },
			{ name : 'd2_value', type : 'string' },
			{ name : 'd3_value', type : 'string' },
			{ name : 'd4_value', type : 'string' },
			{ name : 'd5_value', type : 'string' },
			{ name : 'd6_value', type : 'string' },
			{ name : 'd7_value', type : 'string' }
		],
	
	autoLoad : false,
	
	remoteFilter : true,
	
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/PmsTsfrTrend/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
		
});