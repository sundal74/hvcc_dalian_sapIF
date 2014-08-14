Ext.define('Prod.view.inventory.InventoryForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_inventory_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ fieldLabel : T('label.operation'), name : 'store', xtype : 'entityfield', storeClass : 'Prod.store.Store', readOnly : true },
		{ fieldLabel : T('label.product'), name : 'product', xtype : 'entityfield', storeClass : 'Prod.store.Product', readOnly : true },
		{ name : 'qty', fieldLabel : T('label.qty'), xtype : 'numberfield' },
		{ name : 'add_qty', fieldLabel : T('button.add') + ' ' + T('label.qty'), xtype : 'numberfield', value : 0, maxValue : 10000, minValue : -10000 },
		{ name : 'reason', fieldLabel : T('label.reason'), xtype : 'textarea' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});