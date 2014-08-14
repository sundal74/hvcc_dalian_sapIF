Ext.define('Prod.view.defect_mgt.DefectMgtUpdatePopup', {
	
	extend : 'Base.abstract.Popup',
	
	xtype : 'prod_defect_mgt_update_popup',
	
	title : T('title.register_scrap'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	width : 900,
	
	height : 500,
	
	initComponent : function() {
		this.items = [ 
			this.createGridPart(this) 
		];
		
		this.callParent();
	},
	
	createGridPart: function(view) {
		return {
			xtype : 'grid',
			
			flex : 1,
			
			store: Ext.create('Ext.data.Store', {
				autoLoad : false,
				fields: [ {
					name: 'id', type : 'string'
				}, {
					name: 'domain_id', type : 'string'
				}, {
					name: 'prod_order_id', type : 'string'
				}, {
					name: 'parent_yn', type : 'string'
				}, {
					name: 'child_product_id', type : 'string'
				}, {
					name: 'child_product', type : 'auto'
				}, {
					name: 'child_product_desc', type : 'string'
				}, {
					name: 'unit', type : 'string'
				}, {
					name: 'bom_qty', type : 'string'
				}, {
					name: 'defect_code_id', type : 'string'
				}, {
					name: 'defect_code', type : 'auto'
				}, {
					name: 'defect_qty', type : 'integer'
				}, {
					name: 'defect_desc', type : 'string'
				}, {
					name: '_cud_flag_', type : 'string'
				} ],
				
				proxy: {
					type : 'ajax',
					url : '/domains/' + login.current_domain_id + '/defects/new_scrap_bom.json',
					format : 'json',
					reader : {
						root : 'items',
						type : 'json'
					}
				}
			}),

			autoScroll : true,

			columns : [ {
				hidden : true,
				dataIndex : 'id'
			}, {
				hidden : true,
				dataIndex : 'domain_id'
			}, {
				hidden : true,
				dataIndex : 'prod_order_id'
			}, {
				hidden : true,
				dataIndex : 'parent_yn'
			}, {
				text: T('label.child_product'),
				dataIndex : 'child_product',
				xtype : 'entitycolumn',
				flex : 0.6
			}, {
				hidden : true,
				dataIndex : 'child_product_id'
			}, {
				text : T('label.x_desc', {x : T('label.child_product')}),
				dataIndex : 'child_product_desc',
				flex : 1.1,
			}, {
				text : T('label.unit'),
				dataIndex : 'unit',
				align : 'center',
				width : 50
			}, {
				text : T('label.usage'),
				dataIndex : 'bom_qty',
				align : 'right',
				width : 70
			}, {
				text: T('label.defect_code'),
				dataIndex : 'defect_code',
				xtype : 'entitycolumn',
				editor : {
					xtype : 'entityfield',
					storeClass : 'Prod.store.DefectCode'
				}
			}, {
				hidden : true,
				dataIndex : 'defect_code_id'
			}, {
				text : T('label.defect_qty'),
				dataIndex : 'defect_qty',
				width : 70,
				align : 'right',
				editor : { xtype : 'numberfield', minValue : 0 }
			}, {
				text : T('label.description'),
				dataIndex : 'defect_desc',
				flex : 1,
				editor : { xtype : 'textfield' }
			}, {
				hidden : true,
				dataIndex : '_cud_flag_',
				value : 'c'
			} ],

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