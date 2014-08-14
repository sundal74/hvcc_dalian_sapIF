Ext.define('Prod.view.machine_chk_plan.MachineChkPlan', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.machine_chk_plan.MachineChkPlanSearch',
		'Prod.view.machine_chk_plan.MachineChkPlanList'
	],
	
	xtype : 'prod_machine_chk_plan',
	
	title : T('title.machine_chk_plan'),
	
	searchView : 'prod_machine_chk_plan_search',
	
	gridView : 'prod_machine_chk_plan_list'
	
});