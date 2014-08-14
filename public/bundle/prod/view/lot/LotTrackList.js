Ext.define('Prod.view.lot.LotTrackList', {
	
	extend : 'Ext.grid.Panel',
	
	xtype : 'prod_lot_track_list',
		
	store: Ext.create('Ext.data.Store', {
			fields: [ {
				name: 'id'
			}, {
				name: 'lot_no'
			}, {
				name: 'serial_no'
			}, {
				name: 'product_id'
			}, {
				name: 'use_qty'
			}, {
				name: 'input_time'
			} ],
			proxy: {
				type : 'ajax',
				url : '',
				format : 'json',
				reader : {
					type : 'json'
				}
			}
	}),
	
	autoScroll : true,

	columns : [ {
		text : T('label.id'),
		dataIndex : 'id',
		hidden : true
	}, {
		text : T('label.lot_no'),
		dataIndex : 'lot_no',
		flex : 1
	}, {
		text : T('label.serial_no'),
		dataIndex : 'serial_no',
		flex : 0.7
	}, {
		text : T('label.part_no'),
		dataIndex : 'product_id',
		flex : 1,
		renderer : function(value, meta, record, rowIndex, colIndex, store) {
			return HF.idToName(value);
		}
	}, {
		text : T('label.scan_time'),
		dataIndex : 'input_time',
		xtype : 'datecolumn', 
		format : T('format.datetime'),
		align : 'center',
		flex : 1.3
	}, {
		text : T('label.qty'),
		dataIndex : 'use_qty',
		flex : 0.5,
		align : 'right'
	} ]
});