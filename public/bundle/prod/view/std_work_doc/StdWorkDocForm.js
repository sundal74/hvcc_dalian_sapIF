Ext.define('Prod.view.std_work_doc.StdWorkDocForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_std_work_doc_form',
	
	requires : ['Base.view.common.AttachmentGrid'],
		
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	items : [
		{ xtype : 'hidden', name : 'id' },
		{ xtype : 'hidden', name : 'domain_id' },
		{ xtype : 'hidden', name : 'file_group_id' },
		{ xtype : 'textfield', name : 'name', fieldLabel : T('label.title'), allowBlank : false, maxLength : 1300 },
		{ xtype : 'textfield', name : 'description', fieldLabel : T('label.description'), maxLength : 1300 },
		{ fieldLabel : T('label.operation'), name : 'operation', xtype : 'entityfield', storeClass : 'Prod.store.Operation', allowBlank : false },
		{  
			fieldLabel : T('label.machine'), 
			name : 'machine', 
			xtype : 'entityfield', 
			storeClass : 'Prod.store.Machine',
			allowBlank : false,
			associationField : [ {
				name : 'operation.name-eq',
				value : function(host) {
					var form = host.up('form');
					var opfield = form.down('entityfield[name=operation]');
					return opfield.getValue();
				}
			} ]
		},
		{ xtype : 'attachment_grid', flex : 1 }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save', 'close']
	} ]
});