Ext.define('Hcc.controller.ftt.Ftt2', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Hcc.view.ftt.Ftt2'],
	
	models : [],
			
	stores: ['Hcc.store.Ftt2'],
	
	views : ['Hcc.view.ftt.Ftt2'],
	
	refs: [ 
		{ ref : 'Ftt2', selector : 'hcc_ftt2' },
		{ ref : 'Ftt2List', selector : 'hcc_ftt2_list' },
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_ftt2' : {
				paramschange : this.onParamsChange
			},
			'hcc_ftt2_list grid' : {
				after_grid_loaded : this.afterGridLoaded
			},
			'hcc_ftt2_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},
	
	/****************************************************************
	 ** 				여기는 customizing area 					   **
	 ****************************************************************/
	
	parseClassName : function() {
		this.mainViewName = 'hcc_ftt2';
		this.gridViewName = 'hcc_ftt2_list';
		this.searchViewName = 'hcc_ftt2_search';
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
		var chartView = this.getFtt2List().down('chart');
		
		// chart data {operation : '6APAK', 'ftt_value' : 30}
		var chartDataList = [];
		
		Ext.Array.each(records, function(record) {
			var opName = record.data.operation;
			var fttValue = record.data.ftt_value;
			var inputQty = record.data.input_qty;
			var chartData = null;
			
			// chartDataList내에 현재 record의 operation이 존재하는지 체크 
			Ext.Array.each(chartDataList, function(cd) {
				if(cd.operation == opName) {
					chartData = cd;
					return;
				}
			});
			
			if(!chartData) {
				chartData = {'operation' : opName, 'ftt_value' : 1.0, 'input_qty' : 0};
				chartDataList.push(chartData);
			}
			
			if(fttValue == 0) {
				fttValue = 1;
			}
			
			chartData['ftt_value'] = chartData['ftt_value'] * fttValue;
			chartData['input_qty'] += inputQty;
		});
		
		Ext.Array.each(chartDataList, function(list) {
			if(list['input_qty'] != 0) {
				list['ftt_value'] = (list['ftt_value'] * 100);
			}else {
				list['ftt_value'] = 0;
			}
		});
		
		chartView.store.loadRawData(chartDataList);
	},
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/
	
	getMainView : function() {
		return this.getFtt2();
	}
});