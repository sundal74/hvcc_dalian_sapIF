Ext.define('Hcc.view.bar_report.BarGiBySer', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.bar_report.BarGiBySerSearch',
		'Hcc.view.bar_report.BarGiBySerList'
	],
	
	xtype : 'hcc_bar_gi_by_ser',
	
	title : T('menu.BarGiBySer'),
	
	searchView : 'hcc_bar_gi_by_ser_search',
	
	gridView : 'hcc_bar_gi_by_ser_list'

});