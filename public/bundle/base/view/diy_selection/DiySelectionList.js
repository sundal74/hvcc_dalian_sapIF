Ext.define('Base.view.diy_selection.DiySelectionList', {
	
	extend : 'Base.abstract.entity.ListGridView',
	
	xtype : 'base_diy_selection_list',
		
	store : 'Base.store.DiySelection',
	
	columns : [
		{ dataIndex : '_cud_flag_', hidden : true,  value : '' },
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ dataIndex : 'domain_id',  hidden : true },
		{ header : T('label.name'), dataIndex : 'name', flex: 1, allowBlank : false, editor : { xtype : 'textfield' } },
		{ header : T('label.description'), dataIndex : 'description', flex : 2, editor : { xtype : 'textfield' } },
		{ header : T('label.script_type'), dataIndex : 'script_type', allowBlank : false, editor : { xtype : 'codecombo', commonCode : 'SCRIPT_TYPE' } },
		{ header : T('label.view_type'), dataIndex : 'view_type', editor : { xtype : 'codecombo', commonCode : 'VIEW_TYPE' } },
		// { header : T('label.pagination_flag'), dataIndex : 'pagination_flag', xtype: 'checkcolumn' },
		// { header : T('label.creator'), dataIndex : 'creator', xtype : 'entitycolumn' },
		// { header : T('label.created_at'), width : 130, dataIndex : 'created_at', xtype : 'datecolumn', format : T('format.datetime') },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), width : 130, dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime') }
	]

});