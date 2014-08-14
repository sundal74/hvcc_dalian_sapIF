Ext.define('Prod.view.prod_closing.ProdClosingForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_prod_closing_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ xtype : 'datefield', name : 'work_date', readOnly : true, fieldLabel : T('label.work_date'), format : T('format.date') },
		{ fieldLabel : T('title.operation'), name : 'operation', xtype : 'entityfield', storeClass : 'Prod.store.Operation' },
		{ fieldLabel : T('title.closer'), name : 'closer', xtype : 'entityfield', storeClass : 'Base.store.User' },
		{ name : 'closed_flag', fieldLabel : T('label.closed_flag'), xtype : 'checkboxfield', inputValue : true },
		{ xtype : 'datefield', name : 'closed_at', readOnly : true, fieldLabel : T('label.closed_at'), format : T('format.datetime') },
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'delete', 'close']
	} ]
});