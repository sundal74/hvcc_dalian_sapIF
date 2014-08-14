Ext.define('Prod.view.spc_item.SpcItemList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_spc_item_list',
	
	useDetailBtn : false,
		
	store : 'Prod.store.SpcItem',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ header : T('label.code'), dataIndex : 'name', width : 150 , sortOption : { sortSeq : 20, sortDirection : 'asc' } },
		{ header : T('label.operation'), dataIndex : 'operation', xtype : 'entitycolumn', width : 65 , sortOption : { sortSeq : 10, sortDirection : 'asc' } },
		{ header : T('label.operation_desc', {x : T('label.operation')}), width : 160, dataIndex : 'operation', renderer : function(val) { return val.desc; } },
		{ header : T('label.description'), dataIndex : 'description', width : 150 },
		{ header : T('label.x_usl'), dataIndex : 'x_usl', width : 80, align : 'right' },
		{ header : T('label.x_lsl'), dataIndex : 'x_lsl', width : 80, align : 'right' },
		{ header : T('label.r_usl'), dataIndex : 'r_usl', width : 80, align : 'right' },
		{ header : T('label.r_lsl'), dataIndex : 'r_lsl', width : 80, align : 'right' },
		{ header : T('label.creator'), dataIndex : 'creator', xtype : 'entitycolumn' },
		{ header : T('label.created_at'), dataIndex : 'created_at', xtype : 'datecolumn', format : T('format.datetime'), width : 130 },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 130 },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'export', 'add', 'update', 'delete']
	} ]
});