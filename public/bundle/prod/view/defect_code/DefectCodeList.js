Ext.define('Prod.view.defect_code.DefectCodeList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_defect_code_list',
		
	store : 'Prod.store.DefectCode',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ header : T('label.code'), dataIndex : 'name', sortOption : { sortSeq : 20, sortDirection : 'asc' } },
		{ header : T('label.description'), dataIndex : 'description', flex : 2 },
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