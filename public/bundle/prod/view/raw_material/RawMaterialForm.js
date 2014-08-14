Ext.define('Prod.view.raw_material.RawMaterialForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_raw_material_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items: [
	   		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
			{ name : 'domain_id', value : login.current_domain_id, hidden : true },
			{ name : 'prod_type', value : 'RM', hidden : true },
			{ name : 'name', fieldLabel : T('label.code'), allowBlank : false, maxLength : 64 },
			{ name : 'description', fieldLabel : T('label.description'), maxLength : 255 },
			{ name : 'unit', fieldLabel : T('label.unit'), xtype : 'codecombo', commonCode : 'UNIT_TYPE' },
			{ name : 'default_qty', fieldLabel : T('label.lot_qty'), xtype : 'numberfield', minValue : 1, allowBlank : false },
			{ name : 'loc_cd', fieldLabel : T('label.location') },
			{ name : 'routing', fieldLabel : T('label.operation') },
			{ name : 'baseloc_cd', fieldLabel : 'Base Location' },
			{ name : 'qc_fg', fieldLabel : 'Inspection?' },
			{ name : 'use_yn', fieldLabel : 'Use?' },
			{ name : 'label_print_fg', fieldLabel : 'Label Print?' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});