Ext.define('Hcc.controller.scrap_trend.ScrapTrendDaily', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Hcc.view.scrap_trend.ScrapTrendDaily'],
	
	models : [],
			
	stores: ['Hcc.store.ScrapTrendDaily'],
	
	views : ['Hcc.view.scrap_trend.ScrapTrendDaily'],
	
	refs: [ { ref : 'ScrapTrendDaily', selector : 'hcc_scrap_trend_daily' },
			{ ref : 'ScrapTrendDailyList', selector : 'hcc_scrap_trend_daily_list' },
			{ ref : 'ScrapTrendDailySearch', selector : 'hcc_scrap_trend_daily_search' }
	 ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_scrap_trend_daily' : {
				paramschange : this.onParamsChange
			},
			'hcc_scrap_trend_daily_list grid' : {
				after_grid_loaded : this.afterGridLoaded
			},
			'hcc_scrap_trend_daily_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},
	
	/****************************************************************
	 ** 				여기는 customizing area 					   **
	 ****************************************************************/
	
	parseClassName : function() {
		this.mainViewName = 'hcc_scrap_trend_daily';
		this.gridViewName = 'hcc_scrap_trend_daily_list';
		this.searchViewName = 'hcc_scrap_trend_daily_search';
	},
	
	beforeParamsChange : function(view, params) {
		if(!params) {
			params = {};
		}
		
		var today = new Date();
		if(!params['plan_year-eq']) {
			params['plan_year-eq'] = Ext.Date.format(today, 'Y');
		}
		if(!params['plan_month-eq']) {
			params['plan_month-eq'] = Ext.Date.format(today, 'm');
		}
		if(!params['comparison_month-eq']) {
			var month = Ext.Date.format(today, 'm');
			var comparisonMonth = 0;
			if(month == 1) {
				comparisonMonth = 12;
			} else {
				comparisonMonth = month - 1;
			}
			var compMonthStr = "" + comparisonMonth;
			if(comparisonMonth < 10) {
				compMonthStr = "0" + compMonthStr;
			} 
			params['comparison_month-eq'] = compMonthStr;
		}
		
		if(!params['comparison_year-eq']) {
			if(params['comparison_month-eq'] == '12') {
				var year = Ext.Date.format(today, 'Y');
				params['comparison_year-eq'] = year - 1;
			} else {
				params['comparison_year-eq'] = Ext.Date.format(today, 'Y');
			}
		}
		
		return params;
	},
	
	afterGridLoaded : function(records, operation) {
		var chartView = this.getScrapTrendDailyList().down('chart');
		var searchView = this.getScrapTrendDailySearch().child(' radiofield');

		var chartDataList = [];
		for(var i = 1 ; i <= 31 ; i++) {
			var this_day = records[0].data["data_" + i];
			var last_day = records[1].data["data_" + i];
			if(i <= 9) {
				chartDataList.push({'name' : '0' + i, 'this_day' : parseInt(this_day), 'last_day' : parseInt(last_day)});
			}else {
				chartDataList.push({'name' : i, 'this_day' : parseInt(this_day), 'last_day' : parseInt(last_day)});
			}
		}
		
		chartView.axes.items[0].title = T('label.defect_qty');
		
		chartView.series.items[0].title = [records[0].data["month"] + T('label.month'),records[1].data["month"] + T('label.month')];
		chartView.store.loadRawData(chartDataList);
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getScrapTrendDaily();
	}
});