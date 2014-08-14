Ext.define('Prod.view.inventory.InventoryTransferPopup', {
	
	extend : 'Base.abstract.Popup',
	
	requires : ['Ext.ux.CheckColumn'],

	xtype : 'prod_inventory_transfer_popup',
	
	title : T('title.inventory_transfer'),
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save', 'close']
	} ],
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	items: [{
		xtype : 'panel',
		title : 'From Store',
		layout : 'column',
		cls : 'infoFields3Column marginB20',
		defaultType : 'displayfield',
		items : [{
			fieldLabel : T('title.store'),
			name : 'store',
			itemId : 'store'
		}, {
			itemId: 'product',
			fieldLabel : T('label.product'),
			name : 'product'
		}, {
			itemId: 'qty',
			fieldLabel : T('label.qty'),
			name : 'qty'
		}]
	}, {	
		xtype : 'form',
		defaultType : 'textfield',
		flex : 1,
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items : [{
			xtype : 'displayfield',
			fieldLabel : T('label.product'),
			name : 'tran_product',
			itemId : 'tran_product'
		}, {
			fieldLabel : T('title.store'),
			name : 'tran_store',
			xtype : 'entityfield',
			storeClass : 'Prod.store.Store',
			allowBlank : false
		}, {
			xtype : 'numberfield',
			fieldLabel : T('label.transfer_qty'),
			name : 'modify_qty',
			allowBlank : false,
			value : 0
		}]
	}]	
});