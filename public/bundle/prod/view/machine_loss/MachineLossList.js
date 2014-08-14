Ext.define('Prod.view.machine_loss.MachineLossList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_machine_loss_list',
		
	store : 'Prod.store.MachineLoss',
	
	signal : '',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ 
			header: T('label.status'),
			dataIndex : 'status',
		  	xtype: 'actioncolumn',
		  	width : 50,
		  	align : 'center',
			tooltip : '',
			renderer: function(value, metaData, record, row, col, store, gridView) {
				if(record.get("status") == '1') {
					if(record.get('elapsed_time') >= gridView.up().signal * 60) {
						this.items[0].icon = 'theme/image/iconRed.png';
						this.items[0].tooltip = 'Overdue';
					} else {
						this.items[0].icon = 'theme/image/statusYellow.png';
						this.items[0].tooltip = 'Waiting';
					}
				} else if(record.get("status") == '2') {
					this.items[0].icon = 'theme/image/statusGreen.png';
					this.items[0].tooltip = 'Completed';
				}				
				return '';
			},
			items: [{
				icon: '',
				tooltip: ''
			}]
		},
		{ header : T('label.work_date'), dataIndex : 'work_date', align : 'center', width : 80, xtype : 'datecolumn', format : T('format.date') },
		{ xtype : 'codecolumn', header : T('label.shift'), dataIndex : 'shift', width : 55, tpl : '{description}', commonCode : 'SHIFT', align : 'center' },
		{ header : T('label.operation'), dataIndex : 'operation', width : 65, xtype : 'entitycolumn' },
		{ header : T('label.operation_desc'), dataIndex : 'operation', width : 150, renderer : function(val) { return val.desc; } },
		{ header : T('label.machine'), dataIndex : 'machine', xtype : 'entitycolumn', width : 85 },
		{ header : T('label.machine_desc'), dataIndex : 'machine', width : 150, renderer : function(val) { return val.desc; } },
		{ header : T('label.reporter'), dataIndex : 'reporter', xtype : 'entitycolumn' },
		{ header : T('label.maintainer'), dataIndex : 'maintainer', xtype : 'entitycolumn' },
		{ header : T('label.breakdown_code'), xtype : 'codecolumn', dataIndex : 'breakdown_code', width : 100, tpl : '{description}', commonCode : 'BREAKDOWN_CODE' },
		{ header : T('label.loss_term'), dataIndex : 'loss_term', xtype : 'numbercolumn', width : 80, align : 'right', format : T('format.number') },
		{ header : T('label.event_time'), dataIndex : 'event_time', align : 'center', xtype : 'datecolumn', format : T('format.datetime'), width : 130, sortOption : { sortSeq : 10, sortDirection : 'desc' } },
		{ header : T('label.elapsed_time'), dataIndex : 'elapsed_time', width : 90, xtype : 'numbercolumn', format : T('format.number'), align : 'right' },
		{ header : T('label.maint_start_time'), dataIndex : 'maint_start_time', align : 'center', xtype : 'datecolumn', width : 130, format : T('format.datetime') },
		{ header : T('label.maint_end_time'), dataIndex : 'maint_end_time', align : 'center', xtype : 'datecolumn', width : 130, format : T('format.datetime') },
		{ header : T('label.reporter_comment'), dataIndex : 'reporter_comment', width : 150 },
		{ header : T('label.maint_comment'), dataIndex : 'maint_comment', width : 150 },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'export', 'add', 'update', 'delete']
	} ],
});