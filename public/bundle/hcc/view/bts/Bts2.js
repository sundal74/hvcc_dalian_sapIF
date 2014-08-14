Ext.define('Hcc.view.bts.Bts2', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.bts.Bts2Search',
		'Hcc.view.bts.Bts2List'
	],
	
	xtype : 'hcc_bts2',
	
	title : T('title.bts2'),
	
	searchView : 'hcc_bts2_search',
	
	gridView : 'hcc_bts2_list'

});