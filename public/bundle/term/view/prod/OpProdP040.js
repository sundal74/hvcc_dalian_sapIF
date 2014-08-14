/**
 * Modify Actual
 */
Ext.define('Term.view.prod.OpProdP040', {
	
	extend : 'Base.abstract.Popup',
	
	requires : ['Ext.ux.CheckColumn'],

	xtype : 'term_prod_opprodp040',
	
	title : T('title.actual_modify'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save', 'close']
	} ],
	
	height : 460,
	
	initComponent : function() {
		this.items = [ 
			this.createInfoPart(this),
			this.createGridPart(this),
			this.createInputPart(this)
		];
		this.callParent();
	},
	
	createInfoPart: function(view) {
		return {
			xtype : 'panel',
			layout : 'column',
			cls : 'infoFields2Column',
			defaultType : 'displayfield',
			items: [{
				fieldLabel : T('label.date'),
				name : 'date',
				itemId : 'date'
			}, {
				fieldLabel : T('label.shift'),
				name : 'shift',
				itemId : 'shift'
			}, {
				fieldLabel : T('label.operation'),
				name : 'operation',
				itemId : 'operation'
			}, {
				fieldLabel : T('label.machine'),
				name : 'machine',
				itemId : 'machine'
			}]
		}
	},
	
	createGridPart : function(view) {
		return {
			xtype : 'grid',
			title : T('title.product_info'),
			store: Ext.create('Ext.data.Store', {
				fields: [{
					name: 'product'
				}, {
					name: 'product_desc'
				}, {
					name: 'actual_qty'
				}, {
					name: 'modify_qty'
				}],
				data: []
			}),

			autoScroll : true,

			columns : [{
				dataIndex : 'product',
				text : T('label.product'),
				flex : 1,
				renderer: function(value) {
					return value.name ? value.name : value;
				}
			}, {
				dataIndex : 'product_desc',
				text : T('label.product_desc'),
				flex : 2
			}, {
				dataIndex : 'actual_qty',
				itemId : 'actual_qty',
				text : T('label.actual'),
				align : 'right',
				flex : 0.5
			}]
		};
	},
	
	createInputPart : function(view) {
		return {
			xtype : 'form',
			flex : 0.14,
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items : [ {
				xtype : 'container',
				layout : {
					type : 'hbox',
					align : 'stretch'
				},
				items : [ {
					fieldLabel : T('label.modify_qty'),
					xtype : 'numberfield',
					name : 'modify_qty',
					flex : 1,
					itemId : 'modify_qty',
					value : 0,
					minValue : -1000,
					maxValue : 1000,
					flex : 1
				}, {
					xtype : 'button', 
					width : 80, 
					text : T('button.keypad'),
					margin : '0 5 0 5',
					align : 'center', 
					itemId : 'keypad'
				} ]
			}, {
				xtype : 'textareafield',
				name : 'description',
				cls : 'marginT10',
				fieldLabel : T('label.reason'),
				allowBlank : false
			} ]
		};
	}
});