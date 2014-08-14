Ext.define('Prod.view.machine.MachineDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.machine.MachineForm'
	],
	
	xtype : 'prod_machine_detail',
	
	title : T('label.machine'),
		
	items : [ {
		xtype : 'prod_machine_form'
	} ],
	
	width : 700,
	
	height : 480,
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});