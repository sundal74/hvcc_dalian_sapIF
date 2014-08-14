Ext.define('Hcc.view.plan_actual.ActualByMcSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'hcc_actual_by_mc_search',
	
	items : [
		{ 
			xtype: 'daterange', 
			fieldLabel: T('label.work_date'), 
			name: 'work_date' 
		},
		{ 
			fieldLabel : T('label.wc'), 
			name : 'workcenter.name-eq', 
			xtype : 'entitysearchcombo', 
			storeClass : 'Prod.store.Workcenter', 
			valueField : 'name' 
		},
		{ 
			fieldLabel : T('label.operation'), 
			name : 'operation.name-eq', 
			xtype : 'entitysearchcombo', 
			storeClass : 'Prod.store.Operation', 
			valueField : 'name', 
			associationField : ['workcenter.name-eq'] 
		},
		{
			name : 'main_op_flag-eq',
			fieldLabel : T('label.main_op_flag'),
			xtype : 'checkbox',
			inputValue : true,
			checked : true
		}
	]
	
});