Ext.define('Comp.view.pms_spc_alarm.PmsSpcAlarmDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Comp.view.pms_spc_alarm.PmsSpcAlarmForm'
	],
	
	xtype : 'comp_pms_spc_alarm_detail',
	
	title : T('title.pms_spc_alarm'),
		
	items : [ {
		xtype : 'comp_pms_spc_alarm_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});