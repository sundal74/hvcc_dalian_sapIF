/**
 * Multiple Manual Output
 */
Ext.define('Term.view.prod.OpProdP090', {
	
	extend: 'Base.abstract.Popup',

	xtype: 'term_prod_opprodp090',
	
	title : T('button.multi_manual_output'),
		
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	width : 850,
	
	initComponent : function() {
		this.items = [ 
			this.createInfoPart(this),
			this.createGridPart(this) 
		];
		
		this.callParent();
	},
	
	createInfoPart: function(view) {
		return {
			// column layout 을 쓰기 위해선 container,panel를 사용해야합니다 
			xtype : 'panel', 
			layout : 'column',
			cls : 'infoFields2Column',
			defaultType : 'displayfield',
			items: [{
				fieldLabel : T('label.date'),
				name : 'date',
				itemId : 'date',
				value : HF.setting.get('option-work_date_disp')
			}, {
				fieldLabel : T('label.shift'),
				name : 'shift',
				itemId : 'shift',
				value : HF.setting.get('option-shift_name')
			}, {
				fieldLabel : T('label.operation'),
				name : 'operation',
				itemId : 'operation',
				value : HF.setting.get('option-operation').name
			}, {
				fieldLabel : T('label.machine'),
				name : 'machine',
				itemId : 'machine',
				value : HF.setting.get('option-machine').name
			}]
		}
	},
	
	createGridPart: function(view) {
		return {
			xtype : 'grid',
			flex : 1,
			scroll : true,
			cls : 'marginT10',
			title : T('title.prod_info'),
			flex: 0.5,
			store: Ext.create('Ext.data.Store', {
				fields: [{
					name: 'id'
				}, {
					name: 'product'
				}, {
					name: 'product_desc'
				}, {
					name: 'order_qty'
				}, {
					name: 'actual_qty'
				}, {
					name: 'add_qty',
					type : 'integer',
					value : 0
				}],
				proxy: {
					type: 'memory',
					reader: {
						type: 'json'
					}
				}
			}),
	
			autoScroll : true,
	
			columns : [ {
				dataIndex : 'id',
				hidden : true
			}, {
				text: T('label.product'),
				dataIndex : 'product',
				flex : 1
			}, {
				text: T('label.product_desc'),
				dataIndex : 'product_desc',
				flex : 2
			}, {
				text : T('label.plan_qty'),
				dataIndex : 'order_qty',
				xtype : 'numbercolumn',
				format : T('format.number'),
				align : 'right',
				flex : 0.5
			}, {
				text : T('label.actual_qty'),
				dataIndex : 'actual_qty',
				xtype : 'numbercolumn',
				format : T('format.number'),
				align : 'right',
				flex : 0.5
			}, {
				text : T('button.add'),
				dataIndex : 'add_qty',
				xtype : 'numbercolumn',
				format : T('format.number'),
				align : 'right',
				editor : {
					xtype : 'numberfield',
					minValue : -10000,
					maxValue : 10000,
					value : 0
				},
				flex : 0.5
			}, {
				xtype : 'actioncolumn', 
				width : 70, 
				align : 'center', 
				itemId : 'keypad',
				items : [ { icon : 'theme/imageOPS/btnKeypad.png', tooltip : T('button.keypad') } ]
			} ],
			
			selType: 'cellmodel',
			
			plugins: [
				Ext.create('Ext.grid.plugin.CellEditing', {
					clicksToEdit: 1,
					autoCancel : true
				})
			]
		}
	},
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save', 'close']
	} ]
});
