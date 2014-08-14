Ext.define('Prod.view.loss_code.LossCodeSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_loss_code_search',
		
	items : [
		{ fieldLabel : T('label.code'), name : 'name-like' },
		{ fieldLabel : T('label.description'), name : 'description-like' }
	]
	
});