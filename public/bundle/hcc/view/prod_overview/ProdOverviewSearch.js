Ext.define('Hcc.view.prod_overview.ProdOverviewSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'hcc_prod_overview_search',
	
	items : [
	{ 
		fieldLabel : T('label.work_date'), 
		name : 'work_date-eq', 
		xtype : 'datefield', 
		format : T('format.date'), 
		submitFormat : T('format.submitDate') 
	},
	{ 
		fieldLabel : T('label.wc'), 
		name : 'workcenter.name-eq', 
		xtype : 'entitysearchcombo', 
		valueField : 'name', 
		storeClass : 'Prod.store.Workcenter'
	} ]
	
});