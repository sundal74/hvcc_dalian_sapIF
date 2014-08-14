Ext.define('Prod.view.raw_material.RawMaterialSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_raw_material_search',
		
	items : [
		{ fieldLabel : T('label.code'), name : 'name-like' },
		{ fieldLabel : T('label.description'), name : 'description-like' }
	]
	
});