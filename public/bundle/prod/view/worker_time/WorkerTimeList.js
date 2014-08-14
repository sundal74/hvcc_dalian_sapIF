Ext.define('Prod.view.worker_time.WorkerTimeList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_worker_time_list',
		
	store : 'Prod.store.WorkerTime',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ xtype : 'codecolumn', header : T('label.shift'), dataIndex : 'shift', width : 50, tpl : '{description}', commonCode : 'SHIFT', align : 'center', sortOption : { sortSeq : 10, sortDirection : 'asc' } },
		{ header : T('label.operation'), dataIndex : 'operation', xtype : 'entitycolumn', width : 60 , sortOption : { sortSeq : 20, sortDirection : 'asc' } },
		{ header : T('label.operation_desc'), dataIndex : 'operation', width : 150, renderer : function(val) { return val.desc; } },
		{ header : T('label.machine'), dataIndex : 'machine', xtype : 'entitycolumn', width : 75 , sortOption : { sortSeq : 30, sortDirection : 'asc' } },
		{ header : T('label.machine_desc'), dataIndex : 'machine', width : 120, renderer : function(val) { return val.desc; } },
		{ header : T('label.product'), dataIndex : 'product', xtype : 'entitycolumn', width : 105 },
		{ header : T('label.product_desc'), dataIndex : 'product', width : 150, renderer : function(val) { return val.desc; } },
		{ header : T('label.x_id', {x : T('label.operator')}), dataIndex : 'user_id', width : 80 },
		{ header : T('label.x_name', {x : T('label.operator')}), dataIndex : 'user', renderer : function(val) { return val.name; } },
		{ header : T('label.start_time'), dataIndex : 'start_time', width : 70, align: 'center', xtype : 'datecolumn', format : T('format.time_without_sec'), align : 'center', sortOption : { sortSeq : 50, sortDirection : 'asc' } },
		{ header : T('label.end_time'), dataIndex : 'end_time', width : 70, align: 'center', xtype : 'datecolumn', format : T('format.time_without_sec'), align : 'center' },
		// { header : T('label.work_term'), dataIndex : 'work_term', xtype : 'numbercolumn', align : 'right', format : T('format.number') },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'export', 'update', 'delete']
	} ],
});