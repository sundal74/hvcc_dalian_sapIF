Ext.define('Comp.view.pms_master_item.PmsMasterItemList', {
	
	extend : 'Base.abstract.entity.ListGridView',
	
	xtype : 'comp_pms_master_item_list',
		
	store : 'Comp.store.PmsMasterItem',
	
	useDetailBtn : false,
	
	selectionMode : 'SINGLE',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ header : T('label.operation'), dataIndex : 'routing', width : 65, sortOption : { sortSeq : 10, sortDirection : 'asc' } },
		{ header : T('label.station'), dataIndex : 'st_no', width : 55, align : 'center', sortOption : { sortSeq : 20, sortDirection : 'asc' } },
		{ header : 'St. Seq', dataIndex : 'st_seq_no', width : 55, align : 'right' },
		{ header : T('label.item_no'), dataIndex : 'item_no', width : 90 },
		{ header : T('label.item_name'), dataIndex : 'item_name', width : 200 },
		// { header : 'Item Order', dataIndex : 'item_order', width : 72, align : 'right' },
		{ header : T('label.x_usl'), dataIndex : 'x_usl', width : 70, align : 'right' },
		{ header : T('label.x_lsl'), dataIndex : 'x_lsl', width : 70, align : 'right' },
		{ header : T('label.r_usl'), dataIndex : 'r_usl', width : 70, align : 'right' },
		{ header : T('label.r_lsl'), dataIndex : 'r_lsl', width : 70, align : 'right' },
		// { header : 'Length', dataIndex : 'len', width : 55, align : 'right' },
		// { header : 'Precision', dataIndex : 'point_under_len', width : 65, align : 'right' },
		// { header : 'Monitor', dataIndex : 'monitor_flg', align : 'center', width : 60, renderer : function(val) { return val == true ? "Y" : "N"; } },
		{ header : T('label.monitor'), dataIndex : 'monitor_flg', xtype : 'checkcolumn', width : 60 },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 140 },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'update']
	} ]
});