Ext.define('Comp.view.prod_hist.ProdHistList', {
	
	extend : 'Base.abstract.entity.ReportGridView',
	
	xtype : 'comp_prod_hist_list',
	
	useCheckBox : false,
		
	store : 'Comp.store.ProdHist',
	
	columns : [
		{ header : T('label.work_date'), dataIndex : 'work_date', xtype : 'datecolumn', format : T('format.date'), width : 85, align : 'center' },
		{ header : T('label.operation'), dataIndex : 'routing', flex : 1 },
		{ header : T('label.int_no'), dataIndex : 'int_no', flex : 2 },
		{ header : T('label.ser_no'), dataIndex : 'ser_no', flex : 1 },
		{ header : T('label.created_at'), dataIndex : 'created_at', xtype : 'datecolumn', format : T('format.datetime'), flex : 2, align : 'center' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: []
	} ]
});