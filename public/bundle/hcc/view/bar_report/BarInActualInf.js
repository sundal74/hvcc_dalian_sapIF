Ext.define('Hcc.view.bar_report.BarInActualInf', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.bar_report.BarInActualInfSearch',
		'Hcc.view.bar_report.BarInActualInfList'
	],
	
	xtype : 'hcc_bar_in_actual_inf',
	
	title : T('menu.BarInActualInf'),
	
	searchView : 'hcc_bar_in_actual_inf_search',
	
	gridView : 'hcc_bar_in_actual_inf_list'

});