Ext.define('Prod.view.label_plan.LabelPlan', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.label_plan.LabelPlanSearch',
		'Prod.view.label_plan.LabelPlanList'
	],
	
	xtype : 'prod_label_plan',
	
	title : T('title.label_plan'),
	
	searchView : 'prod_label_plan_search',
	
	gridView : 'prod_label_plan_list'
	
});