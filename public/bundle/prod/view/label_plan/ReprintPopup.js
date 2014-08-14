Ext.define('Prod.view.label_plan.ReprintPopup', {
	
	extend : 'Base.abstract.Popup',
	
	requires : ['Ext.ux.CheckColumn'],

	xtype : 'prod_reprint_popup',
	
	title : T('title.reprint'),
	
	height : 300,
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'print', 'close']
	} ],
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	items: [ {
		xtype : 'panel',
		layout : 'column',
		cls : 'infoFields2Column marginB20',
		defaultType : 'displayfield',
		items : [ {
			fieldLabel : T('label.work_date'),
			name : 'work_date',
			itemId : 'work_date'
		}, {
			fieldLabel : T('label.shift'),
			itemId: 'shift',
			name : 'shift'
		}, {
			fieldLabel : T('label.operation'),
			itemId: 'operation',
			name : 'operation'
		}, {
			fieldLabel : T('label.product'),
			itemId: 'product',
			name : 'product'
		}, {
			fieldLabel : T('label.plan_qty'),
			itemId: 'plan_qty',
			name : 'plan_qty'
		}, {
			fieldLabel : T('label.lot_qty'),
			itemId: 'lot_qty',
			name : 'lot_qty'
		} ]
	}, {	
		xtype : 'form',
		defaultType : 'textfield',
		flex : 1,
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items : [ {
			xtype : 'textfield',
			name : 'id',
			itemId : 'label_plan_id',
			hidden : true
		}, {
			fieldLabel : T('label.lot_qty'),
			name : 'to_lot_qty',
			itemId : 'to_lot_qty',
			xtype : 'numberfield',
			value : 1,
			minValue : 1
		}, {
			fieldLabel : T('label.print_qty'),
			name : 'to_print_qty',
			itemId : 'to_print_qty',
			xtype : 'numberfield',
			value : 1,
			minValue : 1
		} ]
	}]	
});