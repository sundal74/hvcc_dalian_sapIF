Ext.define('Prod.view.inventory_hist.InventoryHistForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_inventory_hist_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ fieldLabel : T('title.store'), name : 'store', xtype : 'entityfield', storeClass : 'Prod.store.Store' },
		{ fieldLabel : T('label.product'), name : 'product', xtype : 'entityfield', storeClass : 'Prod.store.Product' },
		{ name : 'qty', fieldLabel : T('label.qty'), xtype : 'numberfield' },
		{ fieldLabel : T('label.action_code'), name : 'action_code', xtype : 'codefield', commonCode : 'INV_ACTION' },
		{ fieldLabel : T('title.lot'), name : 'lot_id', xtype : 'entityfield', storeClass : 'Prod.store.Lot' },
		{ name : 'description', fieldLabel : T('label.description'), width : 200 },
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'delete', 'close']
	} ]
});