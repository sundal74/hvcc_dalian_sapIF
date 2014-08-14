Ext.define('Prod.view.defect_code.DefectCode', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.defect_code.DefectCodeSearch',
		'Prod.view.defect_code.DefectCodeList'
	],
	
	xtype : 'prod_defect_code',
	
	title : T('title.defect_code'),
	
	searchView : 'prod_defect_code_search',
	
	gridView : 'prod_defect_code_list'
	
});