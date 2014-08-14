Ext.define('Hcc.view.prod_overview.ProdOverviewList', {
	
	extend : 'Base.abstract.entity.ReportGridView',
	
	xtype : 'hcc_prod_overview_list',
	
	useCheckBox : false,
	
	requires : ['Base.view.grid.HatioGroupSummary'],
		
	store : 'Hcc.store.ProdOverview',
	
	features: [ {
		ftype : 'groupingsummary',
		groupHeaderTpl : Ext.create('Ext.XTemplate', '<tpl>WORKCENTER : {name}</tpl>')
	} ],
	
	columns : [
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
		{ 
			header: T('label.line_stop_flag'),
			dataIndex : 'linestop',
		  	width : 75,
		  	align : 'center',
			renderer : function(value) {
				if(value == 'Y') {
					return "<img src=theme/image/iconRed.png>";
				} else {
					return '';
				}
			}
		},
		{ header : T('label.operation'), dataIndex : 'op', width : 75 },
		{ header : T('label.operation_desc'), dataIndex : 'op_name', flex : 1 },
		{ header : T('label.machine'), dataIndex : 'mc', width : 80 },
		{ header : T('label.machine_desc'), dataIndex : 'mc_name', flex : 1 },
		{ header : T('label.worker_count'), dataIndex : 'workers', width : 70, align : 'right' },
		{ header : T('label.plan_qty'), dataIndex : 'plan', xtype : 'numbercolumn', format : T('format.number'), width : 65, align : 'right' },
		{ header : T('label.actual'), dataIndex : 'actual', xtype : 'numbercolumn', format : T('format.number'), width : 65, align : 'right' },
		{ header : T('label.defect'), dataIndex : 'scrap', xtype : 'numbercolumn', format : T('format.number'), width : 65, align : 'right' },
		{ header : T('label.rework'), dataIndex : 'rework', xtype : 'numbercolumn', format : T('format.number'), width : 65, align : 'right' }
	]
});