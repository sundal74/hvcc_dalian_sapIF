/**
 * WIP Input
 */
Ext.define('Term.view.scan.OpScanP200', {
	
	extend: 'Base.abstract.Popup',

	xtype: 'term_scan_opscanp200',
	
	height : 420,
	
	title : T('button.wip_input'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	items: [ {
		xtype : 'panel',
		layout : 'column',
		cls : 'infoFields2Column marginB20',
		defaultType : 'displayfield',
		items : [ {
			fieldLabel : T('label.work_date'),
			itemId : 'work_date',
			value : HF.setting.get('option-work_date_disp')
		}, {
			fieldLabel : T('label.shift'),
			itemId : 'shift',
			value : HF.setting.get('option-shift_name')
		}, {
			fieldLabel : T('label.operation'),
			itemId : 'operation',
			value : HF.setting.get('option-operation').name
		}, {
			fieldLabel : T('label.machine'),
			itemId : 'machine',
			value : HF.setting.get('option-machine').name
		} ]
	}, {
		itemId : 'prod_label_scan',
		cls : 'marginB20',
		items: [{
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
			}]
		}, {
			xtype: 'image',
			src: 'theme/imageOPS/scan.png'
		}]
	}]
});
