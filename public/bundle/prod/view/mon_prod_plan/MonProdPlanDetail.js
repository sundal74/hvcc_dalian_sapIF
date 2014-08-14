Ext.define('Prod.view.mon_prod_plan.MonProdPlanDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.mon_prod_plan.MonProdPlanForm'
	],
	
	xtype : 'prod_mon_prod_plan_detail',
	
	title : T('title.mon_prod_plan'),
	
	items : [ {
		xtype : 'prod_mon_prod_plan_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});