Ext.define('Prod.view.defect_mgt.DefectMgt', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.defect_mgt.DefectMgtSearch',
		'Prod.view.defect_mgt.DefectMgtList'
	],
	
	xtype : 'prod_defect_mgt',
	
	title : T('title.defect_mgt'),
	
	searchView : 'prod_defect_mgt_search',
	
	gridView : 'prod_defect_mgt_list'

});