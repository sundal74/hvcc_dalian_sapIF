Ext.define('Comp.view.pms_master_station.PmsMasterStationForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'comp_pms_master_station_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ 
			name : 'routing', 
			fieldLabel : T('label.operation'),
			xtype : 'entitynamecombo',
			storeClass : 'Prod.store.Operation',
			valueField : 'name'
		},
		{ 
			name : 'equipment', 
			fieldLabel : T('label.machine'),
			xtype : 'entitynamecombo',
			storeClass : 'Prod.store.Machine',
			valueField : 'name'
		},
		{ name : 'st_no', fieldLabel : T('label.st_no') },
		{ name : 'name', fieldLabel : T('label.name'), allowBlank : false, maxLength : 64 },
		{ name : 'tsfr_alarm_limit', fieldLabel : T('label.tsfr_alarm_limit'), xtype : 'numberfield', minValue : 0.0, maxValue : 100.0, format : T('format.precision') },
		{ name : 'monitor_flg', fieldLabel : T('label.monitor'), xtype : 'checkboxfield', inputValue : true },
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save', 'close']
	} ]
});