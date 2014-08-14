Ext.define('Prod.view.operation.OperationList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_operation_list',
		
	store : 'Prod.store.Operation',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ header : T('label.code'), dataIndex : 'name', width : 60, sortOption : { sortSeq : 20, sortDirection : 'asc' } },
		{ header : T('label.description'), dataIndex : 'description', width : 160 },
		{ header : T('label.wc'), dataIndex : 'workcenter', xtype : 'entitycolumn', width : 50, sortOption : { sortSeq : 10, sortDirection : 'asc' } },
		{ header : T('label.op_seq'), dataIndex : 'op_seq', align : 'right', width : 50, sortOption : { sortSeq : 30, sortDirection : 'asc' } },
		{ header : T('label.dept_type'), dataIndex : 'dept_type', xtype : 'codecolumn', width : 80, tpl : '{description}', commonCode : 'DEPT_TYPE' },
		{ header : T('label.op_type'), dataIndex : 'op_type', xtype : 'codecolumn', width : 70, tpl : '{description}', commonCode : 'OP_TYPE' },
		{ header : T('label.main_op_flag'), dataIndex : 'main_op_flag' , xtype : 'checkcolumn', width : 80, locked : false },
		{ header : T('label.inv_flag'), dataIndex : 'inv_flag' , xtype : 'checkcolumn', width : 55 },
		{ header : T('label.track_rm_store'), dataIndex : 'track_rm_store', width : 80, xtype : 'entitycolumn' },
		//{ header : T('label.rm_input_flag'), dataIndex : 'rm_input_flag' , xtype : 'checkcolumn', width : 80 },
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