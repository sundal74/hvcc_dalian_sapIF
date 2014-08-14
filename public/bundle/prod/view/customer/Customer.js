Ext.define('Prod.view.customer.Customer', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.customer.CustomerSearch',
		'Prod.view.customer.CustomerList'
	],
	
	xtype : 'prod_customer',
	
	title : T('title.customer'),
	
	searchView : 'prod_customer_search',
	
	gridView : 'prod_customer_list'
	
});