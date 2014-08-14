Ext.define('Prod.view.lot.SerialTrackPopup', {
	
	extend : 'Base.abstract.Popup',
	
	xtype : 'prod_serial_track_popup',
	
	title : T('title.lot_serial'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	record : null,
	
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
			fieldLabel : T('label.label_no'),
			name : 'label_no'
		} ]
	}, {
		xtype : 'grid',
		
		title : T('title.serials'),
		
		id : 'LotTrackPopupGrid',
		
		store: Ext.create('Ext.data.Store', {
			fields: [ {
				name: 'id'
			}, {
				name: 'name'
			}, {
				name: 'serial_no'
			}, {
				name: 'scan_time'
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
			text : T('label.lot_no'),
			dataIndex : 'name',
			flex : 1
		}, {
			text : T('label.serial_no'),
			dataIndex : 'serial_no',
			flex : 1
		}, {
			xtype : 'datecolumn',
			format : T('format.datetime'),
			text : T('label.scan_time'),
			dataIndex : 'scan_time',
			flex : 1
		} ]
	} ]	
});