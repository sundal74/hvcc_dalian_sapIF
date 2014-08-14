/**
 * Production Status Main View
 */
Ext.define('Term.view.prod.OpProdM010', {
	
	extend: 'Base.abstract.Form',

	xtype: 'term_prod_opprodm010',
	
	title : T('title.prod_state'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'bottom',
		items: ['->',  {
			itemId : 'btn_modify_actual',
			text : T('button.modify_actual')
		}, {
			itemId : 'btn_modify_operator',
			text : T('button.modify_operator')
		}, {
			itemId : 'btn_add_plan',
			text : T('button.add_plan')
		}, {
			itemId : 'btn_defect',
			text : T('button.defect')
		}, {
			itemId : 'btn_line_stop',
			text : T('button.line_stop')
		}, {
			itemId : 'btn_manual_output',
			text : T('button.btn_manual_output')
		}, {
			itemId : 'btn_multi_manual_output',
			text : T('button.multi_manual_output')
		}/*, {
			itemId : 'btn_wip_input',
			text : T('button.wip_input')
		},{
			itemId : 'btn_prod_input',
			text : T('button.rm_scan')
		}, {
			itemId : 'btn_request_rm',
			text : T('button.req_rm')
		}*/]
	}],

	items: [{
		xtype: 'grid',
		scroll: true,
		flex: 1,
		store: Ext.create('Ext.data.Store', {
			storeId: 'simpsonsStore',
			fields: [{
				name: 'name'
			}, {
				name: 'order_date'
			}, {
				name: 'status'
			}, {
				name: 'shift'
			}, {
				name: 'operation'
			}, {
				name: 'machine'
			}, {
				name: 'product'
			}, {
				name: 'customer'
			}, {
				name: 'product_id'
			}, {
				name: 'machine_id'
			}, {
				name: 'product_desc'
			}, {
				name: 'order_seq'
			}, {
				name: 'actual_start_time'
			}, {
				name: 'actual_end_time'
			}, {
				name: 'worker_count'
			}, {
				name: 'order_qty'
			}, {
				name: 'actual_qty'
			}, {
				name: 'defect_qty'
			}, {
				name: 'rework_qty'
			}, {
				name: 'pallet_qty'
			}],
			
			proxy: {
				type : 'ajax',
				url : '/domains/' + login.current_domain_id + '/diy_services/GetProdOrdersToday/query.json',
				format : 'json',
				reader : {
					type : 'json'
				}
			}
		}),
		columns: [ {
			hidden : true,
			dataIndex : 'pallet_qty',
			header : ''
		}, {
			header: T('label.status'),
			xtype: 'actioncolumn',
			itemId : 'status',
			width : 60,
			align : 'center',
			renderer: function(value, metaData, record, row, col, store, gridView) {
				if(record.get("status") == "W") {
					return "<img src=\"theme/imageOPS/wait.png\"/>";
				} else if(record.get("status") == "R"){
					return "<img src=\"theme/imageOPS/start.png\"/>";
				} else {
					return "<img src=\"theme/imageOPS/finish.png\"/>";
				}
			}
		}, {
			header: T('label.product'),
			dataIndex: 'product',
			width : 150
		}/*, {
			header: T('label.option'),
			dataIndex: 'customer',
			width : 70
		}*/, {
			header: T('label.product_desc'),
			dataIndex: 'product_desc',
			flex: 1,
			align: 'left'
		}, {
			header: T('label.priority'),
			dataIndex: 'order_seq',
			width : 80,
			align: 'right'
		}, {
			header: T('label.plan_qty'),
			dataIndex: 'order_qty',
			width : 75,
			align: 'right'
		}, {
			header: T('label.actual'),
			dataIndex: 'actual_qty',
			width : 75,
			align: 'right'
		}, {
			header: T('label.defect'),
			dataIndex: 'defect_qty',
			width : 75,
			align: 'right'
		}, {
			header: T('label.rework'),
			dataIndex: 'rework_qty',
			width : 75,
			align: 'right'
		} , {
			xtype: 'datecolumn',
			header: T('label.start'),
			dataIndex: 'actual_start_time',
			format : T('format.time_without_sec'),
			align: 'center',
			width : 80
		}, {
			xtype: 'datecolumn',
			header: T('label.end'),
			dataIndex: 'actual_end_time',
			format : T('format.time_without_sec'),
			align: 'center',
			width : 80
		}, {
			header: T('label.scan'),
			xtype: 'actioncolumn',
			itemId : 'scan',
			width : 60,
			align : 'center',
			renderer: function(value, metaData, record, row, col, store, gridView) {
				if(record.get("status") == "R") {
					if(HF.setting.get('option-operation_info').op_type == 'MANUAL') {
						return "<img src=\"theme/imageOPS/btnAddManual.png\"/>";
					}else {
						return "<img src=\"theme/imageOPS/btnScan.png\"/>";
					}
				}
			}
		}]
	}]
});
