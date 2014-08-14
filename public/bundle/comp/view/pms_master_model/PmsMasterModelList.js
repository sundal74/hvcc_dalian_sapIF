Ext.define('Comp.view.pms_master_model.PmsMasterModelList', {
	
	extend : 'Base.abstract.entity.ListGridView',
	
	xtype : 'comp_pms_master_model_list',
		
	store : 'Comp.store.PmsMasterModel',
	
	useDetailBtn : false,
	
	selectionMode : 'SINGLE',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ header : T('label.operation'), dataIndex : 'routing' },
		{ header : T('label.p_code'), dataIndex : 'p_code', align : 'center', sortOption : { sortSeq : 10, sortDirection : 'asc' } },
		{ header : T('label.product'), dataIndex : 'model_no', width : 120 },
		{ header : T('label.product_desc'), width : 250, dataIndex : 'model_name' },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 140 },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'update']
	} ]
});