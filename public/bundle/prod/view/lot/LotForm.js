Ext.define('Prod.view.lot.LotForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_lot_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items: [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ name : 'name', fieldLabel : T('label.name'), allowBlank : false, maxLength : 128 },
		// { name : 'status', fieldLabel : T('label.status') },
		{ 
			xtype: 'container',
			layout: 'hbox',
			items : [ {
				xtype: 'container',
				flex : 1,
				layout : 'anchor',
				defaults: {
					anchor : '90%'
				},
			    items: [
					// { fieldLabel : T('title.prod_order'), name : 'prod_order_id' },
					{ fieldLabel : T('label.product'), name : 'product', xtype : 'entityfield', storeClass : 'Prod.store.Product' },
					{ fieldLabel : T('label.machine'), name : 'machine', xtype : 'entityfield', storeClass : 'Prod.store.Machine' },
					{ name : 'lot_no', fieldLabel : T('label.lot_no'), allowBlank : false, maxLength : 128 },
					{ xtype : 'datefield', name : 'created_at', disabled : true, fieldLabel : T('label.created_at'), format : T('format.datetime') }
				]
			}, {
				xtype: 'container',
				flex : 1,
				layout : 'anchor',
				defaults: {
					anchor : '90%'
				},
				items: [
					{ fieldLabel : T('label.shift'), name : 'shift', xtype : 'codecombo', commonCode : 'SHIFT', displayField : 'description' },
					{ fieldLabel : T('label.operation'), name : 'operation', xtype : 'entityfield', storeClass : 'Prod.store.Operation' },
					{ name : 'serial_no', fieldLabel : T('label.serial_no'), allowBlank : false, maxLength : 20 },
					{ name : 'actual_qty', fieldLabel : T('label.actual_qty'), xtype : 'numberfield' },
					{ xtype : 'datetimefield', name : 'tran_time', readOnly : true, fieldLabel : T('label.scan_time'), format : T('format.date'), submitFormat : T('format.submitDatetime') },
					{ xtype : 'datefield', name : 'updated_at', disabled : true, fieldLabel : T('label.updated_at'), format : T('format.datetime') }
				]
			} ]
		}
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});