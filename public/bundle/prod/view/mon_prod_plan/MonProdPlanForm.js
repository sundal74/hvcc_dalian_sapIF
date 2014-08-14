Ext.define('Prod.view.mon_prod_plan.MonProdPlanForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_mon_prod_plan_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ name : 'plan_year', fieldLabel : T('label.plan_year') },
		{ name : 'plan_month', fieldLabel : T('label.plan_month') },
		{ fieldLabel : T('label.product'), name : 'product', xtype : 'entityfield', storeClass : 'Prod.store.Product' },
		{ name : 'w1_plan_qty', fieldLabel : T('label.week_plan_qty', {x : '1'}), xtype : 'numberfield', minValue : 0, format : T('format.number') },
		{ name : 'w2_plan_qty', fieldLabel : T('label.week_plan_qty', {x : '2'}), xtype : 'numberfield', minValue : 0, format : T('format.number') },
		{ name : 'w3_plan_qty', fieldLabel : T('label.week_plan_qty', {x : '3'}), xtype : 'numberfield', minValue : 0, format : T('format.number') },
		{ name : 'w4_plan_qty', fieldLabel : T('label.week_plan_qty', {x : '4'}), xtype : 'numberfield', minValue : 0, format : T('format.number') },
		{ name : 'w5_plan_qty', fieldLabel : T('label.week_plan_qty', {x : '5'}), xtype : 'numberfield', minValue : 0, format : T('format.number') }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});