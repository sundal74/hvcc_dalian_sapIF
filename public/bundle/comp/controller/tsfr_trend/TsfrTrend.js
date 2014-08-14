/**
 * TsfrTrend controller
 */
Ext.define('Comp.controller.tsfr_trend.TsfrTrend', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : [
		'Comp.store.TsfrTrend',
		'Comp.view.tsfr_trend.TsfrTrend',
		'Comp.view.tsfr_trend.TsfrTrendList',
		'Comp.view.tsfr_trend.TsfrTrendSearch'
	],
	
	models : [],
			
	stores: ['Comp.store.TsfrTrend'],
	
	views : ['Comp.view.tsfr_trend.TsfrTrend'],
	
	refs: [ 
		{ ref : 'TsfrTrend', selector : 'comp_tsfr_trend' },
		{ ref : 'TsfrTrendList', selector : 'comp_tsfr_trend_list' }
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'comp_tsfr_trend' : {
				paramschange : this.onParamsChange
			},
			'comp_tsfr_trend_list grid' : {
				after_grid_loaded : this.afterGridLoaded
			},
			'comp_tsfr_trend_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},
	
	/****************************************************************
	 ** 				여기는 customizing area 					   **
	 ****************************************************************/
	
	/**
	 * override
	 */
	beforeParamsChange : function(view, params) {
		if(!params) {
			params = {};
		}
		if(!params['work_date-eq']) {
			params['work_date-eq'] = HF.getCurrentShiftDate();
		}
		return params;
	},
	
	/**
	 * override
	 */
	onParamsChange: function(view, params) {
		params = this.beforeParamsChange(view, params);
		var searchForm = this.getSearchForm();
		searchForm.setValues(params);
		var grid = view.child(' grid');
		var store = grid.getStore();
		store.getProxy().extraParams = searchForm.getValues();
		store.load({
			page : 1,
			callback : function(records, operation, success) {
				if(success) {
					grid.fireEvent('after_grid_loaded', records, operation);
				}
			}
		});
	},
	
	/**
	 * override
	 */
	afterGridLoaded : function(records, operation) {
		var totalData = records[0].raw;
		if(totalData.headers && totalData.headers.length > 0) {
			// headers : {routing:Routing, d1_value:05-28, d2_value:05-29, d3_value:05-30, d4_value:05-31, d5_value:06-01, d6_value:06-02, d7_value:06-03}
			var headers = totalData.headers[0];
			// items : [{routing:6CTKA, d2_value:87, d3_value:88, d4_value:88, d5_value:88, d6_value:93, d7_value:89}, ...]
			var gridDataList = totalData.items;
			this.loadGridData(headers, gridDataList);
			this.loadChartData(headers, gridDataList);	
		}
	},
	
	/**
	 * header & raw data list로 grid 로딩 
	 */
	loadGridData : function(headers, rawDataList) {
		var grid = this.getTsfrTrendList().down('grid');
		this.changeGridColumnHeader(grid, headers);
		grid.store.loadRawData(rawDataList);
	},
	
	/**
	 * header & raw data list로 chart 로딩 
	 */
	loadChartData : function(headers, rawDataList) {
		var chartView = this.getTsfrTrendList().down('chart');
		var stationList = this.findStationList(rawDataList);
		var chartStore = this.buildChartStore(stationList);
		var chartDataList = this.buildChartData(headers, stationList, rawDataList);
		var dateList = [];
		for(var i = 1 ; i <= 7 ; i++) {
			dateList.push(headers['d' + i + '_value']);
		}
		this.getTsfrTrendList().rebuildChart(chartStore, dateList, stationList, chartDataList);
	},
	
	/**
	 * raw data로 부터 routing list를 찾아 리턴 
	 */
	findStationList : function(dataList) {
		var stationList = [];
		
		for(var i = 0 ; i < dataList.length ; i++) {
			var routing = dataList[i]['st_no'];
			if(stationList.indexOf(routing) == -1) {
				stationList.push(routing);
			}
		}
		
		return stationList;
	},
	
	/**
	 * raw data로 부터 chart store를 생성 
	 */
	buildChartStore : function(routingList) {
		var fields = ['date'];
		for(var i = 0 ; i < routingList.length ; i++) {
			fields.push(routingList[i]);
		}
		
		var chartStore = new Ext.create('Ext.data.JsonStore', {
		    fields: fields,
		    data: []
		});

		return chartStore;
	},
	
	/**
	 * raw data로 부터 chart data로 변환 
	 */
	buildChartData : function(headers, stationList, dataList) {
		var chartDataList = [];
		
		// headers : {st_no:Routing, d1_value:05-28, d2_value:05-29, d3_value:05-30, d4_value:05-31, d5_value:06-01, d6_value:06-02, d7_value:06-03}
		// items : [{st_no:6CTKA, d2_value:87, d3_value:88, d4_value:88, d5_value:88, d6_value:93, d7_value:89}, ...]
		for(var i = 1 ; i <= 7 ; i++) {
			var chartData = {'date' : headers['d' + i + '_value']};
			for(var j = 0 ; j < stationList.length ; j++) {
				chartData[stationList[j]] = 0;
			}
			chartDataList.push(chartData);
		}
		
		// data : [ {'date' : '05-27', '6CTKA' : 90, '6CTKB' : 95, ....}, ... ]
		for(var k = 0 ; k < dataList.length ; k++) {
			var data = dataList[k];
			var routing = data['st_no'];
			
			for(var y = 1 ; y <= 7 ; y++) {
				var dataIdxStr = 'd' + y + '_value';
				var date = headers[dataIdxStr];
				var value = data[dataIdxStr];
				// routing, date로 chartDataList에서 찾기 
				for(var z = 0 ; z < chartDataList.length ; z++) {
					if(chartDataList[z]['date'] == date) {
						chartDataList[z][routing] = value;
					}
				}
			}
		}
		
		return chartDataList;
	},
	
	/**
	 * 그리드 헤더 변경 : 날짜 D-Day 컬럼을 실제 날짜로 변경한다.
	 */
	changeGridColumnHeader : function(grid, headers) {
		var columns = grid.columns;
		var index = 0;
		Ext.each(columns, function(column) {
			// 세 번째 컬럼 부터 날짜 컬럼 ...
			if(index > 1) {
				column.setText(headers['d' + (index - 1) + '_value'])
			}
			
			index += 1;
		});
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getTsfrTrend();
	}
});