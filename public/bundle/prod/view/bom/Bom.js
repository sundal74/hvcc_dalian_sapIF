Ext.define('Prod.view.bom.Bom', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.bom.BomSearch',
		'Prod.view.bom.BomList'
	],
	
	xtype : 'prod_bom',
	
	title : T('title.bom'),
	
	searchView : 'prod_bom_search',
	
	gridView : 'prod_bom_list',
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'import']
	} ]
	
});