Ext.define('Prod.view.prod_order.ProdOrderForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_prod_order_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items: [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
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
					{ xtype : 'datefield', name : 'order_date', fieldLabel : T('label.order_date'), format : T('format.date'), submitFormat : T('format.submitDate'), allowBlank : false },
					{ fieldLabel : T('label.operation'), name : 'operation', xtype : 'entityfield', storeClass : 'Prod.store.Operation', allowBlank : false },
					{ fieldLabel : T('label.product'), name : 'product', xtype : 'entityfield', storeClass : 'Prod.store.Product', allowBlank : false },
					{ name : 'status', fieldLabel : T('label.status'), xtype : 'textfield' },
					{ name : 'pallet_qty', fieldLabel : T('label.pallet_qty'), xtype : 'numberfield' },
					{ name : 'order_qty', fieldLabel : T('label.plan_qty'), xtype : 'numberfield' },
					{ name : 'actual_qty', fieldLabel : T('label.actual_qty'), xtype : 'numberfield' },
					{ xtype : 'datetimefield', name : 'actual_start_time', readOnly : true, fieldLabel : T('label.actual_start_time'), format : T('format.date'), submitFormat : T('format.submitDatetime') }
					/*{ name : 'worker_count', fieldLabel : T('label.worker_count'), xtype : 'numberfield' },
					{ xtype : 'datefield', name : 'created_at', disabled : true, fieldLabel : T('label.created_at'), format : T('format.datetime') }*/
				]
			}, {
				xtype: 'container',
				flex : 1,
				layout : 'anchor',
				defaults: {
					anchor : '90%'
				},
				items: [
					{ name : 'shift', fieldLabel : T('label.shift'), xtype : 'codecombo', commonCode : 'SHIFT', displayField : 'description', allowBlank : false },
					{  
						fieldLabel : T('label.machine'), 
						name : 'machine', 
						xtype : 'entityfield', 
						storeClass : 'Prod.store.Machine',
						allowBlank : false,
						associationField : [ {
							name : 'operation.name-eq',
							value : function(host) {
								var form = host.up('form');
								var opfield = form.down('entityfield[name=operation]');
								return opfield.getValue();
							}
						} ]
					},
					{ name : 'cycletime', fieldLabel : T('label.cycletime'), xtype : 'numberfield' },
					{ name : 'uph', fieldLabel : T('label.uph'), xtype : 'numberfield' },
					{ name : 'order_seq', fieldLabel : T('label.order_seq'), xtype : 'numberfield' },
					{ name : 'defect_qty', fieldLabel : T('label.defect_qty'), xtype : 'numberfield' },
					{ name : 'rework_qty', fieldLabel : T('label.rework_qty'), xtype : 'numberfield' },
					{ xtype : 'datetimefield', name : 'actual_end_time', readOnly : true, fieldLabel : T('label.actual_end_time'), format : T('format.date'), submitFormat : T('format.submitDatetime') },
					/*{ 
						name : 'customer', 
						fieldLabel : T('label.option'), 
						xtype : 'entityfield', 
						storeClass : 'Prod.store.Customer'
					},
					{ xtype : 'datefield', name : 'updated_at', disabled : true, fieldLabel : T('label.updated_at'), format : T('format.datetime') }*/
				]
			} ]
		}
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save', 'close']
	} ]
});