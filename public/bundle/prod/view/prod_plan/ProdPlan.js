Ext.define('Prod.view.prod_plan.ProdPlan', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.prod_plan.ProdPlanSearch',
		'Prod.view.prod_plan.ProdPlanList'
	],
	
	xtype : 'prod_prod_plan',
	
	title : T('title.prod_plan'),
	
	searchView : 'prod_prod_plan_search',
	
	gridView : 'prod_prod_plan_list'
	
});