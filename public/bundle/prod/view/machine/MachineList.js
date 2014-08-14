Ext.define('Prod.view.machine.MachineList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_machine_list',
		
	store : 'Prod.store.Machine',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ header : T('label.code'), dataIndex : 'name', width : 85, sortOption : { sortSeq : 10, sortDirection : 'asc' } },
		{ header : T('label.description'), dataIndex : 'description', width : 150 },
		{ header : T('label.operation'), dataIndex : 'operation', xtype : 'entitycolumn', width : 65 },
		{ header : T('label.operation_desc'), dataIndex : 'operation', width : 150, renderer : function(val) { return val.desc; } },
		{ header : T('label.uph'), dataIndex : 'uph', align : 'right', width : 60 },
		{ header : T('label.cycletime'), dataIndex : 'cycletime', xtype : 'numbercolumn', format : '0.00', width : 75, align : 'right' },
		{ header : T('label.main_op_flag'), dataIndex : 'main_op_flag', xtype : 'checkcolumn', width : 80 },
		{ header : T('label.main_mc_flag'), dataIndex : 'main_mc_flag', xtype : 'checkcolumn', width : 80 },
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