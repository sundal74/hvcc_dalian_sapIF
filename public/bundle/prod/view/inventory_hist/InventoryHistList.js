Ext.define('Prod.view.inventory_hist.InventoryHistList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_inventory_hist_list',
	
	useCheckBox : false,
		
	store : 'Prod.store.InventoryHist',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ header : T('label.operation'), dataIndex : 'store', xtype : 'entitycolumn', width : 60 },
		{ header : T('label.operation_desc'), dataIndex : 'store', width : 120, renderer : function(val) { return val.desc; } },
		{ header : T('label.machine'), dataIndex : 'machine', xtype : 'entitycolumn', width : 80 },
		{ header : T('label.machine_desc'), dataIndex : 'machine', width : 120, renderer : function(val) { return val.desc; } },
		{ header : T('label.product'), dataIndex : 'product', xtype : 'entitycolumn', width : 110 },
		{ header : T('label.product_desc'), dataIndex : 'product', width : 140, renderer : function(val) { return val.desc; } },
		{ header : T('label.inv_qty'), dataIndex : 'inv_qty', xtype : 'numbercolumn', format : T('format.number'), width : 65, align : 'right' },
		{ header : T('label.qty'), dataIndex : 'qty', xtype : 'numbercolumn', format : T('format.number'), width : 45, align : 'right' },
		{ header : T('label.action'), dataIndex : 'action_code', width : 70 },
		//{ header : T('label.lot_type'), dataIndex : 'lot_type', width : 90 },
		//{ header : T('label.lot_no'), dataIndex : 'lot_id', width : 285, renderer : function(value, meta, record, rowIndex, colIndex, store) {
		//	return HF.idToName(value);
		//} },
		{ header : T('label.description'), dataIndex : 'description', width : 120 },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 130 , sortOption : { sortSeq : 1, sortDirection : 'desc' } },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		//items: ['->', 'export', 'save', 'delete']
		items : []
	} ]
});