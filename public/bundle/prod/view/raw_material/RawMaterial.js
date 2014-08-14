Ext.define('Prod.view.raw_material.RawMaterial', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.raw_material.RawMaterialSearch',
		'Prod.view.raw_material.RawMaterialList'
	],
	
	xtype : 'prod_raw_material',
	
	title : T('menu.RawMaterial'),
	
	searchView : 'prod_raw_material_search',
	
	gridView : 'prod_raw_material_list'
	
});