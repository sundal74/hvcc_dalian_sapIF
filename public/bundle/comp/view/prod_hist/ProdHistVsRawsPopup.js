Ext.define('Comp.view.prod_hist.ProdHistVsRawsPopup', {
	
	extend : 'Base.abstract.Popup',
	
	xtype : 'comp_prod_hist_vs_raws_popup',
	
	title : T('title.prod_hist_raws'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	width : 1000,
	
	height : 600,
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'close']
	} ],
	
	items: [{
		xtype : 'grid',
		
		flex : 1,
		
		itemId : 'prod_hist_vs_raws_grid',
		
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
				name: 'seq'
			}, {
				name: 'p_code'
			}, {
				name: 'res01'
			}, {
				name: 'res02'
			}, {
				name: 'res03'
			}, {
				name: 'res04'
			}, {
				name: 'res05'
			}, {
				name: 'res06'
			}, {
				name: 'res07'
			}, {
				name: 'res08'
			}, {
				name: 'res09'
			}, {
				name: 'res10'
			}, {
				name: 'res11'
			}, {
				name: 'res12'
			}, {
				name: 'res13'
			}, {
				name: 'res14'
			}, {
				name: 'res15'
			}, {
				name: 'res16'
			}, {
				name: 'res17'
			}, {
				name: 'res18'
			}, {
				name: 'res19'
			}, {
				name: 'res20'
			}, {
				name: 'res21'
			}, {
				name: 'res55'
			}, {
				name: 'created_at'
			}],
			proxy: {
				type : 'ajax',
				url : '/domains/' + login.current_domain_id + '/diy_selections/PmsHistRaws/query.json',
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
			align : 'center',
			width : 85
		}, {
			text : T('label.shift'),
			dataIndex : 'shift',
			align : 'center',
			width : 50
		}, {
			text : T('label.int_no'),
			dataIndex : 'int_no'
		}, {
			text : T('label.st_no'),
			dataIndex : 'st_no',
			width : 85,
			align : 'center'
		}, {
			text : T('label.p_code'),
			dataIndex : 'p_code',
			width : 65,
			align : 'center'
		}, {
			text : 'Seq.',
			dataIndex : 'seq',
			width : 60,
			align : 'right'
		}, {
			text : 'Res01',
			dataIndex : 'res01',
			align : 'right'
		}, {
			text : 'Res02',
			dataIndex : 'res02',
			align : 'right'
		}, {
			text : 'Res03',
			align : 'right',
			dataIndex : 'res03'
		}, {
			text : 'Res04',
			align : 'right',
			dataIndex : 'res04'
		}, {
			text : 'Res05',
			align : 'right',
			dataIndex : 'res05'
		}, {
			text : 'Res06',
			align : 'right',
			dataIndex : 'res06'
		}, {
			text : 'Res07',
			align : 'right',
			dataIndex : 'res07'
		}, {
			text : 'Res08',
			align : 'right',
			dataIndex : 'res08'
		}, {
			text : 'Res09',
			align : 'right',
			dataIndex : 'res09'
		}, {
			text : 'Res10',
			align : 'right',
			dataIndex : 'res10'
		}, {
			text : 'Res11',
			align : 'right',
			dataIndex : 'res11'
		}, {
			text : 'Res12',
			align : 'right',
			dataIndex : 'res12'
		}, {
			text : 'Res13',
			align : 'right',
			dataIndex : 'res13'
		}, {
			text : 'Res14',
			align : 'right',
			dataIndex : 'res14'
		}, {
			text : 'Res15',
			align : 'right',
			dataIndex : 'res15'
		}, {
			text : 'Res16',
			align : 'right',
			dataIndex : 'res16'
		}, {
			text : 'Res17',
			align : 'right',
			dataIndex : 'res17'
		}, {
			text : 'Res18',
			align : 'right',
			dataIndex : 'res18'
		}, {
			text : 'Res19',
			align : 'right',
			dataIndex : 'res19'
		}, {
			text : 'Res20',
			align : 'right',
			dataIndex : 'res20'
		}, {
			text : 'Res21',
			align : 'right',
			dataIndex : 'res21'
		}, {
			text : 'Result',
			dataIndex : 'res55',
			width : 60,
			align : 'center'
		}, {
			text : T('label.created_at'),
			dataIndex : 'created_at',
			xtype : 'datecolumn',
			width : 130,
			format : T('format.datetime')
		} ]
	} ]	
});