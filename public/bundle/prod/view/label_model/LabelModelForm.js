Ext.define('Prod.view.label_model.LabelModelForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_label_model_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ name : 'name', fieldLabel : T('label.name'), allowBlank : false, maxLength : 64 },
		{ name : 'description', fieldLabel : T('label.description'), maxLength : 255 },
		{ name : 'dept_type', fieldLabel : T('label.dept_type'), xtype : 'codecombo', commonCode : 'DEPT_TYPE', displayField : 'description' },
		{ name : 'printer_type', fieldLabel : T('label.printer_type') },
		{ name : 'active_flag', fieldLabel : T('label.active_flag'), xtype : 'checkboxfield', inputValue : true },
		{ xtype : 'textareafield', name : 'command', fieldLabel : T('label.print_command'), rows : 12 }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});