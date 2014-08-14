Ext.define('Prod.view.prod_param.ProdParam', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.prod_param.ProdParamSearch',
		'Prod.view.prod_param.ProdParamList'
	],
	
	xtype : 'prod_prod_param',
	
	title : T('title.prod_param'),
	
	searchView : 'prod_prod_param_search',
	
	gridView : 'prod_prod_param_list'
	
});