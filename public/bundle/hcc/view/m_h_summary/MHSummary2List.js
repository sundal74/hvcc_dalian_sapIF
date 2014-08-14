Ext.define('Hcc.view.m_h_summary.MHSummary2List', {
	
	extend : 'Base.abstract.entity.ReportGridView',
	
	xtype : 'hcc_m_h_summary2_list',
	
	useCheckBox : false,
	
	requires : ['Ext.ux.CheckColumn', 'Base.view.grid.HatioGroupSummary'],
	
	store : 'Hcc.store.MHSummary2',
	
	/*dockedItems: [ {
		xtype: 'controlbar',
		items: ['inquiry', '->', 'export']
	} ],*/
	
	features: [{
		ftype: 'groupingsummary',
		groupHeaderTpl: Ext.create('Ext.XTemplate',
			'<tpl if="name == \'Total\'">',
				'{name}',
			'<tpl else>',
				'ROUTING : {name}',
			'</tpl>'
		)
	}],
	
	columns : [
		{ header : T('label.machine'), dataIndex : 'machine', width : 80 },
		{ header : T('label.machine_desc'), dataIndex : 'machine_desc', width : 150 },
		{
			header : T('label.plan_qty'),
			dataIndex : 'plan_qty',
			width : 60,
			align : 'right',
			renderer: Ext.util.Format.numberRenderer(T('format.number')),
		},
		{
			header : T('label.actual_qty'),
			dataIndex : 'actual_qty',
			width : 60,
			align : 'right',
			renderer: Ext.util.Format.numberRenderer(T('format.number')),
		},
		{
			header : T('label.achievement_rate'),
			dataIndex : 'achv_rate',
			width : 95,
			align : 'right',
			renderer : function(value, metaData, record, rowIndex, colIndex, store) {
				var planQty = record.get("plan_qty");
				if(!planQty || planQty <= 0) {
					return 0;
				}
				
				var actualQty = record.get("actual_qty");
				var achvRate = (actualQty / planQty) * 100;
				return Ext.util.Format.number(achvRate, T('format.number'));
			}
		},
		{
			header : T('label.machine_hour') + ' (min.)',
			dataIndex : 'machine_hour',
			width : 130,
			align : 'right',
			renderer: Ext.util.Format.numberRenderer(T('format.number')),
		},
		{
			header : T('label.input_worktime') + ' (min.)',
			dataIndex : 'work_term',
			width : 110,
			align : 'right',
			renderer: Ext.util.Format.numberRenderer(T('format.number')),
		},
		{
			header : T('label.loss_worktime') + ' (min.)',
			dataIndex : 'loss_term',
			width : 110,
			align : 'right',
			renderer: Ext.util.Format.numberRenderer(T('format.number')),
		},
		{
			header : T('label.real_worktime') + ' (min.)',
			dataIndex : 'real_worktime',
			width : 120,
			align : 'right',
			renderer : function(value, metaData, record, rowIndex, colIndex, store) {
				var workterm = record.get("work_term");
				var lossterm = record.get("loss_term");
				var realWorktime = (workterm - lossterm);
				record.data.real_worktime = realWorktime;
				return Ext.util.Format.number(realWorktime, T('format.number'));
			}
		},
		{
			header : T('label.unit_per_hour'),
			dataIndex : 'unit_per_hour',
			width : 100,
			align : 'right',
			renderer : function(value, metaData, record, rowIndex, colIndex, store) {
				var actualQty = record.get("actual_qty");
				if(actualQty == 0) {
					record.data.unit_per_hour = 0;
					return 0;
				}
				
				var machineHour = record.get("machine_hour");
				if(machineHour == 0) {
					record.data.unit_per_hour = 0;
					return 0;
				}
				
				record.data.unit_per_hour = actualQty / (machineHour / 60);
				return Ext.util.Format.number(record.data.unit_per_hour, '0.00');
			}
		},
		{
			header : T('label.unit_per_mh') ,
			dataIndex : 'unit_per_m_h',
			width : 100,
			align : 'right',
			renderer : function(value, metaData, record, rowIndex, colIndex, store) {
				var actualQty = record.get("actual_qty");
				if(actualQty == 0) {
					record.data.unit_per_m_h = 0;
					return 0;
				}
				
				var worktime = record.get("work_term");
				if(worktime == 0) {
					record.data.unit_per_m_h = 0;
					return 0;
				}
				
				record.data.unit_per_m_h = actualQty / (worktime / 60);
				return Ext.util.Format.number(record.data.unit_per_m_h, '0.00');
			}
		}
	]
});