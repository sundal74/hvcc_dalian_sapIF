Ext.define('Comp.view.pms_alarms.PmsAlarmsList', {
	
	extend : 'Base.abstract.entity.ReportGridView',
	
	xtype : 'comp_pms_alarms_list',
	
	useCheckBox : false,
		
	store : 'Comp.store.PmsAlarms',
	
	columns : [
		{ xtype : 'codecolumn', header : T('label.type'), dataIndex : 'alarm_type', width : 100, tpl : '{description}', commonCode : 'PMS_ALARM' },
		{ header : T('label.date'), dataIndex : 'prd_date', width : 80 },
		{ xtype : 'codecolumn', header : T('label.shift'), dataIndex : 'shift', width : 50, tpl : '{description}', commonCode : 'SHIFT', align : 'center' },
		{ header : T('label.comment'), dataIndex : 'comments', width : 200 },
		{ header : T('label.operation'), dataIndex : 'routing', width : 70 },
		{ header : T('label.station'), dataIndex : 'st_no', width : 55, align : 'center' },
		{ header : T('label.p_code'), dataIndex : 'p_code', width : 60, align : 'center' },
		{ header : T('label.total'), dataIndex : 'total', xtype : 'numbercolumn', format : T('format.number'), width : 55, align : 'right' },
		{ header : T('label.first'), dataIndex : 'first', xtype : 'numbercolumn', format : T('format.number'), width : 55, align : 'right' },
		{ header : T('label.reject'), dataIndex : 'reject', xtype : 'numbercolumn', format : T('format.number'), width : 55, align : 'right' },
		{ header : T('label.err_code'), dataIndex : 'err_code', width : 75, align : 'center' },
		{ header : T('label.err_cnt'), dataIndex : 'err_cnt', xtype : 'numbercolumn', format : T('format.number'), width : 80, align : 'right' },
		{ header : T('label.int_no'), dataIndex : 'int_no' },
		{ header : T('label.ser_no'), dataIndex : 'srl_no', width : 70 },
		{ header : T('label.created_at'), dataIndex : 'created_at', xtype : 'datecolumn', format : T('format.datetime'), width : 130, align : 'center' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: []
	} ]
});