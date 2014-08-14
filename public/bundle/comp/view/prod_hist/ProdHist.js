Ext.define('Comp.view.prod_hist.ProdHist', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Comp.view.prod_hist.ProdHistSearch',
		'Comp.view.prod_hist.ProdHistList',
		'Comp.view.prod_hist.ProdHistSubList'
	],
	
	xtype : 'comp_prod_hist',
	
	title : T('menu.ProdHist'),
	
	layout : { type : 'hbox', align : 'stretch' },
	
	searchView : 'comp_prod_hist_search',
	
	gridView : 'comp_prod_hist_list',
	
	subView : 'comp_prod_hist_sub_list'

});