Ext.define('Hcc.view.overall_efficiency.OverallEfficiency2', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.overall_efficiency.OverallEfficiency2Search',
		'Hcc.view.overall_efficiency.OverallEfficiency2List'
	],
	
	xtype : 'hcc_overall_efficiency2',
	
	title : T('title.overall_efficiency2'),
	
	searchView : 'hcc_overall_efficiency2_search',
	
	gridView : 'hcc_overall_efficiency2_list'

});