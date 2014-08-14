Ext.define('Prod.view.machine.Machine', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.machine.MachineSearch',
		'Prod.view.machine.MachineList'
	],
	
	xtype : 'prod_machine',
	
	title : T('label.machine'),
	
	searchView : 'prod_machine_search',
	
	gridView : 'prod_machine_list'
	
});