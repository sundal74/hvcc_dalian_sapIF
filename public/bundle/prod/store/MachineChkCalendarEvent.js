Ext.define('Prod.store.MachineChkCalendarEvent', {
	
	requires : ['Extensible.calendar.data.EventStore'],
	
	extend : 'Extensible.calendar.data.EventStore',

	autoLoad: true,
	
	proxy : {
		type : 'ajax',
		url : 'domains/' + login.current_domain_id + '/diy_selections/ListMachineChkCal/query.json',
		reader : {
			type : 'json',
			root : 'items',
			totalProperty : 'total'
		},
		writer: {
            type: 'json',
			nameProperty: 'mapping'
        }
	},
	
	pageSize : 1000	
});