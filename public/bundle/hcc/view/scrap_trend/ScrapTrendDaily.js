Ext.define('Hcc.view.scrap_trend.ScrapTrendDaily', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.scrap_trend.ScrapTrendDailySearch',
		'Hcc.view.scrap_trend.ScrapTrendDailyList'
	],
	
	xtype : 'hcc_scrap_trend_daily',
	
	title : T('menu.ScrapTrendDaily'),
	
	searchView : 'hcc_scrap_trend_daily_search',
	
	gridView : 'hcc_scrap_trend_daily_list'

});