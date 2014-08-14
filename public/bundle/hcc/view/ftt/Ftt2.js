Ext.define('Hcc.view.ftt.Ftt2', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.ftt.Ftt2Search',
		'Hcc.view.ftt.Ftt2List'
	],
	
	xtype : 'hcc_ftt2',
	
	title : T('title.ftt2'),
	
	searchView : 'hcc_ftt2_search',
	
	gridView : 'hcc_ftt2_list'

});