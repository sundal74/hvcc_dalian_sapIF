Ext.define('Hcc.view.daily_actual_qty.DailyActualQtyList', {
	
	extend : 'Base.abstract.entity.ReportGridView',
	
	xtype : 'hcc_daily_actual_qty_list',
		
	store : 'Hcc.store.DailyActualQty',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ 
			header: T('label.status'),
			dataIndex : 'status',
		  	xtype: 'actioncolumn',
		  	width : 50,
		  	align : 'center',
			tooltip : '',
			renderer: function(value, metaData, record, row, col, store, gridView) {
				if(record.get("status") == 'R') {
					this.items[0].icon = 'theme/image/statusGreen.png';
					this.items[0].tooltip = 'Running';
				} else if(record.get("status") == 'W') {
					this.items[0].icon = 'theme/image/statusYellow.png';
					this.items[0].tooltip = 'Waiting';
				} else if(record.get("status") == 'T') {
					this.items[0].icon = 'theme/image/statusGray.png';
					this.items[0].tooltip = 'Completed';
				}
				return '';
			},
			items: [{
				icon: '',
				tooltip: ''
			}]
		},
		{ xtype : 'codecolumn', header : T('label.shift'), width : 55, dataIndex : 'shift', tpl : '{description}', commonCode : 'SHIFT', align : 'center', sortOption : { sortSeq : 10, sortDirection : 'asc' } },
		{ header : T('label.wc'), dataIndex : 'workcenter', width : 50 },
		{ header : T('label.operation'), dataIndex : 'operation', width : 65 },
		{ header : T('label.operation_desc'), dataIndex : 'operation_desc', width : 150 },
		{ header : T('label.machine'), dataIndex : 'machine', width : 85 },
		{ header : T('label.machine_desc'), dataIndex : 'machine_desc', width : 120 },
		{ header : T('label.order_seq'), dataIndex : 'order_seq', width : 60, align : 'right' },
		{ header : T('label.product'), dataIndex : 'product' },
		{ header : T('label.product_desc'), dataIndex : 'product_desc', width : 180 },
		// { header : T('label.option'), dataIndex : 'customer', width : 60 },
		{ header : T('label.plan_qty'), dataIndex : 'order_qty', width : 60, align : 'right', xtype : 'numbercolumn', format : T('format.number') },
		{ header : T('label.actual_qty'), dataIndex : 'actual_qty', width : 60, align : 'right', xtype : 'numbercolumn', format : T('format.number') },
		{ 
			header: T('label.remain_qty'),
			dataIndex : 'remain_qty',
		  	width : 70,
			xtype : 'numbercolumn', 
			format : T('format.number'),
		  	align : 'right',
		  	renderer: function(value, metaData, record, row, col, store, gridView) {
				var plan = record.data.order_qty;
				var actual = record.data.actual_qty;
				return (plan == 0) ? 0 : ((plan - actual) * (-1));
			}
		},
		{ header : T('label.scrap_qty'), dataIndex : 'defect_qty', width : 60, align : 'right' },
		{ header : T('label.rework_qty'), dataIndex : 'rework_qty', width : 60, align : 'right' },
		{ header : T('label.start_time'), dataIndex : 'actual_start_time', width : 75, align: 'center', xtype : 'datecolumn', format : T('format.time_without_sec'), align : 'center' },
		{ header : T('label.end_time'), dataIndex : 'actual_end_time', width : 75, align: 'center', xtype : 'datecolumn', format : T('format.time_without_sec'), align : 'center' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'export', 'update']
	} ]
});