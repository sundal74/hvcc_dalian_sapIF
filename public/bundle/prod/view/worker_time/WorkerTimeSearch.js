Ext.define('Prod.view.worker_time.WorkerTimeSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_worker_time_search',
		
	items : [
		{ fieldLabel : T('label.work_date'), name : 'work_date-eq', xtype : 'datefield', format : T('format.date'), submitFormat : T('format.submitDate') },
		{ fieldLabel : T('label.shift'), name : 'shift-eq', xtype : 'codecombo', commonCode : 'SHIFT', displayField : 'description' },
		{ 
			fieldLabel : T('label.wc'), 
			name : 'workcenter.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Workcenter'
		},
		{ 
			fieldLabel : T('label.operation'), 
			name : 'operation.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Operation',
			associationField : ['workcenter.name-eq']
		},
		{ 
			fieldLabel : T('label.machine'), 
			name : 'machine.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Machine',
			associationField:['operation.name-eq']
		},
		{
			fieldLabel : T('label.x_id', {x : T('label.operator')}), 
			name : 'user_id-like',
			xtype : 'textfield',			
		}/*,
		{
			fieldLabel : T('label.operator'), 
			name : 'user_id',
			xtype : 'entitycombo',
			storeClass : 'Base.store.User',
			allowBlank : false
		},
		{ 
			fieldLabel : T('label.operator'), 
			name : 'user_id-eq',
			submitSuffix : '', 
			xtype : 'entityfield',
			pickerConfig : {
				column_1_data_index : 'id',
				column_1_empty_text : T('label.login'),
				column_2_data_index : 'name',
				column_2_empty_text : T('label.name')
			},
			storeClass: 'Base.store.User'
		}*/
	]
	
});