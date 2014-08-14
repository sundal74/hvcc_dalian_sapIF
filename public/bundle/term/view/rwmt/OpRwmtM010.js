Ext.define('Term.view.rwmt.OpRwmtM010', {
	
	extend: 'Base.abstract.Popup',

	xtype: 'term_rwmt_oprwmtm010',
	
	title : T('title.scan_rm'),
	
	layout: 'card',

	items: [{
		itemId : 'rwmt_label_scan',
		layout: {
			type : 'vbox',
			align : 'stretch'
		},
		items: [{
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			items : [ {
				xtype : 'textfield',
				flex : 1,
				fieldLabel : T('label.label'),
				name : 'label',
				id : 'label',
				itemId : 'text_label_enter',
				enableKeyEvents : true
			}, {
				xtype: 'button',
				itemId : 'btn_ok',
				text : 'OK',
				width : 80,
				margin : '0 5 0 5'
			}]
		}, {
			xtype: 'image',
			flex : 1,
			src: 'theme/imageOPS/scan.png'
		}]
	}]
});
