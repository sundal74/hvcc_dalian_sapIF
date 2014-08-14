Ext.define('Comp.view.pms_alarms.AlarmPopup', {
	
	extend : 'Base.abstract.Popup',
	
	xtype : 'comp_alarm_popup',
	
	title : T('menu.PmsAlarms'),
	
	width : 1000,
	
	height : 600,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	items: [ {
		xtype : 'grid',
		itemId : 'tsfr_grid',
		title : 'TSFR',
		flex : 1,
		store : Ext.create('Ext.data.Store', {
			fields: [ 
				{ name: 'alarm_type', type : 'string' }, 
				{ name: 'prd_date', type : 'string' }, 
				{ name: 'shift', type : 'string' },
				{ name: 'routing', type : 'string' }, 
				{ name: 'st_no', type : 'string' }, 
				{ name: 'p_code', type : 'string' }, 
				{ name: 'total', type : 'string' }, 
				{ name: 'first', type : 'string' }, 
				{ name: 'reject', type : 'string' }, 
				{ name: 'comments', type : 'string' }, 
				{ name: 'created_at', type : 'date' }
			],
			proxy: {
				type: 'memory',
				reader: {
					type: 'json'
				}
			}
		}),
		autoScroll : true,
		columns : [
			{ xtype : 'codecolumn', header : T('label.type'), dataIndex : 'alarm_type', tpl : '{description}', commonCode : 'PMS_ALARM', width : 70 },
			{ header : T('label.date'), dataIndex : 'prd_date', align : 'center', width : 80 },
			{ header : T('label.shift'), dataIndex : 'shift', width : 50, align : 'center' },
			{ header : T('label.operation'), dataIndex : 'routing', align : 'center', width : 60 },
			{ header : T('label.station'), dataIndex : 'st_no', align : 'center', width : 55 },
			{ header : T('label.p_code'), dataIndex : 'p_code', align : 'center', width : 60 },
			{ header : T('label.total'), dataIndex : 'total', align : 'right', width : 60 },
			{ header : T('label.first'), dataIndex : 'first', align : 'right', width : 60 },
			{ header : T('label.reject'), dataIndex : 'reject', align : 'right', width : 60 },
			{ header : T('label.comment'), dataIndex : 'comments', width : 250 },
			{ header : T('label.created_at'), dataIndex : 'created_at', xtype : 'datecolumn', format : T('format.datetime'), width : 130, align : 'center' }
		]
	}, {
		xtype : 'grid',
		itemId : 'equipment_grid',
		title : 'Equipment',
		flex : 1,
		store : Ext.create('Ext.data.Store', {
			fields: [ 
				{ name: 'alarm_type', type : 'string' }, 
				{ name: 'prd_date', type : 'string' }, 
				{ name: 'shift', type : 'string' },
				{ name: 'routing', type : 'string' }, 
				{ name: 'err_code', type : 'string' }, 
				{ name: 'err_cnt', type : 'string' }, 
				{ name: 'comments', type : 'string' }, 
				{ name: 'created_at', type : 'date' }
			],
			proxy: {
				type: 'memory',
				reader: {
					type: 'json'
				}
			}
		}),
		autoScroll : true,
		columns : [
			{ xtype : 'codecolumn', header : T('label.type'), dataIndex : 'alarm_type', width : 80, tpl : '{description}', commonCode : 'PMS_ALARM' },
			{ header : T('label.date'), dataIndex : 'prd_date', align : 'center', width : 80 },
			{ header : T('label.shift'), dataIndex : 'shift', width : 50, align : 'center' },
			{ header : T('label.operation'), dataIndex : 'routing', align : 'center', width : 60 },
			{ header : T('label.station'), dataIndex : 'st_no', align : 'center', width : 55 },
			{ header : T('label.err_code'), dataIndex : 'err_code', align : 'center', width : 75 },
			{ header : T('label.err_cnt'), dataIndex : 'err_cnt', align : 'right', width : 60 },
			{ header : T('label.comment'), dataIndex : 'comments', width : 250 },
			{ header : T('label.created_at'), dataIndex : 'created_at', xtype : 'datecolumn', format : T('format.datetime'), width : 130, align : 'center' }
		]
	}, {
		xtype : 'grid',
		itemId : 'measure_miss_grid',
		title : 'Measurement Missing',
		flex : 1,
		store : Ext.create('Ext.data.Store', {
			fields: [ 
				{ name: 'alarm_type', type : 'string' }, 
				{ name: 'prd_date', type : 'string' }, 
				{ name: 'shift', type : 'string' },
				{ name: 'routing', type : 'string' }, 
				{ name: 'st_no', type : 'string' }, 
				{ name: 'p_code', type : 'string' }, 
				{ name: 'int_no', type : 'string' }, 
				{ name: 'srl_no', type : 'string' }, 
				{ name: 'comments', type : 'string' }, 
				{ name: 'created_at', type : 'date' }
			],
			proxy: {
				type: 'memory',
				reader: {
					type: 'json'
				}
			}
		}),
		autoScroll : true,
		columns : [
			{ xtype : 'codecolumn', header : T('label.type'), dataIndex : 'alarm_type', width : 120, tpl : '{description}', commonCode : 'PMS_ALARM' },
			{ header : T('label.date'), dataIndex : 'prd_date', align : 'center', width : 80 },
			{ header : T('label.shift'), dataIndex : 'shift', width : 50, align : 'center' },
			{ header : T('label.operation'), dataIndex : 'routing', align : 'center', width : 60 },
			{ header : T('label.station'), dataIndex : 'st_no', align : 'center', width : 55 },
			{ header : T('label.p_code'), dataIndex : 'p_code', align : 'center', width : 60 },
			{ header : T('label.int_no'), dataIndex : 'int_no' },
			{ header : T('label.ser_no'), dataIndex : 'srl_no', width : 70 },
			{ header : T('label.comment'), dataIndex : 'comments', width : 250 },
			{ header : T('label.created_at'), dataIndex : 'created_at', xtype : 'datecolumn', format : T('format.datetime'), width : 130, align : 'center' }
		]
	}, {
		xtype : 'grid',
		itemId : 'ng_product_grid',
		title : 'NG Product',
		flex : 1,
		store : Ext.create('Ext.data.Store', {
			fields: [ 
				{ name: 'alarm_type', type : 'string' }, 
				{ name: 'prd_date', type : 'string' }, 
				{ name: 'shift', type : 'string' },
				{ name: 'routing', type : 'string' }, 
				{ name: 'st_no', type : 'string' }, 
				{ name: 'p_code', type : 'string' }, 
				{ name: 'int_no', type : 'string' }, 
				{ name: 'srl_no', type : 'string' }, 
				{ name: 'comments', type : 'string' }, 
				{ name: 'created_at', type : 'date' }
			],
			proxy: {
				type: 'memory',
				reader: {
					type: 'json'
				}
			}
		}),
		autoScroll : true,
		columns : [
			{ xtype : 'codecolumn', header : T('label.type'), dataIndex : 'alarm_type', width : 100, tpl : '{description}', commonCode : 'PMS_ALARM' },
			{ header : T('label.date'), dataIndex : 'prd_date', align : 'center', width : 80 },
			{ header : T('label.shift'), dataIndex : 'shift', width : 50, align : 'center' },
			{ header : T('label.operation'), dataIndex : 'routing', align : 'center', width : 60 },
			{ header : T('label.station'), dataIndex : 'st_no', align : 'center', width : 55 },
			{ header : T('label.p_code'), dataIndex : 'p_code', align : 'center', width : 60 },
			{ header : T('label.int_no'), dataIndex : 'int_no' },
			{ header : T('label.ser_no'), dataIndex : 'srl_no', width : 70 },
			{ header : T('label.comment'), dataIndex : 'comments', width : 250 },
			{ header : T('label.created_at'), dataIndex : 'created_at', xtype : 'datecolumn', format : T('format.datetime'), width : 130, align : 'center' }
		]
	} ],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'close']
	} ]
});