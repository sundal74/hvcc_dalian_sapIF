Ext.define('Prod.view.defect_code.DefectCodeSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_defect_code_search',
		
	items : [
		{ fieldLabel : T('label.code'), name : 'name-like' },
		{ fieldLabel : T('label.description'), name : 'description-like' }
	]
	
});