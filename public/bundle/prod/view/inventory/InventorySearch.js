Ext.define('Prod.view.inventory.InventorySearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_inventory_search',
		
	items : [
		{ 
			fieldLabel : T('label.operation'), 
			name : 'store.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Store'
		},
		{ 
			fieldLabel : T('label.product'), 
			name : 'product.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Product'
		}
	]
	
});