Ext.define('Prod.view.customer.CustomerSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_customer_search',
		
	items : [
		{ fieldLabel : T('label.code'), name : 'name-like' }
	]
	
});