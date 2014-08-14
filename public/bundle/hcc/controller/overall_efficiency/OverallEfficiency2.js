/**
 * OverallEfficiency controller
 */
Ext.define('Hcc.controller.overall_efficiency.OverallEfficiency2', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Hcc.view.overall_efficiency.OverallEfficiency2'],
	
	models : [],
			
	stores: ['Hcc.store.OverallEfficiency2'],
	
	views : ['Hcc.view.overall_efficiency.OverallEfficiency2'],
	
	refs: [ 
		{ ref : 'OverallEfficiency2', selector : 'hcc_overall_efficiency2' },
		{ ref : 'OverallEfficiency2List', selector : 'hcc_overall_efficiency2_list' },
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_overall_efficiency2' : {
				paramschange : this.onParamsChange
			},
			'hcc_overall_efficiency2_list grid' : {
				after_grid_loaded : this.afterGridLoaded
			},
			'hcc_overall_efficiency2_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},
	
	/****************************************************************
	 ** 				여기는 customizing area 					   **
	 ****************************************************************/
	
	parseClassName : function() {
		this.mainViewName = 'hcc_overall_efficiency2';
		this.gridViewName = 'hcc_overall_efficiency2_list';
		this.searchViewName = 'hcc_overall_efficiency2_search';
	},
	
	beforeParamsChange : function(view, params) {
		if(!params) {
			params = {};
		}
		if(!params['work_date-gte']) {
			params['work_date-gte'] = HF.getShiftDate(-2);
		}
		if(!params['work_date-lte']) {
			params['work_date-lte'] = HF.getShiftDate(-1);
		}
		return params;
	},
	
	/**
	 * onParamsChange전에 처리, 파라미터 validation 체크 
	 */
	validateParams : function(view, params) {
		var valid = true;
		if(params['work_date-gte'] && params['work_date-lte']) {
			var range = HF.calDateRange(params['work_date-gte'], params['work_date-lte']);
			if(range > 31) {
				HF.msg.notice(T("text.Period allowed X days", {x : '31'}));
				valid = false;
			}
		}
		
		return valid;
	},
	
	afterGridLoaded : function(records, operation) {
		var chartView = this.getOverallEfficiency2List().down('chart');
		
		// chart data {operation : '6APAK', 'prod_eff' : 30}
		var chartDataList = [];
		
		Ext.Array.each(records, function(record) {
			var opName = record.data.operation;
			var prodEff = record.data.prod_eff;
			var netWorktime = record.data.net_worktime;
			var inputWorktime = record.data.input_worktime;
			var chartData = null;
			
			// chartDataList내에 현재 record의 operation이 존재하는지 체크 
			Ext.Array.each(chartDataList, function(cd) {
				if(cd.operation == opName) {
					chartData = cd;
					return;
				}
			});
			
			if(!chartData) {
				chartData = {'operation' : opName, 'prod_eff' : 1.0, 'net_worktime' : 0, 'input_worktime' : 0};
				chartDataList.push(chartData);
			}
			
			if(prodEff == 0) {
				prodEff = 1;
			}
			chartData['prod_eff'] = chartData['prod_eff'] * prodEff;
			chartData['net_worktime'] += netWorktime;
			chartData['input_worktime'] += inputWorktime;
		});
		
		Ext.Array.each(chartDataList, function(list) {
			if(list['net_worktime'] != 0 && list['input_worktime'] != 0) {
				list['prod_eff'] = (list['prod_eff'] * 100);
			}else {
				list['prod_eff'] = 0;
			}
		});

		chartView.store.loadRawData(chartDataList);
	},
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/
	
	getMainView : function() {
		return this.getOverallEfficiency2();
	}
});