Ext.define('Hcc.view.daily_actual_qty.DailyActualQty', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.daily_actual_qty.DailyActualQtySearch',
		'Hcc.view.daily_actual_qty.DailyActualQtyList'
	],
	
	xtype : 'hcc_daily_actual_qty',
	
	title : T('title.daily_actual_qty'),
	
	searchView : 'hcc_daily_actual_qty_search',
	
	gridView : 'hcc_daily_actual_qty_list'

});