Ext.define('Prod.view.machine.MachineForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_machine_form',
		
	autoScroll : true,
	
	defaults : { anchor : '100%' },
	
	items: [
		{ name : 'id', fieldLabel : T('label.id'), xtype : 'textfield', hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, xtype : 'textfield', hidden : true },
		{ xtype : 'textfield', name : 'name', fieldLabel : T('label.code'), allowBlank : false, maxLength : 64 },
		{ xtype : 'textfield', name : 'description', fieldLabel : T('label.description'), maxLength : 255 },
		{ fieldLabel : T('label.operation'), name : 'operation', xtype : 'entityfield', storeClass : 'Prod.store.Operation', allowBlank : false },
		{ name : 'uph', fieldLabel : T('label.uph'), xtype : 'numberfield', minValue : 0 },
		{ name : 'cycletime', fieldLabel : T('label.cycletime'), xtype : 'numberfield', minValue : 0 },
		{ name : 'main_op_flag', fieldLabel : T('label.main_op_flag'), xtype : 'checkboxfield', inputValue : true },
		{ name : 'main_mc_flag', fieldLabel : T('label.main_mc_flag'), xtype : 'checkboxfield', inputValue : true },
		//{ name : 'plan_dist_rate', fieldLabel : T('label.plan_dist_rate'), xtype : 'numberfield', minValue : 0 },
		{ xtype : 'datefield', name : 'created_at', disabled : true, fieldLabel : T('label.created_at'), format : T('format.datetime') },
		{ xtype : 'datefield', name : 'updated_at', disabled : true, fieldLabel : T('label.updated_at'), format : T('format.datetime') }	   		
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});