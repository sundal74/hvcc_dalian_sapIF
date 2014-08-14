Ext.define('Base.view.terminology.TerminologyList', {
	
	extend : 'Base.abstract.entity.ListGridView',
	
	xtype : 'base_terminology_list',
	
	useDetailBtn : false,
	
	selectionMode : 'SINGLE',
	
	store : 'Base.store.Terminology',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ dataIndex : 'domain_id', hidden : true },
		{ header : T('label.name'), width : 200, dataIndex : 'name', editor : {xtype : 'textfield'} },
		{ header : T('label.description'), width : 250, dataIndex : 'description', editor : {xtype : 'textfield'} },
		{ xtype : 'codecolumn', commonCode : 'LANGUAGE', tpl : '{description}', header : T('label.locale'), width : 80, dataIndex : 'locale', editor : { xtype : 'codecombo', commonCode : 'LANGUAGE' } },
		{ xtype : 'codecolumn', commonCode : 'TERMS_CATEGORY', tpl : '{description}', header : T('label.category'), width : 80, dataIndex : 'category', editor : { xtype : 'codecombo', commonCode : 'TERMS_CATEGORY' } },
		{ header : T('label.display'), width : 250, dataIndex : 'display', editor : {xtype : 'textfield'} },
		{ header : T('label.display_short'), width : 150, dataIndex : 'display_short', editor : {xtype : 'textfield'} },
		{ header : T('label.creator'), dataIndex : 'creator', xtype : 'entitycolumn' },
		{ header : T('label.created_at'), width : 130, dataIndex : 'created_at', xtype : 'datecolumn', readOnly : true, format : T('format.datetime') },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), width : 130, dataIndex : 'updated_at', xtype : 'datecolumn', readOnly : true, format : T('format.datetime') }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['inquiry', '->', 'add', 'save', 'delete']
	} ]

});