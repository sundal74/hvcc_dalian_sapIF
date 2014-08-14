Ext.define('Prod.view.prod_plan.PlanPopup', {
	
	extend : 'Base.abstract.Popup',
	
	requires : ['Prod.view.prod_plan.PlanPopupList'],
	
	xtype : 'prod_plan_popup',
	
	title : T('title.prod_plan'),
	
	width : 1000,
	
	height : 600,
		
	layout : { type : 'vbox', align : 'stretch' },
	
	initComponent : function() {
		this.callParent(arguments);
		this.add({
			xtype : 'prod_plan_popup_list',
			flex : 1
		});
	},
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save', 'cancel']
	} ],
});