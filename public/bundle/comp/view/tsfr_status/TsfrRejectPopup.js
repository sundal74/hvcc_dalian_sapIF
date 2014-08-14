Ext.define('Comp.view.tsfr_status.TsfrRejectPopup', {
	
	extend : 'Base.abstract.Popup',
	
	xtype : 'comp_tsfr_reject_popup',
	
	title : T('title.tsfr_reject_list'),
	
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
		
		itemId : 'tsfr_reject_grid',
		
		store: Ext.create('Ext.data.Store', {
			fields: [ {
				name: 'prd_date'
			}, {
				name: 'shift'
			}, {
				name: 'int_no'
			}, {
				name: 'st_no'
			}, {
				name: 'p_code'
			}, {
				name: 'created_at'
			} ],
			proxy: {
				type : 'ajax',
				url : '/domains/' + login.current_domain_id + '/diy_selections/PmsTsfrReject/query.json',
				format : 'json',
				reader : {
					type : 'json'
				}
			}
		}),

		autoScroll : true,

		columns : [ {
			text : T('label.work_date'),
			dataIndex : 'prd_date',
			flex : 1,
			align : 'center'
		}, {
			text : T('label.shift'),
			dataIndex : 'shift',
			flex : 0.5,
			align : 'center'
		}, {
			text : T('label.int_no'),
			dataIndex : 'int_no',
			flex : 1.5
		}, {
			text : T('label.st_no'),
			dataIndex : 'st_no',
			flex : 0.9,
			align : 'center'
		}, {
			text : T('label.p_code'),
			dataIndex : 'p_code',
			flex : 0.7
		}, {
			text : T('label.created_at'),
			dataIndex : 'created_at',
			xtype : 'datecolumn',
			flex : 2,
			format : T('format.datetime'),
			align : 'center'
		} ]
	} ]	
});