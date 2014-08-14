Ext.define('Prod.view.prod_closing.ProdClosing', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.prod_closing.ProdClosingSearch',
		'Prod.view.prod_closing.ProdClosingList'
	],
	
	xtype : 'prod_prod_closing',
	
	title : T('menu.ProdClosing'),
	
	searchView : 'prod_prod_closing_search',
	
	gridView : 'prod_prod_closing_list'
	
});