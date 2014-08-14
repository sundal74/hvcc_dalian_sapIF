Ext.define('Hcc.store.BarLoc', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'name', type : 'string' },
		{ name : 'loc_cd', type : 'string' }
	],
	
	autoLoad : false,
	
	remoteFilter : true,
	
	// TODO url : shoot.json, method : post
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/BarLoc/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
});