Ext.define('Hcc.view.defect_rate.DefectRate', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.defect_rate.DefectRateSearch',
		'Hcc.view.defect_rate.DefectRateList'
	],
	
	xtype : 'hcc_defect_rate',
	
	title : T('title.defect_rate'),
	
	searchView : 'hcc_defect_rate_search',
	
	gridView : 'hcc_defect_rate_list'

});