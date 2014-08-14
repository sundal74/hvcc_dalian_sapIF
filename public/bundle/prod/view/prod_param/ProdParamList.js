Ext.define('Prod.view.prod_param.ProdParamList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_prod_param_list',
		
	store : 'Prod.store.ProdParam',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ header : T('label.operation'), dataIndex : 'operation', xtype : 'entitycolumn', width : 65, sortOption : { sortSeq : 10, sortDirection : 'asc' } },
		{ header : T('label.operation_desc'), dataIndex : 'operation', width : 140, renderer : function(val) { return val.desc; } },
		{ header : T('label.machine'), dataIndex : 'machine', xtype : 'entitycolumn', width : 85, sortOption : { sortSeq : 20, sortDirection : 'asc' } },
		{ header : T('label.machine_desc'), dataIndex : 'machine', width : 140, renderer : function(val) { return val.desc; } },
		{ header : T('label.product'), dataIndex : 'product', xtype : 'entitycolumn', width : 110, sortOption : { sortSeq : 30, sortDirection : 'asc' } },
		{ header : T('label.product_desc'), dataIndex : 'product', width : 160, renderer : function(val) { return val.desc; } },
		{ header : T('label.location'), dataIndex : 'location', width : 80 },
		{ header : T('label.target_uph'), dataIndex : 'target_uph', width : 80, align : 'right', renderer : Ext.util.Format.numberRenderer(T('format.precision')) },
		{ header : T('label.cycletime'), dataIndex : 'cycletime', width : 80, xtype : 'numbercolumn', format : '0.00', align : 'right' },
		{ header : T('label.creator'), dataIndex : 'creator', xtype : 'entitycolumn' },
		{ header : T('label.created_at'), dataIndex : 'created_at', xtype : 'datecolumn', format : T('format.datetime'), width : 130 },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 130 },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	],
     
	 dockedItems: [ {
	 	xtype: 'controlbar',
	 	items: ['->', 'import', 'export', 'update', 'delete']
	 } ]
});