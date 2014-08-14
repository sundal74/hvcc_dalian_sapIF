Ext.define('Base.view.diy_service.DiyServiceList', {
	
	extend : 'Base.abstract.entity.ListGridView',
	
	xtype : 'base_diy_service_list',
		
	store : 'Base.store.DiyService',
	
	columns : [
		{ dataIndex : '_cud_flag_', hidden : true,  value : '' },
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ dataIndex : 'domain_id',  hidden : true },
		{ header : T('label.name'), dataIndex : 'name', flex : 1.2, editor : { xtype : 'textfield', allowBlank : false } },
		{ header : T('label.description'), dataIndex : 'description', flex : 2, editor : { xtype : 'textfield', allowBlank : true } },
		{ header : T('label.script_type'), dataIndex : 'script_type', editor : { xtype : 'codecombo', commonCode : 'SCRIPT_TYPE' } },
		{ header : T('label.active_flag'), dataIndex : 'active_flag', flex : 0.5, xtype : 'checkcolumn' },
		{ header : T('label.atomic_flag'), dataIndex : 'atomic_flag', flex : 0.5, xtype : 'checkcolumn' },
		// { header : T('label.collection_tag'), dataIndex : 'collection_tag', editor : { xtype : 'textfield' } },
		// { header : T('label.member_tag'), dataIndex : 'member_tag', editor : { xtype : 'textfield' } },
		// { header : T('label.show_params_flag'), dataIndex : 'show_params_flag', xtype : 'checkcolumn' },
		// { header : T('label.creator'), dataIndex : 'creator', xtype : 'entitycolumn' },
		// { header : T('label.created_at'), width : 120, dataIndex : 'created_at', xtype : 'datecolumn', format : T('format.datetime') },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn', flex : 0.5 },
		{ header : T('label.updated_at'), flex : 1, dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime') }
	]

});