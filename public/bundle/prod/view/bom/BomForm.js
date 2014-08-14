Ext.define('Prod.view.bom.BomForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_bom_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ name : 'name', fieldLabel : T('label.name'), allowBlank : false, maxLength : 64 },
		{ name : 'unit', fieldLabel : T('label.unit') },
		{ name : 'qty', fieldLabel : T('label.lot_qty'), xtype : 'numberfield', minValue : 0 },
		{ fieldLabel : T('label.bom_type'), name : 'bom_type', xtype : 'codefield', commonCode : 'BOM_TYPE' }
	]
});