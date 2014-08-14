Ext.define('Prod.view.defect_mgt.DefectMgtDetailPopup', {
	
	extend : 'Base.abstract.Popup',
	
	xtype : 'prod_defect_mgt_detail_popup',
	
	title : T('title.details'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	width : 900,
	
	height : 500,
	
	items : [ {
		xtype : 'panel',
		layout : 'column',
		cls : 'infoFields2Column marginB20',
		defaultType : 'displayfield',
		items : [ {
			fieldLabel : T('label.product'),
			itemId: 'product',
			name : 'product'
		}, 	{
			fieldLabel : T('label.description'),
			itemId: 'product_desc',
			name : 'product_desc'
		} ]
	}, {
		xtype : 'grid',
		
		flex : 1,
		
		selType: 'cellmodel',

		plugins: [
			Ext.create('Ext.grid.plugin.CellEditing', {
				clicksToEdit: 1,
	        	autoCancel : true
		})],
		
		store: Ext.create('Ext.data.Store', {
			autoLoad : false,
			fields: [ {
				name: 'id', type : 'string'	
			}, 	{
				name: 'prod_order_id', type : 'string'	
			}, {
				name: 'defect_code', type : 'auto'
			}, {
				name: 'defect_qty', type : 'integer'
			}, {
				name: 'description', type : 'string'
			}, {
				name: '_cud_flag_', type : 'string'
			} ],
			
			proxy: {
				type : 'ajax',
				url : '/domains/' + login.current_domain_id + '/defects/defects_by_order.json',
				format : 'json',
				reader : {
					root : 'items',
					type : 'json'
				}
			},
			
			addRow : function(prodOrderId) {
				this.insert(0, {"id" : "", "prod_order_id" : prodOrderId, "defect_code" : {"id" : "", "name" : ""}, "defect_qty": 0, "description" : "", "_cud_flag_" : "c"});
			}
		}),

		autoScroll : true,

		columns : [ {
			dataIndex : 'id',
			hidden : true
		}, {
			dataIndex : 'prod_order_id',
			hidden : true
		}, {
			text: T('label.defect_code'),
			dataIndex : 'defect_code',
			xtype : 'entitycolumn',
			editor : {
				xtype : 'entityfield',
				storeClass : 'Prod.store.DefectCode'
			}
		}, {
			text: T('label.x_desc', {x : T('label.defect')}),
			dataIndex : 'defect_code',
			width : 150,
			renderer : function(val) {
				return val ? val.desc : '';
			}
		}, {
			text : T('label.defect_qty'),
			dataIndex : 'defect_qty',
			align : 'right',
			width : 100,
			editor : {
				xtype : 'numberfield',
				minValue : 0,
				maxValue : 10000
			}
		}, {
			text : T('label.description'),
			dataIndex : 'description',
			editor : { 
				xtype : 'textfield'
			},
			flex : 1.7
		}, {
			hidden : true,
			dataIndex : '_cud_flag_'
		} ]
	} ],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'add', 'save', 'close']
	} ]
});