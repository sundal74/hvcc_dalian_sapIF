Ext.define('Comp.view.tsfr_status.TsfrStatus', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Comp.view.tsfr_status.TsfrStatusSearch',
		'Comp.view.tsfr_status.TsfrStatusList'
	],
	
	xtype : 'comp_tsfr_status',
	
	title : T('menu.TsfrStatus'),
	
	searchView : 'comp_tsfr_status_search',
	
	gridView : 'comp_tsfr_status_list'

});