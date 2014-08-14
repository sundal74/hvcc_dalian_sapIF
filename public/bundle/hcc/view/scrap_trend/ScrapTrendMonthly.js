Ext.define('Hcc.view.scrap_trend.ScrapTrendMonthly', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.scrap_trend.ScrapTrendMonthlySearch',
		'Hcc.view.scrap_trend.ScrapTrendMonthlyList'
	],
	
	xtype : 'hcc_scrap_trend_monthly',
	
	title : T('menu.ScrapTrendMonthly'),
	
	searchView : 'hcc_scrap_trend_monthly_search',
	
	gridView : 'hcc_scrap_trend_monthly_list'

});