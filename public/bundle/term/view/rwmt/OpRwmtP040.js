Ext.define('Term.view.rwmt.OpRwmtP040', {
	
	extend : 'Base.abstract.Popup',
	
	requires : ['Ext.ux.CheckColumn'],

	xtype : 'term_noti_oprwmtp040',
	
	title : T('title.rm_lot_update'),
	
	width : 700,
	
	height : 360,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save']
	} ],
	
	items: [{
		xtype: 'container',
		items: [{
			layout : 'column',
			xtype : 'panel',
			defaultType : 'displayfield',
			cls : 'infoFields2Column',
			flex : 1,
			items : [{
				fieldLabel : T('label.id'),
				itemId : 'id',
				flex : 1,
				hidden : true
			}, {
				fieldLabel : T('label.lot_no'),
				itemId : 'lot_no'
			}, {
				fieldLabel : T('label.serial_no'),
				itemId : 'serial_no'
			}, {
				fieldLabel : T('label.part_no'),
				itemId : 'part_no'
			}, {
				fieldLabel : T('title.supplier'),
				itemId : 'supplier_code'
			}, {
				fieldLabel : T('label.in_time'),
				itemId : 'inv_in_time'
			}, {
				fieldLabel : T('label.in_qty'),
				itemId : 'in_qty'
			}]
		}]
	}, {
		xtype : 'container',
		flex : 1,
		items : [{
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			xtype : 'panel',
			flex : 1,
			items : [{
				name : 'calculation',
				itemId : 'calculation',
				fieldLabel : T('label.modify_qty'),
				xtype : 'checkboxfield',
				inputValue : true,
			}, {
				xtype : 'numberfield',
				itemId : 'modify_qty',
				height : 100
			}]
		}]
	}]
});