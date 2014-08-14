/**
 * Manual Output
 */
Ext.define('Term.view.scan.OpScanP100', {
	
	extend: 'Base.abstract.Popup',

	xtype: 'term_scan_opscanp100',
	
	title : T('button.btn_manual_output'),
	
	height : 485,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'keypad', 'save', 'close']
	} ],
	
	items: [{
		xtype : 'panel',
		title : T('title.prod_info'),
		layout : 'column',
		cls : 'infoFields2Column marginB20',
		defaultType : 'displayfield',
		items : [ {
			fieldLabel : T('label.date'),
			name : 'date',
			itemId : 'date',
			value : HF.setting.get('option-work_date_disp')
		}, {
			fieldLabel : T('label.shift'),
			name : 'shift',
			itemId : 'shift',
			value : HF.setting.get('option-shift_name')
		}, {
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
			itemId : 'product_desc'
		},	{
			fieldLabel : T('label.plan_qty'),
			itemId : 'plan_qty'
		}, {
			fieldLabel : T('label.actual'),
			itemId : 'actual_qty'
		} ]
	}, {
		xtype : 'numberfield',
		minValue : 1,
		name : 'qty',
		itemId : 'qty',
		fieldLabel : T('label.actual_qty'),
		maxValue : 10000,
		minValue : -10000
	}, {
		fieldLabel : T('label.reason'),
		cls : 'marginT10',
		xtype : 'textarea',
		name : 'reason',
		itemId : 'reason'
	} ]
});
