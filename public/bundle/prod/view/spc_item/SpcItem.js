Ext.define('Prod.view.spc_item.SpcItem', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.spc_item.SpcItemSearch',
		'Prod.view.spc_item.SpcItemList'
	],
	
	xtype : 'prod_spc_item',
	
	title : T('title.spc_item'),
	
	searchView : 'prod_spc_item_search',
	
	gridView : 'prod_spc_item_list'
	
});