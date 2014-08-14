Ext.define('Comp.view.pms_master_item.PmsMasterItemSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'comp_pms_master_item_search',
		
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
		{ fieldLabel : T('label.item_no'), name : 'item_no-like' },
		{ fieldLabel : T('label.item_name'), name : 'item_name-like' }
	]
	
});