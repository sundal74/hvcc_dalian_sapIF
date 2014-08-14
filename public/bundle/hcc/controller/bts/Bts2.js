Ext.define('Hcc.controller.bts.Bts2', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Hcc.view.bts.Bts2'],
	
	models : [],
			
	stores: ['Hcc.store.Bts2'],
	
	views : ['Hcc.view.bts.Bts2'],
	
	refs: [ 
		{ ref : 'Bts2', selector : 'hcc_bts2' },
		{ ref : 'Bts2List', selector : 'hcc_bts2_list' },
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_bts2' : {
				paramschange : this.onParamsChange
			},
			'hcc_bts2_list grid' : {
				after_grid_loaded : this.afterGridLoaded
			},
			'hcc_bts2_search' : {
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
	parseClassName : function() {
		this.mainViewName = 'hcc_bts2';
		this.gridViewName = 'hcc_bts2_list';
		this.searchViewName = 'hcc_bts2_search';
	},
	
	/**
	 * override
	 */
	beforeParamsChange : function(view, params) {
		if(!params) {
			params = {};
		}
		if(!params['work_date-gte']) {
			params['work_date-gte'] = HF.getShiftDate(-1);
		}
		if(!params['work_date-lte']) {
			params['work_date-lte'] = HF.getShiftDate(-1);
		}
		return params;
	},
	
	/**
	 * override
	 */
    validateParams: function(view, params) {
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
	
	/**
	 * override
	 */
	afterGridLoaded : function(records, operation) {
		var chartView = this.getBts2List().down('chart');
		
		// chart data {operation : '6APAK', 'bts_value' : 30}
		var chartDataList = [];
		
		/*
		{ 	operation: "7AKHR"
			operation_desc: "Brazing"
			plan_achv_qty: 156
			plan_act_lower_qty: 156
			plan_qty: 1100
			actual_qty: 156
			mix_perf: 1
			seq_perf: 1
			vol_perf: 0.142
			bts_value: 0.142
		}
		*/
		Ext.Array.each(records, function(record) {
			var opName = record.data.operation;
			var planQty = record.data.plan_qty;
			var actualQty = record.data.actual_qty;
			var planActLowerQty = record.data.plan_act_lower_qty;
			var chartData = null;
			
			// chartDataList내에 현재 record의 operation이 존재하는지 체크 
			Ext.Array.each(chartDataList, function(cd) {
				if(cd.operation == opName) {
					chartData = cd;
					return;
				}
			});
			
			if(!chartData) {
				chartData = {'operation' : opName, 'cnt' : 0, 'plan_qty' : 0, 'actual_qty' : 0, 'plan_act_lower_qty' : 0 };
				chartDataList.push(chartData);
			}
			
			chartData['plan_qty'] = chartData['plan_qty'] + planQty;
			chartData['actual_qty'] = chartData['actual_qty'] + actualQty;
			chartData['plan_act_lower_qty'] = chartData['plan_act_lower_qty'] + planActLowerQty;
			chartData['cnt'] += 1;
		});
		
		Ext.Array.each(chartDataList, function(list) {
			var volPerf = 0;
			var mixPerf = 0;
			var seqPerf = 0;
			
			var planQty = list['plan_qty'];
			var actualQty = list['actual_qty'];
			var lowerPlanQty = list['plan_act_lower_qty'];

			if(planQty > 0) {
				volPerf = actualQty / planQty;
			}
			
			if(planQty > 0 && actualQty > 0) {
				var mixPerfParent = (planQty > actualQty) ? actualQty : planQty;
				mixPerf = lowerPlanQty / mixPerfParent;
			}
			
			if(lowerPlanQty > 0) {
				seqPerf = actualQty / lowerPlanQty;
			}

			list['bts_value'] = volPerf * mixPerf * seqPerf;
		});
		
		chartView.store.loadRawData(chartDataList);
	},
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/
	
	getMainView : function() {
		return this.getBts2();
	}
});