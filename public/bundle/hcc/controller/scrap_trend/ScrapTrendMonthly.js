Ext.define('Hcc.controller.scrap_trend.ScrapTrendMonthly', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Hcc.view.scrap_trend.ScrapTrendMonthly'],
	
	models : [],
			
	stores: ['Hcc.store.ScrapTrendMonthly'],
	
	views : ['Hcc.view.scrap_trend.ScrapTrendMonthly'],
	
	refs: [ { ref : 'ScrapTrendMonthly', selector : 'hcc_scrap_trend_monthly' },
			{ ref : 'ScrapTrendMonthlyList', selector : 'hcc_scrap_trend_monthly_list' },
			{ ref : 'ScrapTrendMonthlySearch', selector : 'hcc_scrap_trend_monthly_search' }
	 ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_scrap_trend_monthly' : {
				paramschange : this.onParamsChange
			},
			'hcc_scrap_trend_monthly_list grid' : {
				after_grid_loaded : this.afterGridLoaded
			},
			'hcc_scrap_trend_monthly_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},
	
	/****************************************************************
	 ** 				여기는 customizing area 					   **
	 ****************************************************************/
	
	parseClassName : function() {
		this.mainViewName = 'hcc_scrap_trend_monthly';
		this.gridViewName = 'hcc_scrap_trend_monthly_list';
		this.searchViewName = 'hcc_scrap_trend_monthly_search';
	},
	
	beforeParamsChange : function(view, params) {
		if(!params) {
			params = {};
		}
		if(!params['plan_year-eq']) {
			params['plan_year-eq'] = Ext.Date.format(new Date(), 'Y');
		}
		if(!params['comparison_year-eq']) {
			params['comparison_year-eq'] = Ext.Date.format(new Date(), 'Y') - 1;
		}
		return params;
	},
	
	afterGridLoaded : function(records, operation) {
		var chartView = this.getScrapTrendMonthlyList().down('chart');

		var chartDataList = [];
		for(var i = 1 ; i <= 12 ; i++) {
			var this_year = records[0].data["data_" + i];
			var last_year = records[1].data["data_" + i];
			if(i <= 9) {
				chartDataList.push({'name' : '0' + i, 'this_year' : parseInt(this_year), 'last_year' : parseInt(last_year)});
			}else {
				chartDataList.push({'name' : i, 'this_year' : parseInt(this_year), 'last_year' : parseInt(last_year)});
			}
		}
		
		chartView.axes.items[0].title = T('label.defect_qty');
		
		chartView.series.items[0].title = [records[0].data["year"] + T('label.year'),records[1].data["year"] + T('label.year')];
		chartView.store.loadRawData(chartDataList);
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getScrapTrendMonthly();
	}
});