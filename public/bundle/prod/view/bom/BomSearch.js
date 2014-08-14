Ext.define('Prod.view.bom.BomSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_bom_search',
		
	items : [
		{ fieldLabel : T('label.product'), name : 'name-like' }
	]
	
});