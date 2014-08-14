Ext.define('Comp.view.pms_spc.PmsSpcSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'comp_pms_spc_search',
		
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
			name : 'routing-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Operation',
			associationField : ['workcenter.name-eq']
		},
		{
			fieldLabel : T('label.item_no'), 
			name : 'item_no-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			customSelectionUrl : '/domains/' + login.current_domain_id + '/diy_selections/SelectPmsSpcItem/query.json',
			associationField : ['routing-eq']
		},
		{
			fieldLabel : T('label.p_code'), 
			name : 'p_code-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			customSelectionUrl : '/domains/' + login.current_domain_id + '/diy_selections/SelectPmsSpcPcode/query.json',
			associationField : ['item_no-eq', 'work_date-eq']
		}
	]
});