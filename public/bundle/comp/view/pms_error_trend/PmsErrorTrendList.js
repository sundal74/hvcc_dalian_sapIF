Ext.define('Comp.view.pms_error_trend.PmsErrorTrendList', {
	
	extend : 'Base.abstract.Panel',
	
	xtype : 'comp_pms_error_trend_list',
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	items : [ {
		xtype : 'panel',
		itemId : 'chart_panel',
		flex : 2,
		autoScroll : true
	}, {
		xtype : 'grid',
		store: 'Comp.store.PmsErrorTrend',
		autoScroll : true,
		flex : 1,
		columns : [
			{ header : T('label.station'), dataIndex : 'st_no', align : 'center' },
			{ header : T('label.st_name'), dataIndex : 'st_name', width : 250 },
			{ header : 'D1 Value', xtype : 'numbercolumn', dataIndex : 'd1_value', align : 'right', format : T('format.number') },
			{ header : 'D2 Value', xtype : 'numbercolumn', dataIndex : 'd2_value', align : 'right', format : T('format.number') },
			{ header : 'D3 Value', xtype : 'numbercolumn', dataIndex : 'd3_value', align : 'right', format : T('format.number') },
			{ header : 'D4 Value', xtype : 'numbercolumn', dataIndex : 'd4_value', align : 'right', format : T('format.number') },
			{ header : 'D5 Value', xtype : 'numbercolumn', dataIndex : 'd5_value', align : 'right', format : T('format.number') },
			{ header : 'D6 Value', xtype : 'numbercolumn', dataIndex : 'd6_value', align : 'right', format : T('format.number') },
			{ header : 'D7 Value', xtype : 'numbercolumn', dataIndex : 'd7_value', align : 'right', format : T('format.number') }
		]
	}],
	
	rebuildChart : function(chartStore, dateList, stationList, chartData, minimum, maximum) {
		var chartPanel = this.child('#chart_panel');
		var chartWidth = chartPanel.getWidth();
		var chartHeight = chartPanel.getHeight();
		var series = [];
		
		for(var i = 0 ; i < stationList.length ; i++) {
			var station = stationList[i];
			var ser = {
            	type: 'line',
            	highlight: {
                	size: 7,
                	radius: 7
            	},
				smooth: true,
            	axis: 'left',
            	xField: 'date',
            	yField: station,
            	markerConfig: {
                	type: 'circle',
                	size: 4,
                	radius: 4,
                	'stroke-width': 0
            	},
				markerConfig: {
					type: 'circle',
			    	radius: 4
				}/*,
				tips : {
					trackMouse : true,
					width : 120,
					height : 25,
					style: {
						background : '#ffff9' + i,
					},
					renderer : function(storeItem, item) {
						this.setTitle(station + ' (' + storeItem.get('date') + ') : ' + storeItem.get(station));
					}
				}*/
        	};

			series.push(ser);
		}
		
		var newChart = {
			xtype : 'chart',
	        animate: true,
	        shadow: true,
			itemId : 'line_chart',
			legend: { position: 'top' },
	        store: chartStore,	
			width : chartWidth - 5,
			height : chartHeight - 20,
	        axes: [
				{
	            	type: 'Numeric',
	            	minimum: minimum,
					maximum: maximum,
	            	position: 'left',
					fields: dateList,
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
	            	fields: ['date'],
					label : {
						renderer : function(value) {
							return value;
						}
					}
	        	}
			],
	        series: series
		};
		
		chartPanel.removeAll();
		chartPanel.add(newChart);
		this.down(' chart').store.loadRawData(chartData);
	},
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: []
	} ]
});