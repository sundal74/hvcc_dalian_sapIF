Ext.define('Hcc.view.sheep_dog.SheepDogSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'hcc_sheep_dog_search',
	
	items : [
		{ fieldLabel : T('label.product'), name : 'product.name-eq', xtype : 'entitysearchcombo', storeClass : 'Prod.store.Product'}
	]
	
});