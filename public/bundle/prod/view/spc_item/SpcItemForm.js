Ext.define('Prod.view.spc_item.SpcItemForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_spc_item_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		// { name : 'code', fieldLabel : T('label.code'), hidden : true },
		{ name : 'name', fieldLabel : T('label.code'), allowBlank : false, maxLength : 21 },
		{ name : 'description', fieldLabel : T('label.description'), maxLength : 1300 },
		{ fieldLabel : T('label.operation'), name : 'operation', xtype : 'entityfield', storeClass : 'Prod.store.Operation', allowBlank : false },
		{ name : 'x_usl', fieldLabel : T('label.x_usl'), allowBlank : false },
		{ name : 'x_lsl', fieldLabel : T('label.x_lsl'), allowBlank : false },
		{ name : 'r_usl', fieldLabel : T('label.r_usl'), allowBlank : false },
		{ name : 'r_lsl', fieldLabel : T('label.r_lsl'), allowBlank : false },
		{ xtype : 'datefield', name : 'created_at', disabled : true, fieldLabel : T('label.created_at'), format : T('format.datetime') },
		{ xtype : 'datefield', name : 'updated_at', disabled : true, fieldLabel : T('label.updated_at'), format : T('format.datetime') },
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});