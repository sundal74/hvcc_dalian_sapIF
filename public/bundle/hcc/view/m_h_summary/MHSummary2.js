Ext.define('Hcc.view.m_h_summary.MHSummary2', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.m_h_summary.MHSummary2Search',
		'Hcc.view.m_h_summary.MHSummary2List'
	],
	
	xtype : 'hcc_m_h_summary2',
	
	title : T('menu.MHSummary2'),
	
	searchView : 'hcc_m_h_summary2_search',
	
	gridView : 'hcc_m_h_summary2_list'

});