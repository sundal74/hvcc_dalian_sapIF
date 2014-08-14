Ext.define('Prod.view.label_model.LabelModelList', {
	
	extend : 'Base.abstract.entity.ListGridView',
	
	xtype : 'prod_label_model_list',
		
	store : 'Prod.store.LabelModel',
	
	useDetailBtn : false,
	
	selectionMode : 'SINGLE',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ header : T('label.name'), dataIndex : 'name' , flex : 1, sortOption : { sortSeq : 10, sortDirection : 'asc' } },
		{ header : T('label.description'), dataIndex : 'description', flex : 2 },
		{ xtype : 'codecolumn', header : T('label.dept_type'), flex : 1, dataIndex : 'dept_type', tpl : '{description}', commonCode : 'DEPT_TYPE', align : 'center' },
		{ header : T('label.active_flag'), dataIndex : 'active_flag', xtype : 'checkcolumn', flex : 0.5 },
		{ header : T('label.creator'), dataIndex : 'creator', xtype : 'entitycolumn' },
		{ header : T('label.created_at'), dataIndex : 'created_at', xtype : 'datecolumn', readOnly : true, format : T('format.datetime'), width : 130 },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', readOnly : true, format : T('format.datetime'), width : 130 },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'add', 'update', 'delete']
	} ]
});