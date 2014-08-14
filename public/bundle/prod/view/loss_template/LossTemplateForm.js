Ext.define('Prod.view.loss_template.LossTemplateForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_loss_template_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ name : 'week_day', fieldLabel : T('label.week_day'), xtype : 'codecombo', commonCode : 'DAY_OF_WEEK', allowBlank : false },
		{ name : 'start_time', fieldLabel : T('label.start_time'), allowBlank : false },
		{ name : 'end_time', fieldLabel : T('label.end_time'), allowBlank : false },
		// TODO disable 처리 자동 계산 
		{ name : 'loss_term', fieldLabel : T('label.loss_term'), xtype : 'numberfield', minValue : 0 },
		{ fieldLabel : T('title.loss_code'), name : 'loss_code', xtype : 'entityfield', storeClass : 'Prod.store.LossCode' },
		{ xtype : 'datefield', name : 'created_at', disabled : true, fieldLabel : T('label.created_at'), format : T('format.datetime') },
		{ xtype : 'datefield', name : 'updated_at', disabled : true, fieldLabel : T('label.updated_at'), format : T('format.datetime') }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});