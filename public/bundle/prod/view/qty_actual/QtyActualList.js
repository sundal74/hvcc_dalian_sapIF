Ext.define('Prod.view.qty_actual.QtyActualList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_qty_actual_list',
	
	useCheckBox : false,
		
	store : 'Prod.store.QtyActual',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ xtype : 'codecolumn', header : T('label.shift'), dataIndex : 'shift', tpl : '{description}', commonCode : 'SHIFT', width : 45, align : 'center' },
		{ header : T('label.operation'), dataIndex : 'operation', xtype : 'entitycolumn', width : 65 },
		{ header : T('label.operation_desc'), dataIndex : 'operation', width : 140, renderer : function(val) { return val.desc; } },
		{ header : T('label.machine'), dataIndex : 'machine', xtype : 'entitycolumn', width : 75 },
		{ header : T('label.machine_desc'), dataIndex : 'machine', width : 110, renderer : function(val) { return val.desc; } },
		{ header : T('label.product'), dataIndex : 'product', xtype : 'entitycolumn', width : 110 },
		{ header : T('label.product_desc', {x : T('label.product')}), dataIndex : 'product', width : 160, renderer : function(val) { return val.desc; } },
		{ header : T('label.actual'), dataIndex : 'actual_qty', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 65 },
		{ header : T('label.description'), dataIndex : 'description', width : 150 },
		{ header : T('label.input_time'), dataIndex : 'created_at', align : 'center', width : 130 },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		//items: ['->', 'export']
		items : ['->']
	} ],
});