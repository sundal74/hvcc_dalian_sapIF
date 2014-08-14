Ext.define('Hcc.view.bar_report.BarGiByMat', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.bar_report.BarGiByMatSearch',
		'Hcc.view.bar_report.BarGiByMatList'
	],
	
	xtype : 'hcc_bar_gi_by_mat',
	
	title : T('menu.BarGiByMat'),
	
	searchView : 'hcc_bar_gi_by_mat_search',
	
	gridView : 'hcc_bar_gi_by_mat_list'

});