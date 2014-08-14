Ext.define('Comp.view.pms_spc_alarm.PmsSpcAlarmForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'comp_pms_spc_alarm_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ name : 'prd_date', fieldLabel : T('label.prd_date') },
		{ name : 'seq', fieldLabel : T('label.seq'), xtype : 'numberfield' },
		{ name : 'routing', fieldLabel : T('label.routing') },
		{ name : 'st_no', fieldLabel : T('label.st_no') },
		{ name : 'p_code', fieldLabel : T('label.p_code') },
		{ name : 'item_no', fieldLabel : T('label.item_no') },
		{ name : 'alarm_type', fieldLabel : T('label.alarm_type') },
		{ name : 'val1', fieldLabel : T('label.val1'), xtype : 'numberfield' },
		{ name : 'val2', fieldLabel : T('label.val2'), xtype : 'numberfield' },
		{ name : 'val3', fieldLabel : T('label.val3'), xtype : 'numberfield' },
		{ name : 'val4', fieldLabel : T('label.val4'), xtype : 'numberfield' },
		{ name : 'val5', fieldLabel : T('label.val5'), xtype : 'numberfield' },
		{ name : 'actdttm', fieldLabel : T('label.actdttm') },
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'delete', 'close']
	} ]
});