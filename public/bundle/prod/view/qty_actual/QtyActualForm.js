Ext.define('Prod.view.qty_actual.QtyActualForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_qty_actual_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items: [
   		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ xtype : 'datefield', name : 'work_date', fieldLabel : T('label.work_date'), format : T('format.date'), submitFormat : T('format.submitDate') },
		{ name : 'shift', fieldLabel : T('label.shift'), xtype : 'codecombo', commonCode : 'SHIFT', displayField : 'description' },
		{ fieldLabel : T('label.operation'), name : 'operation', xtype : 'entityfield', storeClass : 'Prod.store.Operation' },
		{ fieldLabel : T('label.machine'), name : 'machine', xtype : 'entityfield', storeClass : 'Prod.store.Machine' },
		{ fieldLabel : T('label.product'), name : 'product', xtype : 'entityfield', storeClass : 'Prod.store.Product' },
		{ name : 'actual_qty', fieldLabel : T('label.actual_qty'), xtype : 'numberfield' },
		//{ name : 'defect_qty', fieldLabel : T('label.defect_qty'), xtype : 'numberfield' },
		//{ name : 'rework_qty', fieldLabel : T('label.rework_qty'), xtype : 'numberfield' },
		{ name : 'description', fieldLabel : T('label.description') },
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
					{ xtype : 'datetimefield', name : 'created_at', readOnly : true, fieldLabel : T('label.created_at'), format : T('format.date'), submitFormat : T('format.submitDatetime') }
				]
			}, {
				xtype: 'container',
				flex : 1,
				layout : 'anchor',
				defaults: {
					anchor : '90%'
				},
				items: [
					{ xtype : 'datetimefield', name : 'updated_at', readOnly : true, fieldLabel : T('label.updated_at'), format : T('format.date'), submitFormat : T('format.submitDatetime') }
				]
			} ]
		}
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});