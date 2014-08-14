Ext.define('Hcc.view.m_h_summary.UserDetailPopup', {
	
	extend : 'Base.abstract.Popup',
	
	xtype : 'hcc_m_h_summary_user_detail_popup',
	
	title : T('menu.MHSummary2'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	height : 400,
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'close']
	} ],

	record : null,
	
	items: [{
		xtype : 'grid',
		
		flex : 1,
		
		id : 'UserDetailPopupGrid',
		
		store: Ext.create('Ext.data.Store', {
			fields: [ {
				name: 'user_id'
			}, {
				name: 'sum_work_term'
			}, {
				name: 'sum_loss_term'
			}, {
				name: 'real_worktime'
			}],
			proxy: {
				type : 'ajax',
				url : '/domains/' + login.current_domain_id + '/diy_selections/MHSummaryUsers/query.json',
				format : 'json',
				reader : {
					type : 'json'
				}
			}
		}),

		autoScroll : true,

		columns : [ {
			text : T('label.x_id', {x : T('label.operator')}),
			dataIndex : 'user_id',
			flex : 1
		}, {
			text : T('label.input_worktime'),
			dataIndex : 'sum_work_term',
			flex : 1,
			xtype : 'numbercolumn',
			format : T('format.number'),
			align : 'right'
		}, {
			text : T('label.loss_worktime'),
			dataIndex : 'sum_loss_term',
			flex : 1,
			xtype : 'numbercolumn',
			format : T('format.number'),
			align : 'right'
		}, {
			text : T('label.real_worktime'),
			dataIndex : 'real_worktime',
			flex : 1,
			xtype : 'numbercolumn',
			format : T('format.number'),
			align : 'right'
		} ]
	} ]	
});