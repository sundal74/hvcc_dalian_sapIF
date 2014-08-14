Ext.define('Prod.view.lot.RmInOutTrackPopup', {
	
	extend : 'Base.abstract.Popup',
	
	xtype : 'prod_rm_in_out_track_popup',
	
	title : T('title.lot'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	record : null,
	
	items: [/*{
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
			fieldLabel : T('label.label_no'),
			name : 'label_no'
		} ]
	}, */{
		xtype : 'grid',
		
		title : T('title.used_rm'),
		
		id : 'LotTrackPopupGrid',
		
		store: Ext.create('Ext.data.Store', {
			fields: [ {
				name: 'id'
			}, {
				name: 'store_loc'
			}, {
				name: 'product'
			}, {
				name: 'product_desc'
			}, {
				name: 'lot_size'
			}, {
				name: 'qty'
			}, {
				name: 'time'
			}],
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
			text : T('title.store_loc'),
			dataIndex : 'store_loc',
			flex : 1
		}, {
			text : T('label.product'),
			dataIndex : 'product',
			flex : 1
		}, {
			text : T('label.product_desc'),
			dataIndex : 'product_desc',
			flex : 1
		}, {
			text : T('label.lot_qty'),
			dataIndex : 'lot_size',
			flex : 1
		}, {
			text : T('label.qty'),
			dataIndex : 'qty',
			flex : 1
		}, {
			text : T('label.time'),
			dataIndex : 'time',
			flex : 1
		} ]
	} ]	
});