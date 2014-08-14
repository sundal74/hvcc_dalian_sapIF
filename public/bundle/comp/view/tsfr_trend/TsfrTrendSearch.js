Ext.define('Comp.view.tsfr_trend.TsfrTrendSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'comp_tsfr_trend_search',
	
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
			storeClass : 'Prod.store.Workcenter',
			associationField : [ {
				name : 'dept_type-eq',
				value : function(host) {
					return '2';
				}
			} ]
		},
		{ 
			fieldLabel : T('label.operation'), 
			name : 'operation.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Operation',
			associationField : ['workcenter.name-eq']
		}
	]
	
});