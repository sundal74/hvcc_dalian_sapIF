Ext.define('Prod.view.bom.BomAddPopup', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.bom.BomForm'
	],
	
	xtype : 'prod_bom_add_popup',
	
	title : T('title.bom'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	height : 500,
	
	parentNode:null,
	
	initComponent : function() {
		this.items = [ 
			this.createInfoPart(this),
			this.createGridPart(this) 
		];
		
		this.callParent();
	},
	
	createInfoPart: function(view) {
		return {
			xtype : 'form',
			layout : 'column',
			cls : 'infoFields1Column marginB20',
			defaultType : 'displayfield',
			items : [{
				itemId: 'product',
				fieldLabel : T('label.product'),
				name : 'product',
				flex:1
			}]
		}
	},
	
	createGridPart: function(view) {
		return {
			xtype : 'grid',
			flex : 1,

			store: Ext.create('Ext.data.Store', {
				autoLoad : false,
				fields: [{
					name: 'id'
				}, {
					name: 'parent_product_id'
				}, {
					name: 'domain_id'
				}, {
					name: 'child_product'
				}, {
					name: 'child_product_id'
				}, {
					name: 'child_product_desc'
				}, {
					name: 'unit'
				}, {
					name: 'qty'
				}, {
					name: 'bom_type'
				}, {
					name: '_cud_flag_'
				}],
				proxy: {
					type : 'ajax',
					url : '',
					format : 'json',
					reader : {
						root : 'items',
						type : 'json'
					}
				},
				add_row : function(parentProductId) {
					this.insert(0, {"id" : "", "domain_id": login.current_domain_id, "parent_product_id" : parentProductId, "child_product_id" : "", "child_product" : "", "child_product_desc" : "", "unit" : "", "qty" : "", "bom_type" : "", "_cud_flag_" : ""});
				}
			}),

			dockedItems: [{
				xtype: 'toolbar',
				items: [{
					text: '+',
					scope: this,
					itemId: 'btn_add'
				}]
			}],

			autoScroll : true,

			columns : [{
				hidden : true,
				dataIndex : 'id',
			}, {
				hidden : true,
				dataIndex : 'domain_id',
			}, {
				hidden : true,
				dataIndex : 'parent_product_id',
			}, {
				hidden : true,
				dataIndex : 'child_product_id',
			}, {
				text: T('label.child_product'),
				dataIndex : 'child_product',
				flex : 1,
				xtype: 'entitycolumn',
				editor: {
					xtype : 'entityfield',
					storeClass : 'Prod.store.Product'/*,
					associationField : [{
						name : 'prod_type-noteq',
						value : function() {
							return 'FERT';
						}
					}]*/
				}
			}, {
				text : T('label.description'),
				dataIndex : 'child_product_desc',
				flex : 1.5
			}, {
				text : T('label.unit'),
				dataIndex : 'unit',
				editor : { 
					xtype : 'codecombo', 
					commonCode : 'UNIT_TYPE' 
				},
				flex : 0.5,
				align : 'center'
			}, {
				text : T('label.usage'),
				dataIndex : 'qty',
				editor : { xtype : 'numberfield', minValue : 0},
				align : 'right'
			}, /*{
				text : T('label.bom_type'),
				dataIndex : 'bom_type',
				align : 'center',
				editor: 'entitycolumn',
				editor: {
					xtype : 'codecombo',
					commonCode : 'BOM_TYPE',
					valueField : 'name',
					displayField : 'description',
				}
			},*/ {
				xtype : 'actioncolumn',
				icon: 'theme/imageOPS/btnDelete.png',
				width : 60,
				align : 'center',
				handler: function(grid, rowIndex, colIndex, item, e, record) {
					grid.getStore().removeAt(rowIndex, 1);
				}
			}],

			selType: 'cellmodel',

			plugins: [
				Ext.create('Ext.grid.plugin.CellEditing', {
					clicksToEdit: 1,
		        	autoCancel : true
			})]
		}
	},
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save', 'close']
	} ]
});