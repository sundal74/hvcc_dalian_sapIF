Ext.define('Hcc.view.m_h_summary.MHSummary', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.m_h_summary.MHSummarySearch',
		'Hcc.view.m_h_summary.MHSummaryList'
	],
	
	xtype : 'hcc_m_h_summary',
	
	title : T('title.m_h_summary'),
	
	searchView : 'hcc_m_h_summary_search',
	
	gridView : 'hcc_m_h_summary_list'

});