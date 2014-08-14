Ext.define('Prod.view.prod_plan.PlanPopupList', {
	
	extend : 'Base.abstract.entity.ReportGridView',
	
	xtype : 'prod_plan_popup_list',
	
	useCheckBox : false,
	
	store : Ext.create('Ext.data.Store', {
		
		fields : [
			{ name : 'check', type : 'string' },
			{ name : 'operation', type : 'string' },
			{ name : 'product', type : 'string' },
			{ name : 'customer', type : 'string' },
			{ name : 'D0-1-seq', type : 'integer' },
			{ name : 'D0-1', type : 'integer' },
			{ name : 'D0-2-seq', type : 'integer' },
			{ name : 'D0-2', type : 'integer' },
			{ name : 'D1-1-seq', type : 'integer' },
			{ name : 'D1-1', type : 'integer' },
			{ name : 'D1-2-seq', type : 'integer' },
			{ name : 'D1-2', type : 'integer' },
			{ name : 'D2-1-seq', type : 'integer' },
			{ name : 'D2-1', type : 'integer' },
			{ name : 'D2-2-seq', type : 'integer' },
			{ name : 'D2-2', type : 'integer' },
			{ name : 'D3-1-seq', type : 'integer' },
			{ name : 'D3-1', type : 'integer' },
			{ name : 'D3-2-seq', type : 'integer' },
			{ name : 'D3-2', type : 'integer' },
			{ name : 'D4-1-seq', type : 'integer' },
			{ name : 'D4-1', type : 'integer' },
			{ name : 'D4-2-seq', type : 'integer' },
			{ name : 'D4-2', type : 'integer' },
			{ name : 'D5-1-seq', type : 'integer' },
			{ name : 'D5-1', type : 'integer' },
			{ name : 'D5-2-seq', type : 'integer' },
			{ name : 'D5-2', type : 'integer' },
			{ name : 'D6-1-seq', type : 'integer' },
			{ name : 'D6-1', type : 'integer' },
			{ name : 'D6-2-seq', type : 'integer' },
			{ name : 'D6-2', type : 'integer' },
			{ name : '_cud_flag_', type : 'string' },
		],
		
		autoLoad : false,
		
		remoteFilter : true,
				
		proxy : {
			type : 'ajax',
			url : '/domains/' + login.current_domain_id + '/prod_plans.json',
			format : 'json',
			reader : {
				type : 'json',
				root: 'items',
				successProperty : 'success',
				totalProperty : 'total'
			}
		}
	}),
	
	initComponent: function() {
		var self = this;
		
		this.columns = [
			{ 
				header : 'Check',
				dataIndex : 'check',
				width : 55
			},
			{ 
				header : T('label.operation'),
				dataIndex : 'operation',
				width : 70
			},
			{ 
				header : T('label.product'),
				dataIndex : 'product',
				width : 110
			},
			{ 
				header : T('label.option'),
				dataIndex : 'customer',
				width : 0
			},
			{ 
				header : 'D-Day',
				columns: [ {
					header: 'Priority',
					dataIndex: 'D0-1-seq',
					width : 60,
					align : 'right',
					flex: 1
				}, {
					header: T('label.day'),
					dataIndex: 'D0-1',
					width : 60,
					align : 'right',
					flex: 1,
					xtype : 'numbercolumn',
					format : T('format.number')
				}, 	{
					header: 'Priority',
					dataIndex: 'D0-2-seq',
					width : 60,
					align : 'right',
					flex: 1
				}, {
					header: T('label.night'),
					dataIndex: 'D0-2',
					width : 60,
					align : 'right',
					flex: 1,
					xtype : 'numbercolumn',
					format : T('format.number')
				} ]
			},
			{ 
				header : 'D+1',
				columns: [ {
					header: 'Priority',
					dataIndex: 'D1-1-seq',
					width : 60,
					align : 'right',
					flex: 1
				}, {
					header: T('label.day'),
					dataIndex: 'D1-1',
					width : 60,
					align : 'right',
					flex: 1,
					xtype : 'numbercolumn',
					format : T('format.number')
				}, {
					header: 'Priority',
					dataIndex: 'D1-2-seq',
					width : 60,
					align : 'right',
					flex: 1
				}, {
					header: T('label.night'),
					dataIndex: 'D1-2',
					width : 60,
					align : 'right',
					flex: 1,
					xtype : 'numbercolumn',
					format : T('format.number')
				} ]
			},
			{ 
				header : 'D+2',
				columns: [ {
					header: 'Priority',
					dataIndex: 'D2-1-seq',
					width : 60,
					align : 'right',
					flex: 1
				}, {
					header: T('label.day'),
					dataIndex: 'D2-1',
					width : 60,
					align : 'right',
					flex: 1,
					xtype : 'numbercolumn',
					format : T('format.number')
				}, 	{
					header: 'Priority',
					dataIndex: 'D2-2-seq',
					width : 60,
					align : 'right',
					flex: 1
				}, {
					header: T('label.night'),
					dataIndex: 'D2-2',
					width : 60,
					align : 'right',
					flex: 1,
					xtype : 'numbercolumn',
					format : T('format.number')
				} ]
			},
			{ 
				header : 'D+3',
				columns: [ {
					header: 'Priority',
					dataIndex: 'D3-1-seq',
					width : 60,
					align : 'right',
					flex: 1
				}, {
					header: T('label.day'),
					dataIndex: 'D3-1',
					width : 60,
					align : 'right',
					flex: 1,
					xtype : 'numbercolumn',
					format : T('format.number')
				}, {
					header: 'Priority',
					dataIndex: 'D3-2-seq',
					width : 60,
					align : 'right',
					flex: 1
				}, {
					header: T('label.night'),
					dataIndex: 'D3-2',
					width : 60,
					align : 'right',
					flex: 1,
					xtype : 'numbercolumn',
					format : T('format.number')
				} ]
			},
			{ 
				header : 'D+4',
				columns: [ {
					header: 'Priority',
					dataIndex: 'D4-1-seq',
					width : 60,
					align : 'right',
					flex: 1
				}, {
					header: T('label.day'),
					dataIndex: 'D4-1',
					width : 60,
					align : 'right',
					flex: 1,
					xtype : 'numbercolumn',
					format : T('format.number')
				}, {
					header: 'Priority',
					dataIndex: 'D4-2-seq',
					width : 60,
					align : 'right',
					flex: 1
				}, {
					header: T('label.night'),
					dataIndex: 'D4-2',
					width : 60,
					align : 'right',
					flex: 1,
					xtype : 'numbercolumn',
					format : T('format.number')
				} ]
			},
			{ 
				header : 'D+5',
				columns: [ {
					header: 'Priority',
					dataIndex: 'D5-1-seq',
					width : 60,
					align : 'right',
					flex: 1
				}, {
					header: T('label.day'),
					dataIndex: 'D5-1',
					width : 60,
					align : 'right',
					flex: 1,
					xtype : 'numbercolumn',
					format : T('format.number')
				}, 	{
					header: 'Priority',
					dataIndex: 'D5-2-seq',
					width : 60,
					align : 'right',
					flex: 1
				}, {
					header: T('label.night'),
					dataIndex: 'D5-2',
					width : 60,
					align : 'right',
					flex: 1,
					xtype : 'numbercolumn',
					format : T('format.number')
				} ]
			},
			{ 
				header : 'D+6',
				columns: [ {
					header: 'Priority',
					dataIndex: 'D6-1-seq',
					width : 60,
					align : 'right',
					flex: 1
				}, {
					header: T('label.day'),
					dataIndex: 'D6-1',
					width : 60,
					align : 'right',
					flex: 1,
					xtype : 'numbercolumn',
					format : T('format.number')					
				}, 	{
					header: 'Priority',
					dataIndex: 'D6-2-seq',
					width : 60,
					align : 'right',
					flex: 1
				}, {
					header: T('label.night'),
					dataIndex: 'D6-2',
					width : 60,
					align : 'right',
					flex: 1,
					xtype : 'numbercolumn',
					format : T('format.number')
				} ]
			}
		];

		this.callParent(arguments);
	},
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: []
	} ],
});