Ext.define('Base.view.terminology.TerminologyForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'base_terminology_form',
		
	autoScroll : true,
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	items: [
		{ name : 'id', fieldLabel : T('label.id'), xtype : 'textfield', hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, xtype : 'textfield', hidden : true },
		{ xtype : 'textfield', name : 'name', fieldLabel : T('label.code'), allowBlank : false, maxLength : 64 },
		{ xtype : 'textfield', name : 'description', fieldLabel : T('label.description'), maxLength : 85 },
		{ 
			xtype: 'container',
			layout: {
				type: 'hbox',
				align : 'stretch'
			},
			items : [ { 
				fieldLabel : T('label.locale'), 
				name : 'locale', 
				flex : 1,
				xtype : 'codecombo', 
				commonCode : 'LANGUAGE',
				allowBlank : false
			}, { 
				name : 'category', 
				fieldLabel : T('label.category'), 
				flex : 1,
				xtype : 'codecombo',
				commonCode : 'TERMS_CATEGORY',
				allowBlank : false
			} ]
		},
		{ xtype : 'textarea', name : 'display', fieldLabel : T('label.display'), flex : 1 },
		{ xtype : 'textarea', name : 'display_short', fieldLabel : T('label.display_short'), flex: 1 },
		{ 
			xtype: 'container',
			layout: {
				type: 'hbox',
				align : 'stretch'
			},
			items : [ { 
				xtype : 'datefield', 
				name : 'created_at', 
				flex : 1,
				disabled : true, 
				fieldLabel : T('label.created_at'), 
				format : T('format.datetime') 
			}, { 
				xtype : 'datefield', 
				name : 'updated_at', 
				flex : 1,
				disabled : true, 
				fieldLabel : T('label.updated_at'), 
				format : T('format.datetime') 
			} ]
		}	   		
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});