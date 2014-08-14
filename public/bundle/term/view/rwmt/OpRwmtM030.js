Ext.define('Term.view.rwmt.OpRwmtM030', {
	
	extend: 'Base.abstract.Form',

	xtype: 'term_rwmt_oprwmtm030',
	
	title : T('title.rm_lot_track'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	store: Ext.create('Ext.data.Store', {
		fields: [{
			name: 'id'
		}, {
			name: 'operation'
		}, {
			name: 'lot_no'
		}, {
			name: 'serial_no'
		}, {
			name: 'product'
		}, {
			name: 'in_qty'
		}, {
			name: 'track_qty'
		}, {
			name: 'input_time'
		}],
		
		pageSize : 25,
		
		proxy: {
			type : 'ajax',
			url : '/domains/' + login.current_domain_id + '/diy_services/GetRmLotList/query.json',
			format : 'json',
			reader : {
				type : 'json',
				root: 'items',
				successProperty : 'success',
				totalProperty : 'total'
			}
		}
	}),
	
	bbar: {
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
			xtype: 'grid',
			flex : 1,
			scroll: true,
			store: this.store,
			
			columns: [ {
				header: T('label.id'),
				dataIndex: 'id',
				flex: 1,
				hidden: true
			}, {
				header: T('label.lot_no'),
				dataIndex: 'lot_no',
				flex: 2
			}, {
				header: T('label.operation'),
				dataIndex: 'operation',
				flex: 0.7
			},	{
				header: T('label.part_no'),
				dataIndex: 'product',
				flex: 1.2
			}, {
				header: T('label.serial_no'),
				dataIndex: 'serial_no',
				flex: 0.6
			}, {
				header: T('label.in_qty'),
				dataIndex: 'in_qty',
				flex: 0.5,
				align : 'right'
			}, {
				header: T('label.remain_qty'),
				dataIndex: 'track_qty',
				flex: 0.5,
				align : 'right'
			}, {
				xtype: 'datecolumn',
				header: T('label.in_time'),
				dataIndex: 'input_time',
				format : T('format.datetime'),
				flex: 1,
				align : 'center'
			}/*, {
				xtype: 'actioncolumn',
				icon: 'theme/imageOPS/btnResultEdit.png',
				itemId : 'rm_lot_modify',
				align : 'center',
				width : 45
			}, {
				xtype: 'actioncolumn',
				icon: 'theme/imageOPS/btnDelete.png',
				itemId : 'rm_lot_del',
				align : 'center',
				width : 45
			}*/]
		}
	}
});
