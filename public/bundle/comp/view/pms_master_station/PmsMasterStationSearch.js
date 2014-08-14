Ext.define('Comp.view.pms_master_station.PmsMasterStationSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'comp_pms_master_station_search',
		
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
		/*{ 
			fieldLabel : T('label.machine'), 
			name : 'equipment-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Machine',
			associationField : ['routing-eq']
		},*/
		{ 
			fieldLabel : T('label.st_no'), 
			name : 'st_no-like'
		},
		{ 
			fieldLabel : T('label.st_name'), 
			name : 'name-like' 
		} ]
	
});