Ext.define('Prod.view.inventory.Inventory', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.inventory.InventorySearch',
		'Prod.view.inventory.InventoryList'
	],
	
	xtype : 'prod_inventory',
	
	title : T('title.inventory'),
	
	searchView : 'prod_inventory_search',
	
	gridView : 'prod_inventory_list'
	
});