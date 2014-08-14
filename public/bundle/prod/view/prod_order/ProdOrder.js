Ext.define('Prod.view.prod_order.ProdOrder', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.prod_order.ProdOrderSearch',
		'Prod.view.prod_order.ProdOrderList'
	],
	
	xtype : 'prod_prod_order',
	
	title : T('title.prod_order'),
	
	searchView : 'prod_prod_order_search',
	
	gridView : 'prod_prod_order_list'
	
});