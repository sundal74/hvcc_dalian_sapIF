/**
 * Add Scrap
 */
Ext.define('Term.view.prod.OpProdP060', {
	
	extend : 'Base.abstract.Popup',
	
	requires : ['Ext.ux.CheckColumn'],

	xtype : 'term_prod_opprodp060',
	
	title : T('label.defect'),
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'add', 'save', 'close']
	} ],
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	height : 450,
	
	initComponent : function() {
		this.items = [ 
			this.createInfoPart(this),
			this.createReworkPart(this),
			this.createGridPart(this) 
		];
		
		this.callParent();
	},
	
	createInfoPart: function(view) {
		return {
			// column layout 을 쓰기 위해선 container,panel를 사용해야합니다 
			xtype : 'panel', 
			layout : 'column',
			// column의 갯수를 2, 3으로 사용하시고 하단의 items를 쭈욱 작성하시면 알아서 들어갑니다 
			cls : 'infoFields2Column',
			defaultType : 'displayfield',
			items: [ {
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
			}, {
				fieldLabel : T('label.product'),
				name : 'product',
				itemId : 'product'
			}, {
				fieldLabel : T('label.actual'),
				name : 'actual',
				itemId : 'actual'
			}, {
				fieldLabel : T('label.rework'),
				name : 'rework',
				itemId : 'rework'
			}, {
				fieldLabel : T('label.defect'),
				name : 'defect',
				itemId : 'defect'
			} ]
		}
	},
	
	createReworkPart : function(view) {
		return {
			xtype : 'panel',
			cls : 'marginT10',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [ {
				xtype : 'container',
				layout : {
					type : 'hbox',
					align : 'stretch'
				},
				items : [ {
					fieldLabel : T('label.rework_qty'),
					xtype : 'numberfield',
					name : 'rework_qty',
					width : 220,
					itemId : 'rework_qty',
					value : 0,
					minValue : 0,
					flex : 1
				}, {
					xtype : 'button', 
					width : 80, 
					text : T('button.keypad'),
					margin : '0 5 0 5',
					align : 'center', 
					itemId : 'rework_keypad'
				} ]
			} ]
		};
	},
	
	createGridPart: function(view) {
		return {
			xtype : 'grid',
			flex : 1,
			scroll : true,
			cls : 'marginT10',
			title: T('label.scrap_qty'),
			flex: 0.5,
			store: Ext.create('Ext.data.Store', {
				fields: [ {
					name: 'defect_code'
				}, {
					name: 'defect_qty'
				} ],
				proxy: {
					type: 'memory',
					reader: {
						type: 'json'
					}
				},
				add_row : function() {
					this.insert(0, {"defect_code" : "", "defect_qty" : ""});
				}
			}),
	
			autoScroll : true,
	
			columns : [ {
				text: T('label.defect_code'),
				dataIndex : 'defect_code',
				flex : 1,
				xtype: 'entitycolumn',
				editor: {
					xtype: 'entityfield',
					storeClass: 'Prod.store.DefectCode'
				}
			}, {
				text : T('label.defect_qty'),
				dataIndex : 'defect_qty',
				xtype : 'numbercolumn',
				format : T('format.number'),
				editor : {
					xtype : 'numberfield',
					minValue : 0,
					value : 0
				},
				flex : 1
			}, {
				xtype : 'actioncolumn',
				text : T('button.keypad'),
				itemId : 'grid_keypad',
				align : 'center',
				icon: 'theme/imageOPS/btnKeypad.png',
				flex : 0.3
			}, {
				xtype : 'actioncolumn',
				text : T('button.delete'),
				align : 'center',
				icon: 'theme/imageOPS/btnDelete.png',
				flex : 0.3,
				handler: function(grid, rowIndex, colIndex, item, e, record) {
					grid.getStore().removeAt(rowIndex, 1);
				}
			} ],
			
			selType: 'cellmodel',
			
			plugins: [
				Ext.create('Ext.grid.plugin.CellEditing', {
					clicksToEdit: 1,
			        autoCancel : true
				})
			]
		}
	}
});