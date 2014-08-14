Ext.define('Hcc.controller.oee.Oee2', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Hcc.view.oee.Oee2'],
	
	models : [],
			
	stores: ['Hcc.store.Oee2'],
	
	views : ['Hcc.view.oee.Oee2'],
	
	refs: [ 
		{ ref : 'Oee2', selector : 'hcc_oee2' },
		{ ref : 'Oee2List', selector : 'hcc_oee2_list' }, 
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_oee2' : {
				paramschange : this.onParamsChange
			},
			'hcc_oee2_list grid' : {
				after_grid_loaded : this.afterGridLoaded
			},
			'hcc_oee2_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},
	
	/****************************************************************
	 ** 				여기는 customizing area 					   **
	 ****************************************************************/
	
	parseClassName : function() {
		this.mainViewName = 'hcc_oee2';
		this.gridViewName = 'hcc_oee2_list';
		this.searchViewName = 'hcc_oee2_search';
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
		var chartView = this.getOee2List().down('chart');
		
		// chart data {operation : '6APAK', 'oee_value' : 30}
		var chartDataList = [];
		
		Ext.Array.each(records, function(record) {
			var opName = record.data.operation;
			var oeeValue = record.data.oee_value;
			var chartData = null;
			
			// chartDataList내에 현재 record의 operation이 존재하는지 체크 
			Ext.Array.each(chartDataList, function(cd) {
				if(cd.operation == opName) {
					chartData = cd;
					return;
				}
			});
			
			if(!chartData) {
				chartData = {'operation' : opName, 'oee_value' : 0.0, 'cnt' : 0};
				chartDataList.push(chartData);
			}
			
			chartData['oee_value'] = chartData['oee_value'] + oeeValue;
			chartData['cnt'] += 1;
		});
		
		Ext.Array.each(chartDataList, function(data) {
			if(data['cnt'] > 0) {
				data['oee_value'] = (data['oee_value'] / data['cnt']);
			}
			
			data['oee_value'] = data['oee_value'] * 100;
		});
		
		chartView.store.loadRawData(chartDataList);
	},
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/
	
	getMainView : function() {
		return this.getOee2();
	}
});