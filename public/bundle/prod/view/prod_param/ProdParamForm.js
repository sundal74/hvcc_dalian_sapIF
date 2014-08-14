Ext.define('Prod.view.prod_param.ProdParamForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_prod_param_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ fieldLabel : T('label.operation'), name : 'operation', xtype : 'entityfield', storeClass : 'Prod.store.Operation' },
		{ fieldLabel : T('label.machine'), name : 'machine', xtype : 'entityfield', storeClass : 'Prod.store.Machine' },
		{ 
			fieldLabel : T('label.product'), 
			name : 'product', 
			xtype : 'entityfield', 
			storeClass : 'Prod.store.Product',
			associationField : [ {
				name : 'operation.name-noteq',
				value : function() {
					return 'RM';
				}
			} ]
		},
		{ 
			name : 'location', 
			fieldLabel : T('label.location'),
			xtype : 'entitynamecombo',
			customSelectionUrl : '/domains/' + login.current_domain_id + '/diy_selections/SelectBarLoc/query.json',
			valueField : 'name'
		},
		{ name : 'target_uph', fieldLabel : T('label.target_uph'), xtype : 'numberfield', align : 'right' },
		{ name : 'cycletime', fieldLabel : T('label.cycletime'), xtype : 'numberfield', align : 'right' },
		{ xtype : 'datefield', name : 'created_at', disabled : true, fieldLabel : T('label.created_at'), format : T('format.datetime') },
		{ xtype : 'datefield', name : 'updated_at', disabled : true, fieldLabel : T('label.updated_at'), format : T('format.datetime') }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});