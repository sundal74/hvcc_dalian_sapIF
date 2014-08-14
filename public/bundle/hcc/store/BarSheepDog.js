Ext.define('Hcc.store.BarSheepDog', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'item_cd', type : 'string' },
		{ name : 'loc_cd', type : 'string' },
		{ name : 'lot_rqty', type : 'integer' }
	],
	
	autoLoad : false,
	
	remoteFilter : false,
	
	// TODO url : shoot.json, method : post
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/BarSheepDog/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
});