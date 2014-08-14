Ext.define('Prod.view.inventory_hist.InventoryHistSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_inventory_hist_search',
		
	items : [ { 
			name : 'created_at-gte', 
			fieldLabel : T('label.date'), 
			xtype : 'datefield', 
			format : T('format.date'), 
			submitFormat : T('format.submitDate') 
		}, { 
			fieldLabel : T('label.operation'), 
			name : 'store.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Operation'
		}, { 
			fieldLabel : T('label.product'), 
			name : 'product.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Product'
		}
	]
	
});