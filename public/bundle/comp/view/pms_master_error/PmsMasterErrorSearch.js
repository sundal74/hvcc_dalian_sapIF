Ext.define('Comp.view.pms_master_error.PmsMasterErrorSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'comp_pms_master_error_search',
		
	items : [ {
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
			fieldLabel : T('label.st_no'), 
			name : 'st_no-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			customSelectionUrl : '/domains/' + login.current_domain_id + '/diy_selections/SelectStation/query.json'
		},
		{ fieldLabel : T('label.err_code'), name : 'err_code-like' },
		{ fieldLabel : T('label.err_name'), name : 'err_name-like' }
	]
	
});