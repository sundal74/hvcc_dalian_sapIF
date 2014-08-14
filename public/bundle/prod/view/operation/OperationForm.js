Ext.define('Prod.view.operation.OperationForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_operation_form',
		
	autoScroll : true,
		
	// items : [ {
	// 	xtype: 'fieldset',
	// 	title: T('label.operation'),
	// 	collapsible: false,
		defaults: {
			anchor: '100%'
		},
		
		items: [
	   		{ name : 'id', fieldLabel : T('label.id'), xtype : 'textfield', hidden : true },
	   		{ name : 'domain_id', value : login.current_domain_id, xtype : 'textfield', hidden : true },
			{ xtype : 'textfield', name : 'name', fieldLabel : T('label.code'), allowBlank : false, maxLength : 64 },
			{ xtype : 'textfield', name : 'description', fieldLabel : T('label.description'), maxLength : 255 },
			{ fieldLabel : T('label.dept_type'), name : 'dept_type', xtype : 'codecombo', commonCode : 'DEPT_TYPE', displayField : 'description' },
			{ fieldLabel : T('label.wc'), name : 'workcenter', xtype : 'entityfield', storeClass : 'Prod.store.Workcenter', allowBlank : false },
			{ fieldLabel : T('label.op_type'), name : 'op_type', xtype : 'codecombo', commonCode : 'OP_TYPE', displayField : 'description' },
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
						{ name : 'main_op_flag', fieldLabel : T('label.main_op_flag'), xtype : 'checkboxfield', inputValue : true },
						{ name : 'track_rm_store', fieldLabel : T('label.track_rm_store'), xtype : 'entityfield', storeClass : 'Prod.store.Store' }
					]
				}, {
					xtype: 'container',
					flex : 1,
					layout : 'anchor',
					defaults: {
						anchor : '90%'
					},
					items: [
						{ name : 'inv_flag', fieldLabel : T('label.inv_flag'), xtype : 'checkboxfield', inputValue : true },
						{ name : 'op_seq', fieldLabel : T('label.op_seq'), xtype : 'numberfield', minValue : 0, allowBlank : false }
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