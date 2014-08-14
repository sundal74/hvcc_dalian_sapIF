Ext.define('Hcc.view.machine_run_time.MachineRunTimeList', {
	
	extend : 'Base.abstract.entity.ReportGridView',
	
	xtype : 'hcc_machine_run_time_list',
	
	useCheckBox : false,
	
	requires : ['Ext.ux.CheckColumn'],
		
	store : 'Hcc.store.MachineRunTime',
	
	columns : [
		{ header : T('label.operation'), dataIndex : 'operation', width : 65 },
		{ header : T('label.operation_desc'), dataIndex : 'operation_desc', width : 130 },
		{ header : T('label.machine'), dataIndex : 'machine', width : 80 },
		{ header : T('label.machine_desc'), dataIndex : 'machine_desc', width : 200 },
		{
			header : T('label.availability'),
			width : 70,
			dataIndex : 'available_time',
			align : 'right',
			renderer: Ext.util.Format.numberRenderer(T('format.number'))
		},
		{
			header : T('label.plan_qty'),
			width : 70,
			dataIndex : 'order_qty',
			align : 'right',
			renderer: Ext.util.Format.numberRenderer(T('format.number'))
		},
		{
			header : T('label.actual_qty'),
			width : 70,
			dataIndex : 'actual_qty',
			align : 'right',
			renderer: Ext.util.Format.numberRenderer(T('format.number'))
		},
		{
			header : T('label.loss_term'),
			width : 75,
			dataIndex : 'loss_term',
			align : 'right',
			renderer: Ext.util.Format.numberRenderer(T('format.number'))
		},
		{
			header : T('label.loss_count'),
			width : 80,
			dataIndex : 'loss_count',
			align : 'right',
			renderer: Ext.util.Format.numberRenderer(T('format.number'))
		},
		{
			header : T('label.runtime'),
			width : 70,
			dataIndex : 'run_time',
			align : 'right',
			renderer: Ext.util.Format.numberRenderer(T('format.number'))
		},
		{
			header : T('label.rate') + '(%)',
			width : 70,
			dataIndex : 'hour_rate',
			align : 'right',
			renderer: Ext.util.Format.numberRenderer(T('format.number'))
		}
	]
});