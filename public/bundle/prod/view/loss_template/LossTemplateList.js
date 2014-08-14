Ext.define('Prod.view.loss_template.LossTemplateList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_loss_template_list',
		
	store : 'Prod.store.LossTemplate',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{
			xtype : 'codecolumn',
			header : T('label.week_day'),
			dataIndex : 'week_day',
			align : 'center',
			commonCode : 'DAY_OF_WEEK',
			tpl : "{[T('label.' + ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][values.name-1])]}",
			editor : { xtype : 'codecombo', commonCode : 'DAY_OF_WEEK', displayField : 'description' }, 
			sortOption : { sortSeq : 10, sortDirection : 'asc' }
		},
		{ header : T('label.start_time'), dataIndex : 'start_time', align : 'center', sortOption : { sortSeq : 20, sortDirection : 'asc' } },
		{ header : T('label.end_time'), dataIndex : 'end_time', align : 'center' },
		{ header : T('label.loss_term'), dataIndex : 'loss_term', align : 'right' },
		{ header : T('title.loss_code'), dataIndex : 'loss_code', align : 'center', xtype : 'entitycolumn' },
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