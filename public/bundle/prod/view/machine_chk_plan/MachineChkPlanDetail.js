Ext.define('Prod.view.machine_chk_plan.MachineChkPlanDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.machine_chk_plan.MachineChkPlanForm'
	],
	
	xtype : 'prod_machine_chk_plan_detail',
	
	title : '',
	
	items : [ {
		xtype : 'prod_machine_chk_plan_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});