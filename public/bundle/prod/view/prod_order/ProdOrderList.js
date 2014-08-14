Ext.define('Prod.view.prod_order.ProdOrderList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_prod_order_list',
	
	useDetailBtn : false,
		
	store : 'Prod.store.ProdOrder',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ xtype : 'codecolumn', header : T('label.shift'), dataIndex : 'shift', width : 45, tpl : '{description}', commonCode : 'SHIFT', align : 'center', sortOption : { sortSeq : 10, sortDirection : 'asc' } },
		{ header : T('label.wc'), dataIndex : 'workcenter', xtype : 'entitycolumn', width : 45, sortOption : { sortSeq : 10, sortDirection : 'asc' } },
		{ header : T('label.operation'), dataIndex : 'operation', xtype : 'entitycolumn', width : 60, sortOption : { sortSeq : 20, sortDirection : 'asc' } },
		{ header : T('label.operation_desc'), dataIndex : 'operation', width : 140, renderer : function(val) { return val.desc; } },
		{ header : T('label.machine'), dataIndex : 'machine', xtype : 'entitycolumn', width : 75, sortOption : { sortSeq : 40, sortDirection : 'asc' } },
		{ header : T('label.machine_desc'), dataIndex : 'machine', width : 110, renderer : function(val) { return val.desc; } },
		{ header : T('label.order_seq'), dataIndex : 'order_seq', width : 55, align : 'right', sortOption : { sortSeq : 30, sortDirection : 'asc' } },
		{ header : T('label.product'), dataIndex : 'product', xtype : 'entitycolumn' },
		// { header : T('label.option'), dataIndex : 'customer', width : 75, xtype : 'entitycolumn' },
		{ header : T('label.product_desc', {x : T('label.product')}), dataIndex : 'product', width : 160, renderer : function(val) { return val.desc; } },
		{ header : T('label.plan_qty'), dataIndex : 'order_qty', xtype : 'numbercolumn', align : 'right', format : T('format.number'), width : 50 },
		{ header : T('label.pallet_qty'), dataIndex : 'pallet_qty', xtype : 'numbercolumn', align : 'right', format : T('format.number'), width : 60 },
		{ header : T('label.uph'), dataIndex : 'uph', align : 'right', width : 55, xtype : 'numbercolumn', format : '0.0' },
		{ header : T('label.cycletime'), dataIndex : 'cycletime', align : 'right', width : 70, xtype : 'numbercolumn', format : '0.0' },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'export', 'add', 'update']
	} ]
});