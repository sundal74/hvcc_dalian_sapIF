Ext.define('Prod.view.label_master.LabelMasterList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_label_master_list',
		
	store : 'Prod.store.LabelMaster',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ header : T('label.product'), dataIndex : 'product', xtype : 'entitycolumn', sortOption : { sortSeq : 10, sortDirection : 'asc' } },
		{ header : T('label.product_desc'), dataIndex : 'product', width : 180, renderer : function(val) { return val.desc; } },
		{ header : T('label.operation'), dataIndex : 'operation', xtype : 'entitycolumn', width : 65 },
		{ header : T('label.operation_desc'), dataIndex : 'operation', width : 150, renderer : function(val) { return val.desc; } },
		{ header : T('label.option'), dataIndex : 'customer', width : 60, xtype : 'entitycolumn' },
		{ header : T('label.part_no'), dataIndex : 'part_no', width : 130 },
		{ header : T('label.part_name'), dataIndex : 'part_name', width : 180 },
		{ header : T('label.pallet_qty'), dataIndex : 'pallet_qty',  width : 65, align : 'right' },
		{ header : T('label.car_type'), dataIndex : 'car_type', width : 70 },
		{ header : T('label.car_name'), dataIndex : 'car_name', width : 80 },
		{ header : T('label.ship_loc'), dataIndex : 'ship_loc', width : 70 },
		{ header : T('label.area'), dataIndex : 'area', width : 60 },
		{ header : T('label.box_no'), dataIndex : 'box_no', width : 60 },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	],

	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'update', 'delete']
	} ]
});