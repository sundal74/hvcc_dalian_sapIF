Ext.define('Hcc.view.actual_per_hour.ActualPerHourList', {
	
	extend : 'Base.abstract.Panel',
	
	xtype : 'hcc_actual_per_hour_list',
		
	layout : {
		type : 'vbox',
		align : 'stretch'
	},

	items : [{
		xtype : 'chart',
		animate: true,
		shadow: true,
		legend: { position: 'right' },
		store: Ext.create('Ext.data.Store', {
			fields: [{
				name: 'name'
			}, {
				name: 'target_uph'
			}, {
				name: 'actual_uph'
			}],
			proxy: {
				type: 'memory',
				reader: {
					type: 'json'
				}
			}
		}),
		
		//flex : 1,
		height : 120,
		axes: [
			{
				type: 'Numeric',
				minimum: 0,
				position: 'left',
				fields: ['target_uph', 'actual_uph'],
				title: T('label.actual_qty'),
				minorTickSteps: 1,
				grid: {
					odd: {
						opacity: 1,
						fill: '#ddd',
						stroke: '#bbb',
						'stroke-width': 0.5
					}
				}
			}, 
			{
				type: 'Category',
				position: 'bottom',
				fields: ['name'],
				label : {
					renderer : function(value) {
						/*if(!value) {
							return '';
						}
						
						var sft1Start = null;
						var sft2Start = null;
						
						if(SHIFT == 1) {
							sft1Start = SHIFT_START.substr(0,2);
							sft2Start = SHIFT_END.substr(0,2);
						} else {
							sft1Start = SHIFT_END.substr(0,2);
							sft2Start = SHIFT_START.substr(0,2);
						}
							
						if(value == sft1Start) {
							return value + '\n' + 'SHIFT1';
						} else if(value == sft2Start) {
							return value + '\n' + 'SHIFT2';
						} else {
							return value;
						}*/
						return value;
					}
				}
			}
		],
		series: [
			{
				type: 'line',
				highlight: {
					size: 7,
					radius: 7
				},
				smooth: true,
				axis: 'left',
				xField: 'name',
				yField: 'target_uph',
				title: T('label.target'),
				markerConfig: {
					type: 'circle',
					size: 4,
					radius: 4,
					'stroke-width': 0
				},
				markerConfig: {
					type: 'circle',
			    	radius: 4
				},
				tips : {
					trackMouse : true,
					width : 90,
					height : 25,
					style: {
						background : '#ffff99',
					},
					renderer : function(storeItem, item) {
						this.setTitle(T('label.target') + ' : ' + (storeItem.get('target_uph') ? storeItem.get('target_uph') : '0'));
					}
				}
			},
			{
				type: 'line',
				highlight: {
					size: 7,
					radius: 7
				},
				smooth: true,
				axis: 'left',
				fill: true,
				xField: 'name',
				yField: 'actual_uph',
				title: T('label.actual'),
				markerConfig: {
					type: 'circle',
					size: 4,
					radius: 4,
					'stroke-width': 0
				},
				tips : {
					trackMouse : true,
					width : 90,
					height : 25,
					style: {
						background : '#66cc33'
					},
					renderer : function(storeItem, item) {
						this.setTitle(T('label.actual') + ' : ' + (storeItem.get('actual_uph') ? storeItem.get('actual_uph') : '0'));
					}
				}
			}
		]
	}, {
		xtype : 'grid',
		itemId : 'total_grid',
		title : 'Total [Day : 0, Night : 0]',
		store: 'Hcc.store.ActualPerHour',
		height : 138,
		enableLocking:  false,
		columns: [
			{ header : T('label.hour'), dataIndex : 'header', align : 'center', renderer : function(val) { return T('label.' + val); } },
			{ header : '08', dataIndex : 'data_8',  align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '09', dataIndex : 'data_9',  align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '10', dataIndex : 'data_10', align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '11', dataIndex : 'data_11', align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '12', dataIndex : 'data_12', align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '13', dataIndex : 'data_13', align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '14', dataIndex : 'data_14', align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '15', dataIndex : 'data_15', align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '16', dataIndex : 'data_16', align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '17', dataIndex : 'data_17', align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '18', dataIndex : 'data_18', align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '19', dataIndex : 'data_19', align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '20', dataIndex : 'data_20', align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '21', dataIndex : 'data_21', align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '22', dataIndex : 'data_22', align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '23', dataIndex : 'data_23', align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '24', dataIndex : 'data_0', align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '01', dataIndex : 'data_1',  align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '02', dataIndex : 'data_2',  align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '03', dataIndex : 'data_3',  align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '04', dataIndex : 'data_4',  align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '05', dataIndex : 'data_5',  align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '06', dataIndex : 'data_6',  align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) },
			{ header : '07', dataIndex : 'data_7',  align : 'right', width : 80, renderer: Ext.util.Format.numberRenderer(T('format.number')) }
		]
	}, {
		xtype : 'grid',
		itemId : 'avg_per_min_grid',
		width : 315,
		store: 'Hcc.store.ActualPer10Min',
		enableLocking:  false,
	
		columns: [
			{ 
				header : T('label.time'), 
				dataIndex : 'header', 
				align : 'center', 
				renderer : function(val) { 
					var toVal = parseInt(val);
					var fromVal = toVal - 10;
					return T('label.min_x_y', {x : fromVal, y : toVal}); 
				} 
			},
			{ 
				header : '08', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_8_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_8_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '09', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_9_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_9_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '10', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_10_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_10_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '11', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_11_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_11_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '12', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_12_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_12_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '13', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_13_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_13_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '14', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_14_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_14_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '15', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_15_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_15_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '16', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_16_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_16_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '17', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_17_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_17_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '18', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_18_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_18_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '19', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_19_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_19_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '20', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_20_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_20_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '21', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_21_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_21_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '22', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_22_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_22_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '23', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_23_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_23_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '24', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_0_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_0_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '01', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_1_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_1_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '02', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_2_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_2_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '03', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_3_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_3_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '04', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_4_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_4_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '05', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_5_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_5_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '06', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_6_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_6_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			},
			{ 
				header : '07', 
				columns: [ {
					header : 'Act.', dataIndex : 'data_7_actual',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}, {
					header : 'Tar.', dataIndex : 'data_7_target',  align : 'right', width : 40, renderer: Ext.util.Format.numberRenderer(T('format.number'))
				}]
			}
		]
	}]

});