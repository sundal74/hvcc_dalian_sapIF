Ext.define('Prod.view.lot.LotTrackPopup', {
	
	extend : 'Base.abstract.Popup',
	
	xtype : 'prod_lot_track_popup',
	
	title : T('title.used_rm'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	record:null,
	
	items: [{
		xtype : 'form',
		layout : 'column',
		cls : 'infoFields2Column marginB20',
		defaultType : 'displayfield',
		items : [ {
			itemId: 'product',
			fieldLabel : T('label.product'),
			name : 'product'
		}, {
			itemId: 'operation',
			fieldLabel : T('label.operation'),
			name : 'operation'
		}, {
			itemId: 'machine',
			fieldLabel : T('label.machine'),
			name : 'machine'
		}, {
			itemId: 'label_no',
			fieldLabel : T('label.lot_no'),
			name : 'label_no'
		} ]
	}, {
		xtype : 'grid',
		
		title : T('title.rm_histories'),
		
		id : 'LotTrackPopupGrid',
		
		store: Ext.create('Ext.data.Store', {
			fields: [ {
				name: 'id'
			}, {
				name: 'serial_no'
			}, {
				name: 'supplier_code'
			}, {
				name: 'part_no'
			}, {
				name: 'invoice_no'
			}, {
				name: 'use_qty'
			}, {
				name: 'inv_in_time'
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
			text : T('label.serial_no'),
			dataIndex : 'serial_no',
			flex : 0.7
		}, {
			text : T('title.supplier'),
			dataIndex : 'supplier_code',
			flex : 1
		}, {
			text : T('label.part_no'),
			dataIndex : 'part_no',
			flex : 1
		}, {
			text : T('label.invoice_no'),
			dataIndex : 'invoice_no',
			flex : 1
		}, {
			text : T('label.scan_time'),
			dataIndex : 'inv_in_time',
			xtype : 'datecolumn', 
			format : T('format.datetime'),
			align : 'center',
			flex : 1.3
		}, {
			text : T('label.qty'),
			dataIndex : 'use_qty',
			flex : 0.5
		} ]
	} ]	
});