Ext.define('Comp.view.pms_spc_alarm.PmsSpcAlarmSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'comp_pms_spc_alarm_search',
		
	items : [
		{ 
			fieldLabel : T('label.work_date'), 
			name : 'prd_date-eq', 
			xtype : 'datefield', 
			format : T('format.date'), 
			submitFormat : 'Ymd'
		},
		{ 
			fieldLabel : T('label.type'), 
			name : 'alarm_type-eq', 
			xtype : 'codecombo', 
			commonCode : 'SPC_ALARM', 
			displayField : 'description' 
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
			fieldLabel : T('label.station'), 
			name : 'st_no-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			customSelectionUrl : '/domains/' + login.current_domain_id + '/diy_selections/SelectStation/query.json',
			associationField : ['routing-eq']
		},
		{
			fieldLabel : T('label.item_no'), 
			name : 'item_no-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			customSelectionUrl : '/domains/' + login.current_domain_id + '/diy_selections/SelectPmsSpcItem/query.json',
			associationField : ['routing-eq', 'st_no-eq']
		}
	]
	
});