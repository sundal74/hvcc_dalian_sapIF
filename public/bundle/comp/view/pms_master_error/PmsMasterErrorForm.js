Ext.define('Comp.view.pms_master_error.PmsMasterErrorForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'comp_pms_master_error_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ 
			name : 'routing', 
			fieldLabel : T('label.operation'),
			xtype : 'entitynamecombo',
			storeClass : 'Prod.store.Operation',
			valueField : 'name'
		},
		{ 
			name : 'st_no', 
			fieldLabel : T('label.st_no'),
			xtype : 'entitynamecombo',
			customSelectionUrl : '/domains/' + login.current_domain_id + '/diy_selections/SelectStation/query.json',
			valueField : 'name'
		},
		{ name : 'err_code', fieldLabel : T('label.err_code') },
		{ name : 'err_name', fieldLabel : T('label.err_name') },
		//{ name : 'err_type', fieldLabel : T('label.err_type') }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save', 'close']
	} ]
});