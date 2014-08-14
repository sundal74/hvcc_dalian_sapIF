Ext.define('Hcc.store.DefectCodeTop10', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'ranking', type : 'string' },
		{ name : 'defect_code_name', type : 'string' },
		{ name : 'defect_code_desc', type : 'string' },
		{ name : 'sum_defect_qty', type : 'integer' }
	],
	
	autoLoad : false,
	
	remoteFilter : true,
	
	sorters: [{
		property : 'rank',
		direction : 'ASC'
	}],
	
	// TODO url : shoot.json, method : post
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/DefectCodeTop10/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
	
});