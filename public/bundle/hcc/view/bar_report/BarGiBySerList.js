Ext.define('Hcc.view.bar_report.BarGiBySerList', {
	
	extend : 'Base.abstract.entity.ReportGridView',
	
	xtype : 'hcc_bar_gi_by_ser_list',
	
	useCheckBox : false,
		
	store : 'Hcc.store.BarGiBySer',
	
	columns : [
		{ header : T('label.date'), dataIndex : 'whi_dt', align : 'center', width : 80 },
		{ header : T('label.part_no'), dataIndex : 'item_cd', width : 100 },
		{ header : T('label.description'), dataIndex : 'item_nm', width : 190 },
		{ header : T('label.type'), dataIndex : 'item_tp' },
		{ header : T('label.serial_no'), dataIndex : 'serial', width : 140 },
		{ header : T('label.lot_qty'), dataIndex : 'lot_size', xtype : 'numbercolumn', format : T('format.number'), width : 60, align : 'right' },
		{ header : T('label.out_qty'), dataIndex : 'lot_rqty', xtype : 'numbercolumn', format : T('format.number'), width : 65, align : 'right' },
		{ header : T('label.warehouse'), dataIndex : 'loc_cd', width : 220 },
		{ header : T('label.location'), dataIndex : 'loc_nm', width : 220 },
		{ header : 'To ' + T('label.warehouse'), dataIndex : 'outloc_cd', width : 220 },
		{ header : 'To ' + T('label.location'), dataIndex : 'outloc_nm', width : 220 }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		//items: ['->', 'export']
		items : []
	} ]
});