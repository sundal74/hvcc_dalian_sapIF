Ext.define('Prod.view.mon_prod_plan.MonProdPlan', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.mon_prod_plan.MonProdPlanSearch',
		'Prod.view.mon_prod_plan.MonProdPlanList'
	],
	
	xtype : 'prod_mon_prod_plan',
	
	title : T('title.mon_prod_plan'),
	
	searchView : 'prod_mon_prod_plan_search',
	
	gridView : 'prod_mon_prod_plan_list'
	
});