Ext.define('Base.view.diy_selection.ServiceLogicForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'base_service_logic_form',
	
	title : T('title.service_logic'),
	
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ name : 'name', fieldLabel : T('label.name'), readOnly : true },
		//{ name : 'description', fieldLabel : T('label.description') },
		{ name : 'script_type', hidden : true },
		{ name : 'view_type', hidden : true },
		{ name : 'pagination_flag', hidden : true },
		{ name : 'count_logic', fieldLabel : T('label.count_logic'), xtype : 'textareafield', rows : 10 },
		{ name : 'service_logic', fieldLabel : T('label.service_logic'), xtype : 'textareafield', rows : 26 }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save']
	} ]
});