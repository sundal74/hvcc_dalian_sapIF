Ext.define('Prod.view.prod_param.ProdParamAddPopup', {
	
	extend : 'Base.abstract.Popup',
	
	xtype : 'prod_prod_param_add_popup',
	
	title : T('title.prod_param'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	height : 500,
	
	initComponent : function() {
		this.items = [ 
			this.createFormPart(this),
			this.createGridPart(this) 
		];
		
		this.callParent();
		
		var pagingtoolbar = this.down(' pagingtoolbar');
		var store = this.down('grid').store;
		pagingtoolbar.bindStore(store);
		store.on('load', function(store) {
			if(store.getTotalCount() > store.getCount()) {
				pagingtoolbar.show();
			} else {
				pagingtoolbar.hide();
			}
		});
	},
	
	createFormPart: function(view) {
		return {
			xtype: 'form',
			layout: 'hbox',
			defaults: {
				anchor : '90%'
			},
			items : [ {
				xtype: 'container',
				flex : 1,
				layout : 'anchor',
			    items: [
					{ 
						fieldLabel : T('label.operation'), 
						name : 'operation', 
						xtype : 'entityfield', 
						storeClass : 'Prod.store.Operation', 
						flex : 1
					}
				]
			}, {
				xtype: 'container',
				flex : 1,
				layout : 'anchor',
				items: [
					{ 
						fieldLabel : T('label.machine'), 
						name : 'machine', 
						xtype : 'entityfield', 
						storeClass : 'Prod.store.Machine',
						flex : 1 ,
						associationField : [ {
							name : 'operation.name-eq',
							value : function(host) {
								var form = host.up('form');
								var opfield = form.down('entityfield[name=operation]');
								return opfield.getValue();
							}
						} ]
					}
				]
			}, {
				xtype : 'button',
				itemId : 'btn_show',
				name : false,
				text : T('button.search')
			} ]
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
					name: 'domain_id'
				}, {
					name: 'operation_id'
				}, {
					name: 'machine_id'
				},{
					name: 'product', type : 'auto'
				}, {
					name: 'product_id'
				}, {
					name: 'location'
				}, {
					name: 'target_uph'
				}, {
					name: 'cycletime'
				}, {
					name: '_cud_flag_'
				}],
				proxy: {
					type : 'ajax',
					url : '/domains/' + login.current_domain_id + '/prod_params',
					format : 'json',
					reader : {
						root : 'items',
						type : 'json',
						successProperty : 'success',
						totalProperty : 'total'
					},
				},
				add_row : function(operationId, machineId) {
					this.insert(0, {"id" : "", "domain_id" : login.current_domain_id, "operation_id" : operationId, "machine_id" : machineId, "product_id" : "", "target_uph": "", "cycletime" : "", "_cud_flag_" : ""});
				}
			}),

			dockedItems: [{
				xtype: 'toolbar',
				items: [{
					text: '+',
					scope: this,
					itemId: 'btn_add'
				}]
			}, {
				xtype : 'pagingtoolbar',
				cls : 'pagingToolbar',
				dock: 'bottom',
				displayInfo: true,
				displayMsg: T('text.Paging Toolbar Display Message'),
				emptyMsg: T('text.Paging Toolbar Empty Message'),
				hidden : false
			}],
			
			autoScroll : true,

			columns : [{
				hidden : true,
				dataIndex : 'id'
			}, {
				hidden : true,
				dataIndex : 'domain_id'
			}, {
				hidden : true,
				dataIndex : 'operation_id'
			}, {
				hidden : true,
				dataIndex : 'machine_id'
			}, {
				text: T('label.product'),
				dataIndex : 'product',
				flex : 1.5,
				xtype : 'entitycolumn',
				editor : {
					xtype : 'entityfield',
					storeClass : 'Prod.store.Product',
					associationField : [ {
						name : 'prod_type-noteq',
						value : function() {
							return 'RM';
						}
					} ]
				}
			}, {
				text: T('label.location'),
				dataIndex : 'location',
				xtype: 'entitycolumn',
				flex : 1.5,
				editor : {
					xtype : 'entitynamecombo',
					customSelectionUrl : '/domains/' + login.current_domain_id + '/diy_selections/SelectBarLoc/query.json',
					valueField : 'name'
				}
			}, {
				text : T('label.target_uph'),
				dataIndex : 'target_uph',
				align : 'right',
				editor : {
					xtype : 'numberfield',
					minValue : 0
				}
			}, {
				text : T('label.cycletime'),
				dataIndex : 'cycletime',
				align : 'right',
				editor : {
					xtype : 'numberfield',
					minValue : 0
				}
			}, {
				xtype : 'actioncolumn',
				icon: 'theme/imageOPS/btnDelete.png',
				width : 90,
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
		items: ['->', 'add', 'save', 'close']
	} ]
});