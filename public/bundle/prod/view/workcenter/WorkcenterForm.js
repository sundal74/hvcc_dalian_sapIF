Ext.define('Prod.view.workcenter.WorkcenterForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_workcenter_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ name : 'name', fieldLabel : T('label.code'), allowBlank : false, maxLength : 21 },
		{ name : 'description', fieldLabel : T('label.description'), maxLength : 85 },
		//{ name : 'dept_type', fieldLabel : T('label.dept_type'), xtype : 'codecombo', commonCode : 'DEPT_TYPE', displayField : 'description' },
		{ name : 'prod_dept', fieldLabel : T('label.prod_dept'), xtype : 'codecombo', commonCode : 'PROD_DEPT', displayField : 'description' },
		{ xtype : 'datefield', name : 'created_at', disabled : true, fieldLabel : T('label.created_at'), format : T('format.datetime') },
		{ xtype : 'datefield', name : 'updated_at', disabled : true, fieldLabel : T('label.updated_at'), format : T('format.datetime') }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});