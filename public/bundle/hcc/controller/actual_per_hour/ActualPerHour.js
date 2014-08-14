/**
 * ActualPerHour controller
 */
Ext.define('Hcc.controller.actual_per_hour.ActualPerHour', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Hcc.view.actual_per_hour.ActualPerHour'],
	
	models : [],
			
	stores: ['Hcc.store.ActualPerHour', 'Hcc.store.ActualPer10Min'],
	
	views : ['Hcc.view.actual_per_hour.ActualPerHour'],
	
	refs: [ { ref : 'ActualPerHour', selector : 'hcc_actual_per_hour' },
			{ ref : 'ActualPerHourList', selector : 'hcc_actual_per_hour_list' }
	 ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_actual_per_hour' : {
				paramschange : this.onParamsChange
			},
			'hcc_actual_per_hour_list #total_grid' : {
				after_grid_loaded : this.afterTotalGridLoaded
			},
			'hcc_actual_per_hour_list #avg_per_min_grid' : {
				after_grid_loaded : this.afterMinGridLoaded
			},
			'hcc_actual_per_hour_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},
	
	/****************************************************************
	 ** 				여기는 customizing area 					   **
	 ****************************************************************/
	
	beforeParamsChange : function(view, params) {
		if(!params) {
			params = {};
		}
		if(!params['work_date-eq']) {
			params['work_date-eq'] = HF.getCurrentShiftDate();
		}
		return params;
	},
	
	onSearchClick : function(btn) {
		var searchForm = this.getSearchForm();
		var params = searchForm.getValues();
		if(params['workcenter.name-eq'] && params['operation.name-eq']) {
			this.getMainView().setParams(params);
		} else {
			if(!params['workcenter.name-eq']) {
				HF.msg.notice(T('text.Select x First', {x : T('title.workcenter')}));
			}
			
			if(!params['operation.name-eq']) {
				HF.msg.notice(T('text.Select x First', {x : T('title.operation')}));
			}
		}
	},
	
	onParamsChange: function(view, params) {
		params = this.beforeParamsChange(view, params);
		var searchForm = this.getSearchForm();
		searchForm.setValues(params);
		
		if(!params['workcenter.name-eq'] || !params['operation.name-eq']) {
			return;
		}
		
		var avg_per_min_grid = view.child(' #avg_per_min_grid');
		var avg_per_min_grid_store = avg_per_min_grid.getStore();
		avg_per_min_grid_store.getProxy().extraParams = searchForm.getValues();
		avg_per_min_grid_store.load({
			page : 1,
			callback : function(records, operation, success) {
				if(success) {
					avg_per_min_grid.fireEvent('after_grid_loaded', records, operation);
				}
			}
		});
	},
	
	/**
	 * 분대별 실적 데이터 로딩 후 
	 */
	afterMinGridLoaded : function(records, operation) {
		if(!records || records.length == 0) {
			return;
		}

		var hourlyTarget = { header : "target_uph" };
		var hourlyActual = { header : "actual_uph" };
		var hourlyData = [hourlyTarget, hourlyActual];
				
		var dayTotal = 0;
		var nightTotal = 0;
		
		// i : minute
		for(var i = 0 ; i <= 5 ; i++) {
			var data = records[i].data;
			// j : hour
			for(var j = 0 ; j <= 23 ; j++) {
				var actQty = data["data_" + j + "_actual"];
				var tarQty = data["data_" + j + "_target"];
				var hourlyIdx = "data_" + j;
				
				// 0 ~ 8시 : 야간 
				if(j >= 0 && j <= 8) {
					nightTotal += actQty;
				// 8 ~ 21 : 주간
				} else if(j >= 8 && j <= 21) {
					dayTotal += actQty;
				// 21 ~ 24시 : 야간 
				} else {
					nightTotal += actQty;
				}
				
				var hact = hourlyActual[hourlyIdx] ? hourlyActual[hourlyIdx] : 0;
				var htar = hourlyTarget[hourlyIdx] ? hourlyTarget[hourlyIdx] : 0;
				hourlyActual[hourlyIdx] = hact  + actQty;
				hourlyTarget[hourlyIdx] = htar + tarQty;
			}
		}
		
		var total = "Total [Day : " + dayTotal + ", Night : " + nightTotal + "]";
		var totalGrid = this.getActualPerHourList().down('#total_grid');
		totalGrid.getStore().loadRawData(hourlyData);
		totalGrid.setTitle(total);
		
		this.loadChart(hourlyData);
	},
	
	loadChart : function(houlyDataList) {
		var chartDataList = [];
		if(houlyDataList.length > 0) {
			for(var i = 8 ; i <= 23 ; i++) {
				var actualUph = houlyDataList[1]["data_" + i];
				var targetUph = houlyDataList[0]["data_" + i];
				var name = (i <= 9) ? ("0" + i) : ("" + i);
				chartDataList.push({'name' : name, 'target_uph' : targetUph, 'actual_uph' : actualUph});
			}
			
			for(var i = 0 ; i <= 7 ; i++) {
				var actualUph = houlyDataList[1]["data_" + i];
				var targetUph = houlyDataList[0]["data_" + i];
				chartDataList.push({'name' : "" + i, 'target_uph' : targetUph, 'actual_uph' : actualUph});
			}
		}
		
		var chartView = this.getActualPerHourList().down('chart');
		chartView.store.loadRawData(chartDataList);		
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getActualPerHour();
	}
});