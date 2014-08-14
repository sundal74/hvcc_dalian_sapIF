Ext.define('Comp.view.pms_master_error.PmsMasterErrorList', {
	
	extend : 'Base.abstract.entity.ListGridView',
	
	xtype : 'comp_pms_master_error_list',
		
	store : 'Comp.store.PmsMasterError',
	
	useDetailBtn : false,
	
	selectionMode : 'SINGLE',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ header : T('label.operation'), dataIndex : 'routing' },
		{ header : T('label.st_no'), dataIndex : 'st_no', align : 'center' , sortOption : { sortSeq : 10, sortDirection : 'asc' } },
		{ header : T('label.err_code'), dataIndex : 'err_code', align : 'center' , sortOption : { sortSeq : 20, sortDirection : 'asc' } },
		{ header : T('label.err_name'), dataIndex : 'err_name', width : 200 },
		// { header : T('label.err_type'), dataIndex : 'err_type' },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 140 },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'update']
	} ]
});