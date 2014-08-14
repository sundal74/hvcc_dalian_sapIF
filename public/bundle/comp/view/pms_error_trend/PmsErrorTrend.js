Ext.define('Comp.view.pms_error_trend.PmsErrorTrend', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Comp.view.pms_error_trend.PmsErrorTrendSearch',
		'Comp.view.pms_error_trend.PmsErrorTrendList'
	],
	
	xtype : 'comp_pms_error_trend',
	
	title : T('menu.PmsErrorTrend'),
	
	searchView : 'comp_pms_error_trend_search',
	
	gridView : 'comp_pms_error_trend_list'

});