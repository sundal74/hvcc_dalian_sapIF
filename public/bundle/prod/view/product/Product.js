Ext.define('Prod.view.product.Product', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.product.ProductSearch',
		'Prod.view.product.ProductList'
	],
	
	xtype : 'prod_product',
	
	title : T('label.product'),
	
	searchView : 'prod_product_search',
	
	gridView : 'prod_product_list'
	
});