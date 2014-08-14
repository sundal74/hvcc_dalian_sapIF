Ext.define('Comp.view.pms_master_model.PmsMasterModel', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Comp.view.pms_master_model.PmsMasterModelSearch',
		'Comp.view.pms_master_model.PmsMasterModelList'
	],
	
	xtype : 'comp_pms_master_model',
	
	title : T('menu.PmsMasterModel'),
	
	searchView : 'comp_pms_master_model_search',
	
	gridView : 'comp_pms_master_model_list'
	
});