Ext.define('Prod.view.lot.LotList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_lot_list',
	
	useCheckBox : false,
		
	store : 'Prod.store.Lot',
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'export']
	} ],
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ header : T('label.shift'), dataIndex : 'shift', width : 55, align : 'center', xtype : 'codecolumn', commonCode : 'SHIFT', tpl : '{description}' },
		{ header : T('label.label_no'), dataIndex : 'name', width : 200 },
		{ header : T('label.product'), dataIndex : 'product', xtype : 'entitycolumn' },
		{ header : T('label.operation'), dataIndex : 'operation', xtype : 'entitycolumn', width : 65 },
		{ header : T('label.operation_desc'), dataIndex : 'operation', width : 160, renderer : function(val) { return val.desc; } },
		{ header : T('label.machine'), dataIndex : 'machine', xtype : 'entitycolumn', width : 85 },
		{ header : T('label.machine_desc'), dataIndex : 'machine', width : 160, renderer : function(val) { return val.desc; } },
		{ header : T('label.lot_no'), dataIndex : 'lot_no', width : 70 },
		{ header : T('label.serial_no'), dataIndex : 'serial_no', width : 70 },
		{ header : T('label.lot_qty'), dataIndex : 'actual_qty', width : 60, align : 'right' },
		{ header : T('label.scan_time'), dataIndex : 'tran_time', xtype : 'datecolumn', format : T('format.datetime'), width : 150, align : 'center', sortOption : { sortSeq : 10, sortDirection : 'desc' } },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	]
});