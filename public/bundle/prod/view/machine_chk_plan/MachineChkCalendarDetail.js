Ext.define('Prod.view.machine_chk_plan.MachineChkCalendarDetail', {
	
	extend : 'Base.abstract.Panel',
	
	requires : [
		'Base.view.common.calendar.HatioCalendarPanel',
		'Prod.view.machine_chk_plan.MachineChkEventDetails',
		'Base.store.HatioCalendar', 
		'Prod.store.MachineChkCalendarEvent',
		'Prod.store.MachineChkWeeklyCalendarEvent'
	],

	xtype : 'prod_machine_chk_calendar_detail',

	layout : {
		align : 'stretch',
		type : 'vbox'
	},
	
	buildCalendar : function() {
		this.removeAll();
		this.setTitle(T('title.machine_chk_calendar'));
		var calendarHeight = this.up().getHeight() - 100;
		var calendarStore = Ext.create('Base.store.HatioCalendar');
		var eventStore = Ext.create('Prod.store.MachineChkCalendarEvent');
		var week2EventStore = Ext.create('Prod.store.MachineChkWeeklyCalendarEvent');
		eventStore.getProxy().extraParams = {'mode' : 'calendar'};
		eventStore.load();
		var calendarPanel = Ext.create('Base.view.common.calendar.HatioCalendarPanel', {
		    id: 'machine_chk_calendar',
		    itemId: 'machine_chk_calendar',
		    region: 'center',
		    eventStore: eventStore,
		    week2EventStore: week2EventStore,
		    calendarStore: calendarStore,
		    detailsXtype : 'prod_machine_chk_event_details',
			height : calendarHeight
		});
		this.add(calendarPanel);
	},
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'add']
	} ]
});