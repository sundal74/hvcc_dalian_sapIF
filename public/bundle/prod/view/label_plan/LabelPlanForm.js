Ext.define('Prod.view.label_plan.LabelPlanForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_label_plan_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ xtype : 'datefield', name : 'order_date', fieldLabel : T('label.order_date'), format : T('format.date'), submitFormat : T('format.submitDate'), allowBlank : false },
		{ name : 'shift', fieldLabel : T('label.shift'), xtype : 'codecombo', commonCode : 'SHIFT', displayField : 'description', allowBlank : false },
		{ fieldLabel : T('label.operation'), name : 'operation', xtype : 'entityfield', storeClass : 'Prod.store.Operation', allowBlank : false },
		{ fieldLabel : T('label.product'), name : 'product', xtype : 'entityfield', storeClass : 'Prod.store.Product', allowBlank : false },
		{ name : 'order_qty', fieldLabel : T('label.plan_qty'), xtype : 'numberfield', allowBlank : false },
		{ name : 'lot_qty', fieldLabel : T('label.lot_qty'), xtype : 'numberfield' },
		{ name : 'print_qty', fieldLabel : T('label.print_qty'), xtype : 'numberfield' },
		/*{ fieldLabel : T('label.option'), name : 'customer', xtype : 'entityfield', storeClass : 'Prod.store.Customer' },
		{ name : 'printed_qty', fieldLabel : T('label.printed_qty'), xtype : 'numberfield' },
		{ name : 'completed_flag', fieldLabel : T('label.completed_flag'), xtype : 'checkboxfield', inputValue : true },
		{ name : 'reprinted_flag', fieldLabel : T('label.reprinted_flag'), xtype : 'checkboxfield', inputValue : true }*/
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});