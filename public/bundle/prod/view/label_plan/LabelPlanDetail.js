Ext.define('Prod.view.label_plan.LabelPlanDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.label_plan.LabelPlanForm'
	],
	
	xtype : 'prod_label_plan_detail',
	
	items : [ {
		xtype : 'prod_label_plan_form'
	} ],
	
	title : T('title.label_plan'),
	
	height : 440,
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});