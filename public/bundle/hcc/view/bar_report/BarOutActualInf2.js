Ext.define('Hcc.view.bar_report.BarOutActualInf2', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.bar_report.BarOutActualInf2Search',
		'Hcc.view.bar_report.BarOutActualInf2List'
	],
	
	xtype : 'hcc_bar_out_actual_inf2',
	
	title : T('menu.BarOutActualInf2'),
	
	searchView : 'hcc_bar_out_actual_inf2_search',
	
	gridView : 'hcc_bar_out_actual_inf2_list'

});