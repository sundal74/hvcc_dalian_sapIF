Ext.define('Hcc.view.m_h_summary.MHSummaryList', {
	
	extend : 'Base.abstract.Panel',
	
	xtype : 'hcc_m_h_summary_list',
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	requires : ['Ext.ux.CheckColumn', 'Base.view.grid.HatioGroupSummary'],
	
	items : [{
		xtype : 'chart',
        animate: true,
        shadow: true,
		store: Ext.create('Ext.data.Store', {
			fields: [{
				name: 'operation'
			}, {
				name: 'unit_per_m_h'
			}],
			proxy: {
				type: 'memory',
				reader: {
					type: 'json'
				}
			}
		}),
		flex : 4,
        axes: [
			{
            	type: 'Numeric',
            	minimum: 0,
            	position: 'left',
            	fields: ['unit_per_m_h'],
            	title: T('label.unit_per_mh'),
            	minorTickSteps: 1,
            	grid: true
        	}, 
			{
            	type: 'Category',
            	position: 'bottom',
            	fields: ['operation']
        	}
		],
        series: [
			{
            	type: 'column',
            	highlight: {
                	size: 7,
                	radius: 7
            	},
				smooth: true,
            	axis: 'left',
            	xField: 'operation',
            	yField: ['unit_per_m_h'],
				title: T('label.unit_per_mh'),
				showInLegend: true,
				tips : {
					trackMouse : true,
					width : 160,
					height : 50,
					style: {
						background : '#ffff99'
					},
					renderer : function(storeItem, item) {
						var unit_per_m_h = (storeItem.get('unit_per_m_h') ? Ext.util.Format.number(storeItem.get('unit_per_m_h'), T('format.precision')) : '0');
						var op = storeItem.get('operation');
						var title = T('label.operation') + ':' + op + '<br/>' + T('label.unit_per_mh') + ' : ' + unit_per_m_h;
						this.setTitle(title);
					}
				},
				highlight : {
					segment : {
						margin : 20
					}
				},
				label : {
					field : ['unit_per_m_h'],
					display : 'insideEnd',
					renderer : function(value) {
						if(value != 0) {
							return Ext.util.Format.number(value, T('format.precision'));
						}else {
							return '';
						}
					},
					contrast : true,
					color: '#333',
					font : '14px Arial'
				}
        	}
		]
	}, {
		xtype : 'grid',
		// title : T('title.m_h_summary'),
		store : 'Hcc.store.MHSummary',
		flex : 5,
		
		features: [{
			ftype: 'groupingsummary',
			groupHeaderTpl: Ext.create('Ext.XTemplate',
					'<tpl if="name == \'Total\'">',
						'{name}',
					'<tpl else>',
						'WORKCENTER : {name}',
					'</tpl>'
			)
		}],
		columns : [
			{ header : T('label.operation'), dataIndex : 'operation', flex : 0.4 },
			{ header : T('label.operation_desc'), dataIndex : 'operation_desc', flex : 1 },
			{
				header : T('label.plan_qty'),
				dataIndex : 'plan_qty',
				// summaryType: 'sum',
				// summaryRenderer: Ext.util.Format.numberRenderer(T('format.number'))
				flex : 0.4,
				align : 'right',
				renderer: Ext.util.Format.numberRenderer(T('format.number')),
			},
			{
				header : T('label.actual_qty'),
				dataIndex : 'actual_qty',
				// summaryType: 'sum',
				// summaryRenderer: Ext.util.Format.numberRenderer(T('format.number')),				
				flex : 0.4,
				align : 'right',
				renderer: Ext.util.Format.numberRenderer(T('format.number')),
			},
			{
				header : T('label.achievement_rate'),
				dataIndex : 'achv_rate',
				flex : 0.5,
				align : 'right',
				// summaryType: 'average',
				// summaryRenderer: Ext.util.Format.numberRenderer(T('format.precision')),
				renderer : function(value, metaData, record, rowIndex, colIndex, store) {
					var planQty = record.get("plan_qty");
					if(!planQty || planQty <= 0) {
						return 0;
					}

					var actualQty = record.get("actual_qty");
					var achvRate = (actualQty / planQty) * 100;
					return Ext.util.Format.number(achvRate, T('format.precision'));
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
				// summaryType: 'sum',
				// summaryRenderer: Ext.util.Format.numberRenderer(T('format.number')),
				flex : 0.5,
				align : 'right',
				renderer: Ext.util.Format.numberRenderer(T('format.number'))
			},
			{
				header : T('label.loss_worktime') + ' (min.)',
				dataIndex : 'loss_term',
				// summaryType: 'sum',
				// summaryRenderer: Ext.util.Format.numberRenderer(T('format.number')),
				flex : 0.5,
				align : 'right',
				renderer: Ext.util.Format.numberRenderer(T('format.number'))
			},
			{
				header : T('label.real_worktime') + ' (min.)',
				dataIndex : 'real_worktime',
				// summaryType: 'sum',
				// summaryRenderer: Ext.util.Format.numberRenderer(T('format.number')),
				flex : 0.5,
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
				// summaryType: 'average',
				// summaryRenderer: Ext.util.Format.numberRenderer(T('format.precision')),
				flex : 0.5,
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
				header : T('label.unit_per_mh'),
				dataIndex : 'unit_per_m_h',
				// summaryType: 'average',
				// summaryRenderer: Ext.util.Format.numberRenderer(T('format.precision')),
				flex : 0.5,
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
	}]
});