Ext.define('Comp.view.pms_master_model.PmsMasterModelForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'comp_pms_master_model_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ name : 'routing', fieldLabel : T('label.operation') },
		{ name : 'p_code', fieldLabel : T('label.p_code') },
		{ 
			name : 'model_no', 
			fieldLabel : T('label.product'),
			xtype : 'entitynamecombo',
			storeClass : 'Prod.store.Product',
			valueField : 'name'
		},
		{ name : 'model_name', fieldLabel : T('label.product_desc') }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save', 'close']
	} ]
});