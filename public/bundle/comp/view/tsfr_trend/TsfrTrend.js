Ext.define('Comp.view.tsfr_trend.TsfrTrend', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Comp.view.tsfr_trend.TsfrTrendSearch',
		'Comp.view.tsfr_trend.TsfrTrendList'
	],
	
	xtype : 'comp_tsfr_trend',
	
	title : T('menu.TsfrTrend'),
	
	searchView : 'comp_tsfr_trend_search',
	
	gridView : 'comp_tsfr_trend_list'

});