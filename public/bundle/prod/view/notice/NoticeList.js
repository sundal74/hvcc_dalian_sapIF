Ext.define('Prod.view.notice.NoticeList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_notice_list',
		
	store : 'Prod.store.Notice',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ header : T('label.work_date'), dataIndex : 'work_date', xtype : 'datecolumn', format : T('format.date'), sortOption : { sortSeq : 10, sortDirection : 'desc' }, width : 80, align : 'center' },
		{ header : T('label.operation'), dataIndex : 'operation', xtype : 'entitycolumn', width : 65 },
		{ header : T('label.operation_desc'), dataIndex : 'operation', width : 160, renderer : function(val) { return val.desc; } },
		{ header : T('label.message'), dataIndex : 'msg', flex : 1 },
		{ header : T('label.creator'), dataIndex : 'creator', xtype : 'entitycolumn' },
		{ header : T('label.created_at'), dataIndex : 'created_at', xtype : 'datecolumn', format : T('format.datetime'), width : 130 },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 130 },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'update', 'delete']
	} ]
});