Ext.define('Term.view.rwmt.OpRwmtM020', {
	
	extend: 'Base.abstract.Form',

	xtype: 'term_rwmt_oprwmtm020',
	
	title : T('menu.TmRmScan'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	items: [{
		xtype: 'form',
		itemId: 'rwmt_manual',
		// flex: 0.5,
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items: [{
			xtype: 'panel',
			title: T('title.rm_info'),
			flex: 0.04,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
				fieldLabel: T('label.raw_material'),
				name : 'raw_material',
				xtype: 'entityfield',
				storeClass: 'Prod.store.Product',
				flex : 1
			}]
		}, {
			xtype: 'panel',
			flex: 0.02,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'displayfield',
				fieldLabel: T('label.operation'),
				itemId : 'operation',
				flex: 1
			}, {
				xtype: 'textfield',
				fieldLabel: T('label.qty'),
				flex: 1
			}]
		}, {
			xtype: 'panel',
			flex : 0.02,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
				fieldLabel: T('title.supplier'),
				name : 'supplier',
				xtype: 'entityfield',
				storeClass: 'Prod.store.Supplier',
				flex : 1
			}, {
				xtype: 'textfield',
				fieldLabel: T('label.memo'),
				itemId : 'memo',
				flex: 1
			}]
		}, {
			xtype: 'container',
			cls : 'marginT10',
			flex: 0.05,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'button',
				itemId : 'btn_rwmt_m_confirm',
				text : T('button.confirm'),
				flex: 1
			}, {
				xtype: 'button',
				itemId : 'btn_rwmt_m_cancel',
				text : T('button.cancel'),
				flex: 1
			}]
		}, {
			xtype: 'container',
			cls : 'marginT10'
		}]
	}]
});
