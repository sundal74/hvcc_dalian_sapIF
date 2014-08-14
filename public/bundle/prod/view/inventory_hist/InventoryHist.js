Ext.define('Prod.view.inventory_hist.InventoryHist', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.inventory_hist.InventoryHistSearch',
		'Prod.view.inventory_hist.InventoryHistList'
	],
	
	xtype : 'prod_inventory_hist',
	
	title : T('title.inventory_hist'),
	
	searchView : 'prod_inventory_hist_search',
	
	gridView : 'prod_inventory_hist_list'
	
});