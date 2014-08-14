Ext.define('Hcc.view.oee.Oee2', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.oee.Oee2Search',
		'Hcc.view.oee.Oee2List'
	],
	
	xtype : 'hcc_oee2',
	
	title : T('title.oee2'),
	
	searchView : 'hcc_oee2_search',
	
	gridView : 'hcc_oee2_list'

});