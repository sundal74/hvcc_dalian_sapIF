Ext.define('Prod.view.prod_plan.ProdPlanList', {
	
	extend : 'Base.abstract.entity.ReportGridView',
	
	xtype : 'prod_prod_plan_list',
	
	useCheckBox : false,
	
	store : Ext.create('Ext.data.Store', {
		
		fields : [
			{ name : 'id', type : 'string' },
			{ name : 'workcenter', type : 'string' },
			{ name : 'operation', type : 'string' },
			{ name : 'product', type : 'string' },
			{ name : 'operation_desc', type : 'string' },
			{ name : 'product_desc', type : 'string' },
			{ name : 'customer', type : 'string' },
			{ name : 'customer_desc', type : 'string' },
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
		
		groupField : 'workcenter',
		
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
	
	features: [ {
		ftype: 'groupingsummary',
		groupHeaderTpl: 'WORKCENTER : {name}'
	} ],
	
	//plugins :  [ Ext.create('Ext.grid.plugin.CellEditing', {
	//	clicksToEdit : 1
	//}) ],
	
	//selModel : Ext.create('Ext.selection.CheckboxModel', { pruneRemoved : false }),
	
	initComponent: function() {
		var self = this;
		
		this.columns = [
			{ dataIndex : 'id', hidden : true },
			{ 
				header : T('label.operation'),
				dataIndex : 'operation',
				width : 150,
				renderer : function(value, meta, record, rowIndex, colIndex, store) {
					var first = true;
					if(rowIndex > 0) {
						var currentWc = record.get('workcenter');
						var beforeWc = store.getAt(rowIndex - 1).get('workcenter');
						var currentOp = record.get('operation');
						var beforeOp = store.getAt(rowIndex - 1).get('operation');
						if(currentWc == beforeWc && currentOp == beforeOp) {
							first = false;
						}
					} 

				    if (first) {
				        var i = rowIndex + 1;
				        while (i < store.getCount() && value === store.getAt(i).get('operation')) {
				            i++;
				        }
				
						value = value + ' (' + record.get('operation_desc') + ')';
				    }
				    return first ? value : '';
				}
			},
			{ 
				header : T('label.product'),
				dataIndex : 'product',
				width : 220,
				renderer : function(value, meta, record, rowIndex, colIndex, store) {
					return value + ' (' + record.get('product_desc') + ')';
				}
			},
			{ 
				header : T('label.option'),
				dataIndex : 'customer',
				width : 0,
				renderer : function(value, meta, record, rowIndex, colIndex, store) {
					return HF.idToName(value);
				}
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
					editor : { 'xtype' : 'numberfield' },
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
					editor : { 'xtype' : 'numberfield' },
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
		items: ['->', 'import', 'export', 'create_order']
	} ],
});