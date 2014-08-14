Ext.define('Prod.view.defect.Defect', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.defect.DefectSearch',
		'Prod.view.defect.DefectList'
	],
	
	xtype : 'prod_defect',
	
	title : T('title.defect'),
	
	searchView : 'prod_defect_search',
	
	gridView : 'prod_defect_list'
	
});