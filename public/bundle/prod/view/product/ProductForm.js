Ext.define('Prod.view.product.ProductForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_product_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items: [
	   		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
			{ name : 'domain_id', value : login.current_domain_id, hidden : true },
			{ name : 'name', fieldLabel : T('label.code'), allowBlank : false, maxLength : 64 },
			{ name : 'description', fieldLabel : T('label.description'), maxLength : 255 },
			{ fieldLabel : T('label.prod_type'), name : 'prod_type', xtype : 'codecombo', commonCode : 'PROD_TYPE', displayField : 'description', allowBlank : false },
			{ name : 'unit', fieldLabel : T('label.unit'), xtype : 'codecombo', commonCode : 'UNIT_TYPE' },
			{ name : 'default_qty', fieldLabel : T('label.lot_qty'), xtype : 'numberfield', minValue : 1, allowBlank : false },
			// { name : 'pack_type', fieldLabel : T('label.pack_type') },
			{ name : 'short_name', fieldLabel : T('label.short_name'), maxLength : 20 },
			{ name : 'model_no', fieldLabel : T('label.model_no'), maxLength : 10 },
			{ name : 'cust_code', fieldLabel : T('title.customer'), maxLength : 20 },
			{ name : 'cust_part_no', fieldLabel : T('label.cust_part_no'), maxLength : 20 },
			{ name : 'cust_part_name', fieldLabel : T('label.cust_part_name'), maxLength : 40 },
			{ xtype : 'datefield', name : 'created_at', disabled : true, fieldLabel : T('label.created_at'), format : T('format.datetime') },
			{ xtype : 'datefield', name : 'updated_at', disabled : true, fieldLabel : T('label.updated_at'), format : T('format.datetime') }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});