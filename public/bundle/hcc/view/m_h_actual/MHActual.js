Ext.define('Hcc.view.m_h_actual.MHActual', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.m_h_actual.MHActualSearch',
		'Hcc.view.m_h_actual.MHActualList'
	],
	
	xtype : 'hcc_m_h_actual',
	
	title : T('title.m_h_actual'),
	
	searchView : 'hcc_m_h_actual_search',
	
	gridView : 'hcc_m_h_actual_list'

});