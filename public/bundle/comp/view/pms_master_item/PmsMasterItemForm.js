Ext.define('Comp.view.pms_master_item.PmsMasterItemForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'comp_pms_master_item_form',
		
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
			fieldLabel : T('label.station'), 
			name : 'st_no', 
			xtype : 'entitynamecombo', 
			valueField : 'name', 
			customSelectionUrl : '/domains/' + login.current_domain_id + '/diy_selections/SelectStation/query.json'
		},
		{ name : 'st_seq_no', fieldLabel : 'St. Seq. No.', xtype : 'numberfield' },
		{ name : 'item_no', fieldLabel : T('label.item_no') },
		{ name : 'item_name', fieldLabel : T('label.item_name') },
		// { name : 'item_order', fieldLabel : 'Item Order', xtype : 'numberfield' },
		{ name : 'x_usl', fieldLabel : T('label.x_usl'), xtype : 'textfield', format : T('format.precision'), allowBlank : false },
		{ name : 'x_lsl', fieldLabel : T('label.x_lsl'), xtype : 'textfield', format : T('format.precision'), allowBlank : false },
		{ name : 'r_usl', fieldLabel : T('label.r_usl'), xtype : 'textfield', format : T('format.precision'), allowBlank : false },
		{ name : 'r_lsl', fieldLabel : T('label.r_lsl'), xtype : 'textfield', format : T('format.precision'), allowBlank : false },
		// { name : 'len', fieldLabel : 'Len', xtype : 'numberfield' },
		// { name : 'point_under_len', fieldLabel :'Precision', xtype : 'numberfield' },
		{ name : 'monitor_flg', fieldLabel :'Monitor', xtype : 'checkboxfield', inputValue : true  }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});