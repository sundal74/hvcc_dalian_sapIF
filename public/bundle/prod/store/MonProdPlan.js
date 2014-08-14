Ext.define('Prod.store.MonProdPlan', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.MonProdPlan',
	
	model : 'Prod.model.MonProdPlan',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
	
	pageSize : 50,
	
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/MonProdPlan/query.json',
		format : 'json',
		reader : {
			type : 'json',
			root: 'items',
			successProperty : 'success',
			totalProperty : 'total'
		}
	}
	
});