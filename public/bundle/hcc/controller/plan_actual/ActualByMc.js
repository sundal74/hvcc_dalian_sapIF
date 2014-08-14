/**
 * ActualByMc controller
 */
Ext.define('Hcc.controller.plan_actual.ActualByMc', {
	
	extend: 'Base.abstract.PivotReportController',
	
	requires : ['Hcc.view.plan_actual.ActualByMc'],

	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_actual_by_mc' : {
				paramschange : this.onParamsChange
			},
			'hcc_actual_by_mc_search' : {
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
		if(!params['work_date-gte']) {
			params['work_date-gte'] = HF.getShiftDate(-1);
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
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/
	parseClassName : function() {
		this.mainViewName = 'hcc_actual_by_mc';
		this.gridViewName = 'hcc_actual_by_mc_list';
		this.searchViewName = 'hcc_actual_by_mc_search';
	}
});