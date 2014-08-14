Ext.define('Hcc.view.daily_actual_qty.DailyActualQtyDetail', {
	
	extend : 'Base.abstract.Popup',
	
	xtype : 'hcc_daily_actual_qty_detail',
	
	title : T('title.modify_actual'),
	
	height : 420,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save', 'close']
	} ],
	
	items: [{
		xtype : 'panel',
		layout : 'column',
		cls : 'infoFields2Column marginB20',
		defaultType : 'displayfield',
		items : [ {
			itemId: 'order_date',
			fieldLabel : T('label.date'),
			name : 'order_date'
		}, {
			itemId: 'workcenter',
			fieldLabel : T('label.wc'),
			name : 'workcenter'
		}, {
			itemId: 'operation',
			fieldLabel : T('label.operation'),
			name : 'operation'
		}, {
			itemId: 'machine',
			fieldLabel : T('label.machine'),
			name : 'machine'
		} ]
	}, {
		xtype : 'grid',
		
		title : T('title.prod_info'),
		
		id : 'LotTrackPopupGrid',
		
		store: Ext.create('Ext.data.Store', {
			fields: [ {
				name: 'product'
			}, {
				name: 'product_desc'
			}, {
				name: 'actual_qty'
			}]
		}),

		autoScroll : true,

		columns : [ {
			text : T('label.product'),
			dataIndex : 'product',
			flex : 1
		}, {
			text : T('label.product_desc'),
			dataIndex : 'product_desc',
			flex : 2
		}, {
			text : T('label.actual_qty'),
			dataIndex : 'actual_qty',
			flex : 0.5,
			align : 'right'
		} ]
	}, {
		xtype : 'form',
		flex : 0.14,
		cls : 'marginT10',
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items : [{
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			xtype : 'panel',
			items : [{
				xtype : 'numberfield',
				name : 'modify_qty',
				itemId : 'modify_qty',
				fieldLabel : T('label.modify_qty'),
				flex : 1,
				allowBlank : false
			}]
		}, {
			xtype : 'textareafield',
			name : 'description',
			itemId : 'description',
			cls : 'marginT10',
			fieldLabel : T('label.reason'),
			allowBlank : false
		}]
	} ]	
});