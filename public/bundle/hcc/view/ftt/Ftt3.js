Ext.define('Hcc.view.ftt.Ftt3', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.ftt.Ftt3Search',
		'Hcc.view.ftt.Ftt3List'
	],
	
	xtype : 'hcc_ftt3',
	
	title : T('menu.Ftt3'),
	
	searchView : 'hcc_ftt3_search',
	
	gridView : 'hcc_ftt3_list'

});