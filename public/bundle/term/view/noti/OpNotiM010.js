Ext.define('Term.view.noti.OpNotiM010', {
	
	extend: 'Base.abstract.Panel',

	xtype: 'term_noti_opnotim010',
	
	title : T('title.notice'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	items: [{
		xtype: 'grid',
		flex : 1,
		scroll: true,
		store: Ext.create('Ext.data.Store', {
			fields: [{
				name: 'work_date'
			}, {
				name: 'operation'
			}, {
				name: 'created_at'
			}, {
				name: 'msg'
			}, {
				name: 'id'
			}, {
				name: 'operation_id'
			}],
			proxy: {
				type : 'ajax',
				url : '/domains/' + login.current_domain_id + '/diy_services/ListNotices/query.json',
				format : 'json',
				reader : {
					type : 'json'
				}
			}
		}),
		columns: [ {
			xtype: 'datecolumn',
			header: T('label.work_date'),
			dataIndex: 'work_date',
			format : T('format.date'),
			align : 'center',
			width : 140
		}, {
			xtype: 'datecolumn',
			header: T('label.time'),
			dataIndex: 'created_at',
			format : T('format.time'),
			align : 'center',
			width : 140
		}, {
			header: T('label.operation'),
			dataIndex: 'operation',
			width : 120
		}, {
			header: T('label.message'),
			dataIndex: 'msg',
			flex: 2
		}, {
			xtype: 'actioncolumn',
			icon: 'theme/imageOPS/btnDetail.png',
			itemId : 'noti_report',
			align : 'center',
			width : 65
		}]
	}]
});
