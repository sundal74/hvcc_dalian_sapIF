Ext.define('Prod.view.raw_material.RawMaterialList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_raw_material_list',
		
	store : 'Prod.store.RawMaterial',
	
	columns : [ 
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ header : T('label.code'), dataIndex : 'name' },
		{ header : T('label.description'), dataIndex : 'description', width : 250 },
		{ header : T('label.unit'), dataIndex : 'unit', width : 50, align : 'center', xtype : 'codecolumn', commonCode : 'UNIT_TYPE' },
		{ header : T('label.lot_qty'), dataIndex : 'default_qty', xtype : 'numbercolumn', format : T('format.number'), width : 70, align : 'right' },
		{ header : T('label.location'), dataIndex : 'loc_cd', width : 70 },
		{ header : T('label.operation'), dataIndex : 'routing', width : 70 },
		{ header : 'BaseLocation', dataIndex : 'baseloc_cd' },
		{ header : 'Inspection?', dataIndex : 'qc_fg', width : 80, align : 'center' },
		{ header : 'Use?', dataIndex : 'use_yn', width : 60, align : 'center' },
		{ header : 'Label Print?', dataIndex : 'label_print_fg', width : 85, align : 'center' },
		{ header : T('label.creator'), dataIndex : 'creator', xtype : 'entitycolumn' },
		{ header : T('label.created_at'), dataIndex : 'created_at', xtype : 'datecolumn', format : T('format.datetime'), width : 130 },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 130 },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	],

	dockedItems: [ {
		xtype: 'controlbar',
		items: ['inquiry', '->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});