Ext.define('Prod.view.machine_chk_plan.MachineChkPlanList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_machine_chk_plan_list',
		
	store : 'Prod.store.MachineChkPlan',
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'export', 'update']
	} ],
	
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
				if(record.get("status") == 'W') {
					if(Ext.Date.format(record.get('due_date'), T('format.submitDate')) < Ext.Date.format(new Date(), T('format.submitDate'))) {
						this.items[0].icon = 'theme/image/iconRed.png';
						this.items[0].tooltip = 'Overdue';
					} else {
						this.items[0].icon = 'theme/image/statusYellow.png';
						this.items[0].tooltip = 'Waiting';
					}
				} else if(record.get("status") == 'T') {
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
		{ header : T('label.plan_date'), dataIndex : 'plan_date', width : 80, align : 'center', xtype : 'datecolumn', format : T('format.date'), sortOption : { sortSeq : 10, sortDirection : 'desc' } },
		{ header : T('label.machine'), dataIndex : 'machine', xtype : 'entitycolumn', width : 85 },
		{ header : T('label.machine_desc'), dataIndex : 'machine', width : 160, renderer : function(val) { return val.desc; } },
		{ xtype : 'codecolumn', header : T('label.pm_type'), dataIndex : 'pm_type', tpl : '{description}', commonCode : 'PM_TYPE', width : 80 },
		{ xtype : 'codecolumn', header : T('label.pm_part'), dataIndex : 'pm_part', tpl : '{description}', commonCode : 'PM_PART', width : 80 },
		{ header : T('label.due_date'), dataIndex : 'due_date', align : 'center', xtype : 'datecolumn', format : T('format.date'), width : 80 },
		{ header : T('label.check_date'), dataIndex : 'check_date', align : 'center', xtype : 'datecolumn', format : T('format.date'), width : 80 },
		{ header : T('label.inspector'), dataIndex : 'inspector', xtype : 'entitycolumn', width : 90 },
		{ header : T('label.start_time'), dataIndex : 'start_time', align : 'center', width : 130 },
		{ header : T('label.end_time'), dataIndex : 'end_time', align : 'center', width : 130 },
		{ header : T('label.work_term'), dataIndex : 'work_term', width : 90, align : 'right' },
		{ header : T('label.check_point'), dataIndex : 'description', width : 150 },
		{ header : T('label.chk_comment'), dataIndex : 'chk_comment', width : 250 },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	]
});