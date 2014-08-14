Ext.define('Prod.view.supplier.SupplierSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_supplier_search',
		
	items : [
		{ fieldLabel : T('label.code'), name : 'name-like' }
	]
	
});