Ext.define('Hcc.view.bar_report.BarGrBySer', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.bar_report.BarGrBySerSearch',
		'Hcc.view.bar_report.BarGrBySerList'
	],
	
	xtype : 'hcc_bar_gr_by_ser',
	
	title : T('menu.BarGrBySer'),
	
	searchView : 'hcc_bar_gr_by_ser_search',
	
	gridView : 'hcc_bar_gr_by_ser_list'

});