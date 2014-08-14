/**
 * Barcode Scan : Lot Processing
 */
Ext.define('Term.view.scan.OpScanP110', {
	
	extend: 'Base.abstract.Popup',

	xtype: 'term_scan_opscanp110',
	
	height : 500,
	
	title : T('title.prod_output'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	items: [ {
		xtype : 'panel',
		layout : 'column',
		title : T('title.prod_info'),
		cls : 'infoFields2Column marginB20',
		defaultType : 'displayfield',
		items : [ {
			xtype: 'displayfield',
			fieldLabel: T('label.operation'),
			itemId : 'operation',
			value : HF.setting.get('option-operation').name
		}, {
			xtype: 'displayfield',
			fieldLabel: T('label.machine'),
			itemId : 'machine',
			value : HF.setting.get('option-machine').name
		}, {
			fieldLabel : T('label.product'),
			itemId : 'product'
		}, {
			fieldLabel : T('label.description'),
			itemId : 'product_desc',
		}, {
			fieldLabel : T('label.plan_qty'),
			itemId : 'plan'
		}, {
			fieldLabel : T('label.actual'),
			itemId : 'actual'
		} ]
	}, {
		itemId : 'prod_label_scan',
		cls : 'marginB20',
		items: [ {
			layout : 'hbox',
			items : [ {
				xtype : 'textfield',
				flex : 0.9,
				fieldLabel : T('label.label'),
				name : 'label',
				id : 'text_label',
				itemId : 'text_label_enter',
				enableKeyEvents : true,
				allowBlank : false
			}, {
				xtype: 'button',
				itemId : 'btn_ok',
				text : 'OK',
				width : 70
			}, {
				width : 10
			} ]
		}, {
			xtype: 'image',
			src: 'theme/imageOPS/scan.png'
		}]
	}]
});
