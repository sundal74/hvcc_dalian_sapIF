Ext.define('Prod.view.label_model.LabelModel', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.label_model.LabelModelSearch',
		'Prod.view.label_model.LabelModelList'
	],
	
	xtype : 'prod_label_model',
	
	title : T('menu.LabelModel'),
	
	searchView : 'prod_label_model_search',
	
	gridView : 'prod_label_model_list'
	
});