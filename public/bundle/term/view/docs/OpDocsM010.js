Ext.define('Term.view.docs.OpDocsM010', {
	
	extend: 'Base.abstract.Panel',

	xtype: 'term_docs_opdocsm010',
	
	title : T('menu.TmDocs'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	items: [{
		xtype: 'grid',
		flex : 1,
		scroll: true,
		
		store : 'Prod.store.StdWorkDoc',
		
		columns: [ {
			header: T('label.created_at'),
			dataIndex: 'created_at',
			align : 'center',
			format : T('format.date'),
			flex: 0.8
		}, {
			header: T('label.title'),
			dataIndex: 'name',
			flex: 1.5
		}, {
			xtype : 'entitycolumn',
			header: T('label.operation'),
			dataIndex: 'operation',
			flex: 0.7
		}, {
			xtype : 'entitycolumn',
			header: T('label.machine'),
			dataIndex: 'machine',
			flex: 1
		}/*, {
			xtype : 'entitycolumn',
			header: T('label.product'),
			dataIndex: 'product',
			flex: 1
		}*/, {
			xtype: 'actioncolumn',
			icon: 'theme/imageOPS/btnDetail.png',
			itemId : 'docs_report',
			width : 50,
			align : 'center'
		} ]
	}]
});
