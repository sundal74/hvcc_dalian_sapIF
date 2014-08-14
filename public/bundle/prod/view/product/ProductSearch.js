Ext.define('Prod.view.product.ProductSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_product_search',
		
	items : [
		{ fieldLabel : T('label.code'), name : 'name-like' },
		{ fieldLabel : T('label.description'), name : 'description-like' },
		{ fieldLabel : T('label.prod_type'), name : 'prod_type-eq', xtype : 'codecombo', displayField : 'description', commonCode : 'PROD_TYPE' }
	]
	
});