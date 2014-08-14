Ext.define('Prod.view.defect.DefectForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_defect_form',
	
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
					{ xtype : 'datefield', name : 'work_date', fieldLabel : T('label.work_date'), format : T('format.date'), submitFormat : T('format.submitDate') },
					{ fieldLabel : T('label.machine'), name : 'machine', xtype : 'entityfield', storeClass : 'Prod.store.Machine' },
					{ fieldLabel : T('label.child_product'), name : 'child_product', xtype : 'entityfield', storeClass : 'Prod.store.Product' },
					{ name : 'defect_qty', fieldLabel : T('label.scrap_qty'), xtype : 'numberfield' },
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
					{ fieldLabel : T('label.shift'), name : 'shift', xtype : 'codecombo', commonCode : 'SHIFT', displayField : 'description' },
					{ fieldLabel : T('label.operation'), name : 'operation', xtype : 'entityfield', storeClass : 'Prod.store.Operation' },
					{ fieldLabel : T('label.product'), name : 'product', xtype : 'entityfield', storeClass : 'Prod.store.Product' },
					{ fieldLabel : T('label.defect_code'), name : 'defect_code', xtype : 'entityfield', valueField : 'name', storeClass : 'Prod.store.DefectCode' },
					{ xtype : 'datetimefield', name : 'updated_at', readOnly : true, fieldLabel : T('label.updated_at'), format : T('format.date'), submitFormat : T('format.submitDatetime') }
				]
			} ]
		},
		{ name : 'description', fieldLabel : T('label.description'), maxLength : 255, xtype : 'textarea' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});