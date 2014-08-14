Ext.define('Hcc.view.defect_code_top10.DefectCodeTop10', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.defect_code_top10.DefectCodeTop10Search',
		'Hcc.view.defect_code_top10.DefectCodeTop10List'
	],
	
	xtype : 'hcc_defect_code_top10',
	
	title : T('title.defect_code_top10'),
	
	searchView : 'hcc_defect_code_top10_search',
	
	gridView : 'hcc_defect_code_top10_list'

});