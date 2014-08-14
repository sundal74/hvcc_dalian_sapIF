Ext.define('Prod.view.notice.NoticeForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_notice_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ xtype : 'datefield', name : 'work_date', fieldLabel : T('label.work_date'), format : T('format.date'), submitFormat : T('format.submitDate'), allowBlank : false },
		{ fieldLabel : T('label.operation'), name : 'operation', xtype : 'entityfield', storeClass : 'Prod.store.Operation' },
		{ name : 'msg', fieldLabel : T('label.message'), xtype : 'textareafield', allowBlank : false, rows : 12, maxLength : 1300 },
		{ xtype : 'datefield', name : 'created_at', disabled : true, fieldLabel : T('label.created_at'), format : T('format.datetime') },
		{ xtype : 'datefield', name : 'updated_at', disabled : true, fieldLabel : T('label.updated_at'), format : T('format.datetime') }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});