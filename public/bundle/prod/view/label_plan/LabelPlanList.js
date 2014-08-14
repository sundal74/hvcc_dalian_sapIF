Ext.define('Prod.view.label_plan.LabelPlanList', {
	
	extend : 'Base.abstract.entity.ListGridView',
	
	xtype : 'prod_label_plan_list',
		
	store : 'Prod.store.LabelPlan',
	
	useDetailBtn : false,
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
  		{ xtype : 'codecolumn', header : T('label.shift'), dataIndex : 'shift', width : 55, tpl : '{description}', commonCode : 'SHIFT', align : 'center', sortOption : { sortSeq : 10, sortDirection : 'asc' } },
		{ header : T('label.operation'), dataIndex : 'operation', width : 70, xtype : 'entitycolumn', sortOption : { sortSeq :20, sortDirection : 'asc' } },
		{ header : T('label.operation_desc'), dataIndex : 'operation', width : 130, renderer : function(val) { return val.desc; } },
		{ header : T('label.product'), dataIndex : 'product', xtype : 'entitycolumn', width : 110, sortOption : { sortSeq : 20, sortDirection : 'asc' } },
		{ header : T('label.product_desc'), dataIndex : 'product', width : 180, renderer : function(val) { return val.desc; } },
		// { header : T('label.option'), dataIndex : 'customer', xtype : 'entitycolumn' },
		{ header : T('label.plan_qty'), dataIndex : 'order_qty', width : 70, align : 'right', xtype : 'numbercolumn', format : T('format.number') },
		{ header : T('label.lot_qty'), dataIndex : 'lot_qty', width : 70, align : 'right' },
		{ header : T('label.print_qty'), dataIndex : 'print_qty', width : 70, align : 'right' },
		{ header : T('label.printed_qty'), dataIndex : 'printed_qty', width : 80, align : 'right' },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['reprint', 'add', 'update', '->', 'print', 'stop', 'print_test', 'test']
	} ],
	
	listeners : {
		afterrender : function(comp, eOpts) {
			comp.down('controlbar').down('#stop').disable();
		}
	}
});