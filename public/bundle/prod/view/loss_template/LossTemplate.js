Ext.define('Prod.view.loss_template.LossTemplate', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.loss_template.LossTemplateSearch',
		'Prod.view.loss_template.LossTemplateList'
	],
	
	xtype : 'prod_loss_template',
	
	title : T('title.loss_template'),
	
	searchView : 'prod_loss_template_search',
	
	gridView : 'prod_loss_template_list'
	
});