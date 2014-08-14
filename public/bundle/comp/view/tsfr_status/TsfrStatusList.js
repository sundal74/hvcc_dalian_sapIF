Ext.define('Comp.view.tsfr_status.TsfrStatusList', {
	
	extend : 'Base.abstract.entity.ReportGridView',
	
	xtype : 'comp_tsfr_status_list',
		
	store : 'Comp.store.TsfrStatus',
	
	useCheckBox : false,
	
	features: [ {
		ftype: 'groupingsummary',
		groupHeaderTpl: 'ROUTING : {name}'
	} ],
		
	columns : [
		{ header : T('label.operation'), dataIndex : 'routing', width : 80 },
		{ header : T('label.st_no'), dataIndex : 'st_no' },
		{ header : T('label.st_name'), dataIndex : 'st_name', width : 250 },
		{ header : T('label.total'), dataIndex : 'total', xtype : 'numbercolumn', format : T('format.number'), align : 'right' },
		{ header : T('label.first'), dataIndex : 'first', xtype : 'numbercolumn', format : T('format.number'), align : 'right' },
		{ header : T('label.reject'), dataIndex : 'reject', xtype : 'numbercolumn', format : T('format.number'), align : 'right' },
		{ header : T('label.target'), dataIndex : 'target_ftt', xtype : 'numbercolumn', format : T('format.number'), align : 'right' },
		{ header : T('label.rate') + '(%)', dataIndex : 'actual_ftt', xtype : 'numbercolumn', format : T('format.number'), align : 'right' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'export']
	} ]
});