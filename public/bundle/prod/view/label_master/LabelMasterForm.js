Ext.define('Prod.view.label_master.LabelMasterForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_label_master_form',
	
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items: [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ fieldLabel : T('label.product'), name : 'product', xtype : 'entityfield', storeClass : 'Prod.store.Product', allowBlank : false },
		{ fieldLabel : T('label.operation'), name : 'operation', xtype : 'entityfield', storeClass : 'Prod.store.Operation', allowBlank : false },
		{ fieldLabel : T('menu.LabelModel'), name : 'label_model', xtype : 'entityfield', storeClass : 'Prod.store.LabelModel', allowBlank : false },
		{ fieldLabel : T('label.option'), name : 'customer', xtype : 'entityfield', storeClass : 'Prod.store.Customer' },
		{ name : 'part_name', fieldLabel : T('label.part_name'), xtype : 'textfield', allowBlank : false },
		{ name : 'part_no', fieldLabel : T('label.part_no'), xtype : 'textfield' },
		{ name : 'car_type', fieldLabel : T('label.car_type'), xtype : 'textfield' },
		{ name : 'car_name', fieldLabel : T('label.car_name'), xtype : 'textfield' },
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
					
					{ name : 'ship_loc', fieldLabel : T('label.ship_loc'), xtype : 'textfield' },
					{ name : 'box_no', fieldLabel : T('label.box_no'), xtype : 'textfield' }
				]
			}, {
				xtype: 'container',
				flex : 1,
				layout : 'anchor',
				defaults: {
					anchor : '100%'
				},
				items: [
					{ name : 'pallet_qty', fieldLabel : T('label.pallet_qty'), xtype : 'numberfield', allowBlank : false },
					{ name : 'area', fieldLabel : T('label.area'), xtype : 'textfield' }
				]
			} ]
		},
		{ xtype : 'datefield', name : 'created_at', disabled : true, fieldLabel : T('label.created_at'), format : T('format.datetime') },
		{ xtype : 'datefield', name : 'updated_at', disabled : true, fieldLabel : T('label.updated_at'), format : T('format.datetime') }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});