Ext.define('Hcc.view.spc_chart.SpcChartSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'hcc_spc_chart_search',
		
	items : [
		{ xtype: 'daterange', fieldLabel: T('label.work_date'), name: 'work_date' },
		{ 
			fieldLabel : T('label.item'), 
			name : 'spc_item', 
			storeClass : 'Prod.store.SpcItem', 
			xtype: 'entityfield',
			pickerConfig : {
				column_1_data_index : 'name',
				column_1_empty_text : T('label.name'),
				column_2_data_index : 'operation_name',
				column_2_empty_text : T('label.operation')
			},
			associationField : ['operation.name-eq'] 
		}
	]
});