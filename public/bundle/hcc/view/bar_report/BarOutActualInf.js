Ext.define('Hcc.view.bar_report.BarOutActualInf', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.bar_report.BarOutActualInfSearch',
		'Hcc.view.bar_report.BarOutActualInfList'
	],
	
	xtype : 'hcc_bar_out_actual_inf',
	
	title : T('menu.BarOutActualInf'),
	
	searchView : 'hcc_bar_out_actual_inf_search',
	
	gridView : 'hcc_bar_out_actual_inf_list'

});