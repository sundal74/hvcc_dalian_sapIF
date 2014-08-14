Ext.define('Comp.view.pms_master_error.PmsMasterError', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Comp.view.pms_master_error.PmsMasterErrorSearch',
		'Comp.view.pms_master_error.PmsMasterErrorList'
	],
	
	xtype : 'comp_pms_master_error',
	
	title : T('menu.PmsMasterError'),
	
	searchView : 'comp_pms_master_error_search',
	
	gridView : 'comp_pms_master_error_list'
	
});