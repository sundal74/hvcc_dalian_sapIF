Ext.define('Prod.view.loss_code.LossCode', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.loss_code.LossCodeSearch',
		'Prod.view.loss_code.LossCodeList'
	],
	
	xtype : 'prod_loss_code',
	
	title : T('title.loss_code'),
	
	searchView : 'prod_loss_code_search',
	
	gridView : 'prod_loss_code_list'
	
});