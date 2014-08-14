Ext.define('Prod.view.defect.DefectList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_defect_list',
	
	useCheckBox : false,
		
	store : 'Prod.store.Defect',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ xtype : 'codecolumn', header : T('label.shift'), width : 50, dataIndex : 'shift', tpl : '{description}', commonCode : 'SHIFT', align : 'center' },
		{ header : T('label.operation'), dataIndex : 'operation', xtype : 'entitycolumn', width : 65 },
		{ header : T('label.operation_desc'), dataIndex : 'operation', width : 150, renderer : function(val) { return val.desc; } },
		{ header : T('label.machine'), dataIndex : 'machine', xtype : 'entitycolumn', width : 85 , sortOption : { sortSeq : 50, sortDirection : 'asc' } },
		{ header : T('label.machine_desc'), dataIndex : 'machine', width : 150, renderer : function(val) { return val.desc; } },
		{ header : T('label.product'), dataIndex : 'product', xtype : 'entitycolumn' },
		{ header : T('label.product_desc'), dataIndex : 'product', width : 150, renderer : function(val) { return val.desc; } },
		// { header : T('label.child_product'), dataIndex : 'child_product', xtype : 'entitycolumn' },
		{ header : T('label.defect_code'), dataIndex : 'defect_code', xtype : 'entitycolumn', width : 80 },
		{ header : T('label.x_desc', {x : T('label.defect')}), dataIndex : 'defect_code', width : 100, renderer : function(val) { return val.desc; } },
		{ header : T('label.defect_qty'), dataIndex : 'defect_qty', width : 75, align : 'right' },
		{ header : T('label.comment'), dataIndex : 'description', width : 150 },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' },
		{ header : T('label.created_at'), dataIndex : 'created_at', xtype : 'datecolumn', format : T('format.datetime'), width : 130, sortOption : { sortSeq : 10, sortDirection : 'desc' } },
	],

	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'export']
	} ]
});