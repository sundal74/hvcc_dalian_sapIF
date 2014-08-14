Ext.define('Hcc.view.prod_overview.ProdOverview', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.prod_overview.ProdOverviewSearch',
		'Hcc.view.prod_overview.ProdOverviewList'
	],
	
	xtype : 'hcc_prod_overview',
	
	title : T('menu.ProdOverview'),
	
	searchView : 'hcc_prod_overview_search',
	
	gridView : 'hcc_prod_overview_list'

});