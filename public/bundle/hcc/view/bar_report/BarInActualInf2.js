Ext.define('Hcc.view.bar_report.BarInActualInf2', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.bar_report.BarInActualInf2Search',
		'Hcc.view.bar_report.BarInActualInf2List'
	],
	
	xtype : 'hcc_bar_in_actual_inf2',
	
	title : T('menu.BarInActualInf2'),
	
	searchView : 'hcc_bar_in_actual_inf2_search',
	
	gridView : 'hcc_bar_in_actual_inf2_list'

});