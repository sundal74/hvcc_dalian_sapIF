Ext.define('Prod.view.prod_closing.ProdClosingSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_prod_closing_search',
		
	items : [
		{ 
			name : 'work_date-eq', 
			fieldLabel : T('label.work_date'), 
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
		}
	]
	
});