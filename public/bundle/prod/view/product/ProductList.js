Ext.define('Prod.view.product.ProductList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_product_list',
		
	store : 'Prod.store.Product',
	
	columns : [ /*{ 
			header : T('title.bom'),
			xtype : 'actioncolumn',
			width : 50,
			align : 'center', 
			itemId : 'go_bom',
			items: [{
				icon: 'theme/image/saved.png',
				tooltip: T('title.bom')
			}]	
		},*/
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ header : T('label.code'), dataIndex : 'name', width : 115, sortOption : { sortSeq : 10, sortDirection : 'asc' } },
		{ header : T('label.description'), dataIndex : 'description', width : 200 },
		{ xtype : 'codecolumn', commonCode : 'PROD_TYPE', tpl : '{description}', header : T('label.prod_type'), dataIndex : 'prod_type', width : 95 },
		{ header : T('label.unit'), dataIndex : 'unit', width : 50, align : 'center', xtype : 'codecolumn', commonCode : 'UNIT_TYPE' },
		{ header : T('label.lot_qty'), dataIndex : 'default_qty', xtype : 'numbercolumn', format : T('format.number'), width : 70, align : 'right' },
		// { header : T('label.pack_type'), dataIndex : 'pack_type', width : 70 },
		{ header : T('label.short_name'), dataIndex : 'short_name', width : 120 },
		{ header : T('label.model_no'), dataIndex : 'model_no', width : 75 },
		{ header : T('title.customer'), dataIndex : 'cust_code', width : 80 },
		{ header : T('label.cust_part_no'), dataIndex : 'cust_part_no', width : 120 },
		{ header : T('label.cust_part_name'), dataIndex : 'cust_part_name', width : 140 },
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