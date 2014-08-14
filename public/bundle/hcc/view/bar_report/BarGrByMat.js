Ext.define('Hcc.view.bar_report.BarGrByMat', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.bar_report.BarGrByMatSearch',
		'Hcc.view.bar_report.BarGrByMatList'
	],
	
	xtype : 'hcc_bar_gr_by_mat',
	
	title : T('menu.BarGrByMat'),
	
	searchView : 'hcc_bar_gr_by_mat_search',
	
	gridView : 'hcc_bar_gr_by_mat_list'

});