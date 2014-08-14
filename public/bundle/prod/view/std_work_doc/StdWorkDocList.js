Ext.define('Prod.view.std_work_doc.StdWorkDocList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_std_work_doc_list',
		
	store : 'Prod.store.StdWorkDoc',
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'export', 'add', 'update', 'delete']
	} ],
		
	columns : [
		{ xtype: 'actioncolumn', icon: ASSET_PATH + 'std/iconSlideshow.png', itemId : 'slideshow', width : 40, align : 'center' },
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ header : T('label.title'), dataIndex : 'name', flex : 1 },
		{ header : T('label.operation'), dataIndex : 'operation', xtype : 'entitycolumn', sortOption : { sortSeq : 10, sortDirection : 'asc' }, width : 65 },
		{ header : T('label.operation_desc'), dataIndex : 'operation', width : 160, renderer : function(val) { return val.desc; } },
		{ header : T('label.machine'), dataIndex : 'machine', xtype : 'entitycolumn', sortOption : { sortSeq : 20, sortDirection : 'asc' }, widht : 85 },
		{ header : T('label.machine_desc'), dataIndex : 'machine', width : 160, renderer : function(val) { return val.desc; } },
		{ header : T('label.file_group_id'), dataIndex : 'file_group_id', hidden : true },
		{ header : T('label.creator'), dataIndex : 'creator', xtype : 'entitycolumn' },
		{ header : T('label.created_at'), dataIndex : 'created_at', xtype : 'datecolumn', format : T('format.datetime'), width : 130 },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 130 },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	]
});