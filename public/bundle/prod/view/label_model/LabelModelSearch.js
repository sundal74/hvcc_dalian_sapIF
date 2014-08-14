Ext.define('Prod.view.label_model.LabelModelSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_label_model_search',
		
	items : [
		{ fieldLabel : T('label.name'), name : 'name-like' },
		{ fieldLabel : T('label.description'), name : 'description-like' },
	]
	
});