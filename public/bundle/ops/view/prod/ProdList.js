/**
 * Production List
 */
Ext.define('Ops.view.prod.ProdList', {
	
	extend : 'Base.abstract.Form',

	xtype : 'ops_prod_list',
	
	title : T('title.prod_report'),
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	dockedItems : [ {
		xtype : 'controlbar',
		items : [ '->', 'back' ]
	} ],
	
	store : Ext.create('Ext.data.Store', {
		fields: [ {
			name : 'prod_order_id'
		}, {
			name : 'id'
		}, {
			name : 'name'
		}, {
			name : 'product'
		}, {
			name : 'product_desc'
		}, {
			name : 'actual_qty'
		}, {
			name : 'defect_qty'
		}, {
			name : 'rework_qty'
		}, {
			name : 'tran_time',
			type : 'date'
		} ],

		sorters: [ {
			property : 'tran_time',
			direction : 'desc'
		} ],
		
		pageSize : 25,

		proxy : {
			type : 'ajax',
			url : '/domains/' + login.current_domain_id + '/lots.json',
			format : 'json',
			reader : {
				type : 'json',
				root: 'items',
				successProperty : 'success',
				totalProperty : 'total'
			}
		}
	}),
	
	bbar : {
		xtype : 'pagingtoolbar',
		cls : 'pagingToolbar',
        displayInfo: true,
        displayMsg: T('text.Paging Toolbar Display Message'),
        emptyMsg: T('text.Paging Toolbar Empty Message'),
		hidden : true
    },
	
	initComponent : function() {
		this.items = [ 
			this.createGridPart(this),
		];
		
		this.callParent();
		
		var pagingtoolbar = this.down('pagingtoolbar');
		pagingtoolbar.bindStore(this.store);
		
		this.store.on('load', function(store) {
			if(store.getTotalCount() > store.getCount()) {
				pagingtoolbar.show();
			} else {
				pagingtoolbar.hide();
			}
		});
	},

	createGridPart : function(view) {
		return {
			xtype : 'grid',
			scroll : true,
			flex : 1,
			store : this.store,
		
			columns : [ {
				header : T('label.id'),
				dataIndex : 'prod_order_id',
				hidden : true
			}, {
				header : T('label.id'),
				dataIndex : 'id',
				hidden : true
			}, {
				header : T('label.lot_no'),
				dataIndex : 'name',
				flex : 2.3
			}, {
				header : T('label.product'),
				dataIndex : 'product',
				flex : 0.8,
				renderer : function(value) {
					return value.name;
				}
			}, {
				header : T('label.product_desc'),
				dataIndex : 'product_desc',
				flex : 1.1
			}, {
				header : T('label.actual_qty'),
				dataIndex : 'actual_qty',
				xtype : 'numbercolumn',
				format : T('format.number'),
				flex : 0.35,
				align : 'right'
			}, {
				header: T('label.scan_time'),
				dataIndex: 'tran_time',
				flex: 1.2,
				align: 'center',
				format : T('format.datetime')
			}, /*{
				xtype: 'actioncolumn',
				itemId : 'modify_actual',
				icon : 'theme/imageOPS/btnResultEdit.png',
				width : 50,
				align : 'center'
			},{
				xtype : 'actioncolumn',
				align : 'center',
				itemId : 'delete_lot',
				icon: 'theme/imageOPS/btnDelete.png',
				width : 50,
			// handler: function(grid, rowIndex, colIndex, item, e, record) {
			// 	grid.getStore().removeAt(rowIndex, 1);
			// }
			}*/ ]
		};
	}
});
