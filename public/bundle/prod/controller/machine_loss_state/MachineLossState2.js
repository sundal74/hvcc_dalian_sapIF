Ext.define('Prod.controller.machine_loss_state.MachineLossState2', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Prod.view.machine_loss_state.MachineLossState2'],
	
	models : [],
			
	stores: ['Prod.store.MachineLossState2'],
	
	views : ['Prod.view.machine_loss_state.MachineLossState2'],
	
	refs: [ { ref : 'MachineLossState2', selector : 'prod_machine_loss_state2' },
			{ ref : 'MachineLossState2List', selector : 'prod_machine_loss_state2_list' },
			{ ref : 'MachineLossState2Search', selector : 'prod_machine_loss_state2_search' }
	 ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_machine_loss_state2' : {
				paramschange : this.onParamsChange
			},
			'prod_machine_loss_state2_list grid' : {
				after_grid_loaded : this.afterGridLoaded
			},
			'prod_machine_loss_state2_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},
	
	/****************************************************************
	 ** 				여기는 customizing area 					   **
	 ****************************************************************/
	
	parseClassName : function() {
		this.mainViewName = 'prod_machine_loss_state2';
		this.gridViewName = 'prod_machine_loss_state2_list';
		this.searchViewName = 'prod_machine_loss_state2_search';
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

		if(!params['loss_type']) {
			params['loss_type'] = 'loss_count';
		}
		return params;
	},
	
	afterGridLoaded : function(records, operation) {
		var chartView = this.getMachineLossState2List().down('chart');
		var searchView = this.getMachineLossState2Search().child(' radiofield');

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
		
		if(searchView.getValue()) {
			chartView.axes.items[0].title = T('label.loss_count');
		}else{
			chartView.axes.items[0].title = T('label.loss_term');
		}
		
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
		return this.getMachineLossState2();
	}
});