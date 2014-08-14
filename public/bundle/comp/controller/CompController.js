Ext.define('Comp.controller.CompController', {
	extend: 'Ext.app.Controller',

	requires: [],

	stores: [],
	
	models: [],

	views: [],

	controllers: [],

	init: function() {
		var self = this;

		Ext.each(this.controllers, function(ctl) {
			self.getController('Comp.controller.' + ctl);
		});

		this.control({
		});
		
		HF.custom.setting({
			xtype : 'container',
			layout : 'hbox',
			items : [ {
				xtype : 'checkbox',
				fieldLabel : T('setting.rcv_comp_alarm'),
				name : 'setting-rcv_comp_alarm'
			} ]
		});
		
		this.alarmTimer();
	},
	
	alarmTimer : function() {
		var alarmStore = Ext.create('Comp.store.PmsAlarms');
		var alarmTask = new Ext.util.DelayedTask(function() {
			var receiveAlarm = HF.setting.get('setting-rcv_comp_alarm');
			if(!receiveAlarm) {
				var inquiryTime = Ext.Date.add(new Date(), Ext.Date.MINUTE, -6);
				var inqTimeStr = Ext.Date.format(inquiryTime, 'YmdHis');
				inqTimeStr += '000';
				alarmStore.getProxy().extraParams = { limit : 5, mode : 'alarm_popup', occurred_at : inqTimeStr };
				alarmStore.load({
					scope: this,
					callback: function(records, operation, success) {
						alarmTask.delay(60000 * 5);
						if(success) {
							if(records.length > 0) {
								HF.popup('Comp.view.pms_alarms.AlarmPopup', records, null);
							}
						} 
					}
				});				
			} else {
				alarmTask.delay(60000 * 5);
			}
		});
		
		alarmTask.delay(60000 * 5);
	}
});
