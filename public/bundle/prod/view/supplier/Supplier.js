Ext.define('Prod.view.supplier.Supplier', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.supplier.SupplierSearch',
		'Prod.view.supplier.SupplierList'
	],
	
	xtype : 'prod_supplier',
	
	title : T('title.supplier'),
	
	searchView : 'prod_supplier_search',
	
	gridView : 'prod_supplier_list'
	
});