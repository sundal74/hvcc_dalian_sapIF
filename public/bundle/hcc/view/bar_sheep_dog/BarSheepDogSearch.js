Ext.define('Hcc.view.bar_sheep_dog.BarSheepDogSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'hcc_bar_sheep_dog_search',
	
	items : [
		{ 
			fieldLabel : T('label.product'), 
			name : 'product.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Product'
		}
	]
	
});